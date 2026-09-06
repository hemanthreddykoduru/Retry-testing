"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DemoBanner from '@/components/DemoBanner';
import { products } from '@/lib/products';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';

export default function CheckoutPage({ params }: { params: Promise<{ productId: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const resolvedParams = React.use(params);
  
  const product = products.find(p => p.id === resolvedParams.productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await initializeRazorpay();
      if (!res) {
        alert("Razorpay SDK Failed to load");
        setLoading(false);
        return;
      }

      // Create Order on Server
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: product.id }),
      });
      
      const orderData = await orderRes.json();
      
      if (!orderRes.ok) {
        alert("Server error. Are you sure you set up RAZORPAY_KEY_ID and SECRET in .env.local?");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Retry Checkout Lab",
        description: product.name,
        order_id: orderData.id,
        prefill: {
          name: "Judge Tester",
          email: "judge@buildathon.demo",
          contact: "9999999999",
        },
        handler: async function (response: any) {
          // Verify payment on server
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          
          if (verifyRes.ok) {
            router.push(`/success?order_id=${orderData.id}`);
          } else {
            router.push(`/failure?order_id=${orderData.id}`);
          }
        },
        modal: {
          ondismiss: function () {
            // Simulated network drop-off or closure
            setLoading(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      
      paymentObject.on('payment.failed', function (response: any) {
        setLoading(false);
        // Razorpay triggers payment.failed webhook on their end, Retry catches it!
        router.push(`/failure?order_id=${orderData.id}&payment_id=${response.error.metadata.payment_id}`);
      });
      
      paymentObject.open();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <DemoBanner />
      
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6">
          <ArrowLeft size={16} className="mr-1" /> Back to store
        </Link>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h1 className="text-2xl font-bold mb-2">Checkout Details</h1>
          
          <div className="flex justify-between py-6 border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-900">{product.name}</p>
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
            <p className="font-bold text-xl">₹{product.price}</p>
          </div>
          
          <div className="flex justify-between py-6">
            <p className="font-semibold text-gray-900">Total to pay</p>
            <p className="font-bold text-2xl">₹{product.price}</p>
          </div>
          
          <button 
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors flex justify-center items-center gap-2 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : null}
            {loading ? 'Opening Razorpay...' : `Pay ₹${product.price} (Test Mode)`}
          </button>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Use <strong>Netbanking</strong> and click the <strong>Fail</strong> button on the bank page to trigger a recovery case.
          </p>
        </div>
      </main>
    </div>
  );
}
