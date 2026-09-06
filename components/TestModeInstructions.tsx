import { Info } from 'lucide-react';

export default function TestModeInstructions() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
      <div className="flex items-center gap-2 mb-4">
        <Info className="text-blue-600" size={24} />
        <h3 className="text-lg font-bold text-blue-900">How to test Retry</h3>
      </div>
      
      <ol className="list-decimal list-inside space-y-3 text-blue-800">
        <li>Pick any demo product and click <strong>Pay with Razorpay Test Mode</strong>.</li>
        <li>Select <strong>Netbanking</strong> as the payment method.</li>
        <li>Select any test bank and click <strong>Pay Now</strong>.</li>
        <li>
          On the Razorpay bank simulator page, click the red <strong>Fail</strong> button to simulate a bank downtime drop-off.
        </li>
        <li>Return to the Retry dashboard to watch the AI recovery case generate instantly!</li>
        <li>
          To test a successful payment, repeat the process but click the green <strong>Success</strong> button instead.
        </li>
      </ol>
    </div>
  );
}
