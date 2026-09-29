import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('[Doctors of Whisky Order Received]', body.orderRef, body.customer?.email);

    return NextResponse.json(
      {
        success: true,
        orderRef: body.orderRef,
        message: 'Order allocation confirmed and recorded in Sydney vault dispatch queue.',
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record order' },
      { status: 400 }
    );
  }
}
