import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { cart, address, email }: { cart: CartItem[]; address: string; email: string } = await req.json();

    if (!cart || cart.length === 0 || !address || !email) {
      console.error("❌ Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();

    console.log("🔵 Creating Stripe session...");
    
    // ✅ Create Stripe session first
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.title, images: [item.image] },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id=${encodeURIComponent("{CHECKOUT_SESSION_ID}")}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      customer_email: email,
    });

    console.log("✅ Stripe Session Created:", session.id);

    console.log("🔵 Creating order in MongoDB...");
    const newOrder = await Order.create({
      userEmail: email,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      address,
      status: "pending",
      sessionId: session.id,
      createdAt: new Date(),
    });

    console.log("✅ Order Created:", newOrder._id);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("🚨 Checkout API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}