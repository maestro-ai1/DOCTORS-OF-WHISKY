import { NextRequest, NextResponse } from 'next/server';
import { SITE } from '@/lib/config';
import { AGENT_TOOLS, runAgentTool } from '@/lib/agent/tools';

// Streamable HTTP MCP endpoint (stateless, JSON responses). Read-only + order-draft: no payment, no state changes.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id',
};

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: CORS });
const rpcError = (id: unknown, code: number, message: string) => json({ jsonrpc: '2.0', id: id ?? null, error: { code, message } });

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export function GET() {
  return json({
    name: SITE.name,
    transport: 'streamable-http',
    endpoint: `https://${SITE.domain}/api/mcp/`,
    protocolVersion: '2025-03-26',
    tools: AGENT_TOOLS.map((t) => t.name),
    note: 'POST JSON-RPC 2.0 messages (initialize, tools/list, tools/call) to this endpoint. Read-only plus order drafts; a human completes every order.',
  });
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return rpcError(null, -32700, 'Parse error');
  }
  const { id, method, params } = body || {};

  switch (method) {
    case 'initialize':
      return json({
        jsonrpc: '2.0',
        id,
        result: {
          protocolVersion: '2025-03-26',
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: SITE.name, version: '1.1.0' },
          instructions: 'Search the catalogue, inspect bottles and draft orders. Orders are always completed by a human; buyers must be 18+.',
        },
      });
    case 'notifications/initialized':
      return new NextResponse(null, { status: 202, headers: CORS });
    case 'ping':
      return json({ jsonrpc: '2.0', id, result: {} });
    case 'tools/list':
      return json({ jsonrpc: '2.0', id, result: { tools: AGENT_TOOLS } });
    case 'tools/call': {
      const name = params?.name;
      if (!AGENT_TOOLS.some((t) => t.name === name)) return rpcError(id, -32602, `Unknown tool: ${String(name)}`);
      const res = runAgentTool(name, params?.arguments || {});
      if (!res.ok) return rpcError(id, res.code, res.message);
      return json({ jsonrpc: '2.0', id, result: { content: [{ type: 'text', text: JSON.stringify(res.data) }], isError: false } });
    }
    default:
      return rpcError(id, -32601, 'Method not found');
  }
}
