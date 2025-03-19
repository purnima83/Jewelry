"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext"; // ✅ Import Cart Context

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export default function ProductDetail() {
  const { id } = useParams(); // ✅ Get product ID from URL
  const { addToCart } = useCart(); // ✅ Use Cart Context
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setError("Failed to load product.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error) return <p className="text-center py-8 text-red-500">{error}</p>;
  if (!product) return <p className="text-center py-8">Product not found.</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <Image src={product.image} alt={product.title} width={300} height={300} className="rounded-lg" />
        <div className="ml-8">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>

          {/* ✅ Fix: Ensure correct product structure when adding to cart */}
          <button
            onClick={() => addToCart({ ...product, quantity: 1 })}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}