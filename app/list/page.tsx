import Image from 'next/image';
import Link from 'next/link';
import { products, Product } from '@/data/products';

export default function List() {
  return (
    <main>
      <div>
        <h2 className="text-1xl font-bold">🔮상품 목록</h2>
      </div>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {products.map((product, i) => (
            <div 
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col items-center pt-4"
            >
              <div className="relative w-4/5 h-40 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={`${product.name} 이미지`}
                  layout="fill"
                  objectFit="cover"
                  className="hover:scale-105 transition-transform duration-300"
                  priority={i < 3} // Lazy load images after the first few
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h2>
                  <span className="bg-amber-100 text-amber-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {i + 1}번 상품
                  </span>
                </div>
                <p className="text-lg font-bold text-gray-900 mt-2">
                  {product.price.toLocaleString()}원
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
