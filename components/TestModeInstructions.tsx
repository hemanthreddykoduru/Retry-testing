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
        <li>Select <strong>UPI</strong> as the payment method.</li>
        <li>
          To create a failed payment, enter: <br/>
          <code className="bg-white px-2 py-1 rounded border border-blue-200 mt-1 inline-block font-bold">failure@razorpay</code>
        </li>
        <li>Return to this page and open the Retry recovery dashboard to see the captured event.</li>
        <li>
          To test a successful payment, repeat using: <br/>
          <code className="bg-white px-2 py-1 rounded border border-blue-200 mt-1 inline-block font-bold">success@razorpay</code>
        </li>
      </ol>
    </div>
  );
}
