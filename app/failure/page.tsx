import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function FailurePage() {
  const retryAppUrl = process.env.NEXT_PUBLIC_RETRY_APP_URL || 'https://retry-buildathon.vercel.app';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-md w-full">
        <XCircle className="mx-auto text-red-500 mb-6" size={64} />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Failure Captured</h1>
        <p className="text-gray-600 mb-6">
          The payment failed. Razorpay has fired a webhook to Retry. 
          Retry is now running its recovery workflow!
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-8 text-sm text-blue-800 text-left">
          <p><strong>Note:</strong> Voice intervention is simulated for this demo. In production, the eligible customer receives a Sarvam AI recovery call.</p>
        </div>

        <div className="space-y-3">
          <a 
            href={`${retryAppUrl}/cases`}
            target="_blank"
            rel="noreferrer"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Open Retry Dashboard
          </a>
          <Link 
            href="/"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
          >
            Return to Demo Store
          </Link>
        </div>
      </div>
    </div>
  );
}
