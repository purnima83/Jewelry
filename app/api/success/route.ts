import { NextResponse } from "next/server";
import Stripe from "stripe";
import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId) {
      console.error("❌ Missing session ID");
      return NextResponse.json({ error: "Missing session ID" }, { status: 400 });
    }

    await connectToDatabase();

    console.log(`🔍 Searching for order with sessionId: ${sessionId}`);

    // ✅ Find order using sessionId
    const order = await Order.findOneAndUpdate(
      { sessionId },
      { status: "paid" },
      { new: true }
    );

    if (!order) {
      console.error(`❌ Order not found with sessionId: ${sessionId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    console.log("✅ Order Found and Updated:", order);

    return NextResponse.json(order);
  } catch (error) {
    console.error("🚨 Order Fetch Error:", error);
    return NextResponse.json({ error: "Failed to retrieve order" }, { status: 500 });
  }
}