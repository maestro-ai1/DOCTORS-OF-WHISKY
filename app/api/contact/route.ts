import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Doctors of Whisky Contact Message]', body.name, body.subject);

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry successfully transmitted to Doctors of Whisky sommelier concierge.',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to transmit message' },
      { status: 400 }
    );
  }
}
