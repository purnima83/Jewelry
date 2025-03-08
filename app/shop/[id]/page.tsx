"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row items-center">
        <Image src={product.image} alt={product.title} width={300} height={300} className="rounded-lg" />
        <div className="ml-8">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}