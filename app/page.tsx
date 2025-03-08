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
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-image.jpg')" }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <h1 className="relative z-10 text-white text-4xl md:text-6xl font-bold text-center px-4 py-2">
          Discover Elegant Jewelry
        </h1>
      </section>

      {/* Product Listing */}
      <section className="mt-8 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Featured Jewelry</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="mx-auto rounded"
              />
              <h3 className="text-lg font-semibold mt-3 text-center">
                {product.title}
              </h3>
              <p className="text-gray-700 text-center">${product.price}</p>
              <button className="mt-3 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}