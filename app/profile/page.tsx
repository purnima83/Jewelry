"use client";

import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import Image from "next/image";

interface Order {
  _id: string;
  items: { id: number; title: string; price: number; image: string; quantity: number }[];
  total: number;
  status: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [session]);

  if (!session) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
        <button
          onClick={() => signIn()}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6">My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Order ID: {order._id}</h3>
              <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Status: <span className="font-semibold">{order.status}</span></p>
              <p className="text-lg font-bold mt-2">Total: ${order.total.toFixed(2)}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="border p-3 rounded-lg flex items-center">
                    <Image src={item.image} alt={item.title} width={60} height={60} className="rounded" />
                    <div className="ml-4">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-600">${item.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}