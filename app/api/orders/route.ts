import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // ✅ Ensure NextAuth is configured

// ✅ POST: Save order to MongoDB
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { userEmail, items, total, address } = await req.json();

    // ✅ Check for missing fields
    if (!userEmail || !items || !total || !address) {
      console.error("🚨 Missing fields:", { userEmail, items, total, address });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Ensure `items` is an array
    if (!Array.isArray(items) || items.length === 0) {
      console.error("🚨 Invalid items array:", items);
      return NextResponse.json({ error: "Invalid items data" }, { status: 400 });
    }

    // ✅ Save order to MongoDB
    const newOrder = new Order({ userEmail, items, total, address });
    await newOrder.save();

    console.log("✅ Order created successfully:", newOrder);

    return NextResponse.json({ message: "Order created successfully", order: newOrder }, { status: 201 });
  } catch (error) {
    console.error("🚨 Order API Error:", error);
    return NextResponse.json({ error: "Server error. Check logs for details." }, { status: 500 });
  }
}

// ✅ GET: Fetch user orders
export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Find orders for logged-in user
    const orders = await Order.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.error("🚨 Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}