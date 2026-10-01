import { acp } from '@/lib/agent/files';
import { jsonResponse } from '@/lib/agent/respond';

export const dynamic = 'force-static';

export function GET() {
  return jsonResponse(acp());
}
