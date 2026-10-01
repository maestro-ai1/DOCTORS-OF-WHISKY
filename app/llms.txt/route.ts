import { llmsTxt } from '@/lib/agent/files';
import { respond } from '@/lib/agent/respond';

export const dynamic = 'force-static';

export function GET() {
  return respond(llmsTxt(false), 'text/plain; charset=utf-8');
}
