"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const router = useRouter(); // ✅ Initialize router

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty. <Link href="/shop" className="text-blue-500 underline">Shop Now</Link>
        </p>
      ) : (
        <div>
          {/* Cart Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cart.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg shadow-lg">
                <Image src={product.image} alt={product.title} width={150} height={150} className="mx-auto rounded" />
                <h3 className="mt-2 text-lg font-semibold text-center">{product.title}</h3>
                <p className="text-gray-700 text-center">${product.price} x {product.quantity}</p>

                {/* Quantity Controls */}
                <div className="flex justify-center space-x-2 mt-2">
                  <button
                    onClick={() => updateQuantity(product.id, product.quantity - 1)}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 bg-white border">{product.quantity}</span>
                  <button
                    onClick={() => updateQuantity(product.id, product.quantity + 1)}
                    className="px-3 py-1 bg-gray-300 text-gray-800 rounded"
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="mt-2 w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 p-4 border-t text-center">
            <h3 className="text-xl font-semibold">Total: ${totalPrice.toFixed(2)}</h3>
            
            {/* ✅ Proceed to Checkout Button - Navigates to /checkout */}
            <button
              onClick={() => router.push("/checkout")}
              className="mt-3 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}