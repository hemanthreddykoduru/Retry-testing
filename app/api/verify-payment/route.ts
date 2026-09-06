import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      return NextResponse.json({ message: "Payment verified successfully" });
    } else {
      return NextResponse.json({ error: "Invalid signature sent!" }, { status: 400 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to verify signature' }, { status: 500 });
  }
}
