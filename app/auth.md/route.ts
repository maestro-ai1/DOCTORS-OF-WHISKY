import { authMd } from '@/lib/agent/files';
import { respond } from '@/lib/agent/respond';

export const dynamic = 'force-static';

export function GET() {
  return respond(authMd(), 'text/markdown; charset=utf-8');
}
