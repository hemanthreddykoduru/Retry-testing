import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { products } from '@/lib/products';

export async function POST(request: Request) {
  try {
    const { productId } = await request.json();
    const product = products.find(p => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const options = {
      amount: product.price * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        productId: product.id,
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
