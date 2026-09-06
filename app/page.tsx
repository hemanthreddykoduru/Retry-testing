import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import DemoBanner from '@/components/DemoBanner';
import TestModeInstructions from '@/components/TestModeInstructions';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <DemoBanner />
      
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Retry Checkout Lab
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A zero-login Razorpay Test Mode storefront for demonstrating failed-payment detection and AI-assisted revenue recovery.
          </p>
        </div>

        <TestModeInstructions />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      
      <footer className="bg-gray-50 border-t border-gray-200 mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>
            <strong>Disclaimer:</strong> This is a Buildathon demonstration environment. All payments use Razorpay Test Mode. 
            No real money is collected, no real products are delivered, and no account is required. 
            Test payments are generated only to demonstrate Retry's failed-payment detection and recovery workflow.
          </p>
        </div>
      </footer>
    </div>
  );
}
