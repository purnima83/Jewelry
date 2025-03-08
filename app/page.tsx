"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center bg-cover bg-center" 
        style={{ backgroundImage: "url('/hero-image.jpg')" }}>
        <h1 className="text-white text-4xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
          Discover Elegant Jewelry
        </h1>
      </section>

      {/* Product Listing */}
      <section className="mt-8">
        <h2 className="text-2xl font-bold text-center mb-4">Featured Jewelry</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md">
              <Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto"/>
              <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-700">${product.price}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}