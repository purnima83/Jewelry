import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, 
  items: [
    {
      id: Number,
      title: String,
      price: Number,
      image: String,
      quantity: Number,
    }
  ],
  total: Number,
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  sessionId: { type: String, required: true },  // ✅ Add sessionId field
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;