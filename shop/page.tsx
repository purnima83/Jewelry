"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Define Product Type
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState<string>("default");

  // Fetch Products on Component Mount
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/category/jewelery")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  // Handle Category Filter
  const filterByCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === selectedCategory));
    }
  };

  // Handle Sorting
  const sortProducts = (order: string) => {
    setSort(order);
    let sortedProducts = [...filteredProducts];

    if (order === "price-low") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (order === "price-high") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Shop Jewelry</h1>

      {/* Filter and Sort Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Category Filter */}
        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => filterByCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="rings">Rings</option>
          <option value="necklaces">Necklaces</option>
          <option value="bracelets">Bracelets</option>
        </select>

        {/* Sort By Price */}
        <select
          className="border p-2 rounded"
          value={sort}
          onChange={(e) => sortProducts(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 shadow-md rounded-lg">
            <Image src={product.image} alt={product.title} width={200} height={200} className="mx-auto"/>
            <h3 className="text-lg font-semibold mt-2">{product.title}</h3>
            <p className="text-gray-700">${product.price}</p>
            <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
