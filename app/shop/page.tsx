"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>(["all", "jewelery"]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  };

  const handleSort = (order: "asc" | "desc") => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Filter Options */}
      <div className="flex space-x-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleFilter(category)}
            className={`px-4 py-2 rounded ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Sorting Options */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleSort("asc")}
          className={`px-4 py-2 rounded ${
            sortOrder === "asc" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Price: Low to High
        </button>
        <button
          onClick={() => handleSort("desc")}
          className={`px-4 py-2 rounded ${
            sortOrder === "desc" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          }`}
        >
          Price: High to Low
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`} className="border p-4 rounded-lg shadow-lg">
              <Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto" />
              <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
              <p className="text-gray-700">${product.price}</p>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found</p>
        )}
      </div>
    </div>
  );
}