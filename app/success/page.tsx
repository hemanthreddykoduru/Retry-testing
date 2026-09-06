import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-md w-full">
        <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Succeeded</h1>
        <p className="text-gray-600 mb-8">
          The payment was successful. No recovery action is needed by Retry.
        </p>
        <Link 
          href="/"
          className="inline-block w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Return to Demo Store
        </Link>
      </div>
    </div>
  );
}
