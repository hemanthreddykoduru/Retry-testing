import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h2>
          <span className="text-lg font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            ₹{product.price}
          </span>
        </div>
        <p className="text-gray-600">{product.description}</p>
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-100 mt-auto">
        <Link 
          href={`/checkout/${product.id}`}
          className="block w-full text-center bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition-colors"
        >
          Pay ₹{product.price} — Razorpay Test Mode
        </Link>
      </div>
    </div>
  );
}
