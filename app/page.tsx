"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://fakestoreapi.com/products/category/jewelery");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="relative h-[500px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-image.jpg')" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-5xl font-bold">Discover Timeless Elegance</h1>
        </div>
      </header>

      {/* Products */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image src={product.image} alt={product.title} width={300} height={300} className="w-full h-60 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-medium">{product.title}</h3>
                  <p className="text-gray-600">${product.price.toFixed(2)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading products...</p>
          )}
        </div>
      </section>
    </main>
  );
}
