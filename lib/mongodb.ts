import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI in .env.local");
}

let cached: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } =
  globalThis.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "JewelryDB",
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("✅ Connected to MongoDB");
      return mongoose.connection;
    }).catch((error) => {
      console.error("🚨 MongoDB Connection Error:", error);
      throw new Error("Failed to connect to MongoDB");
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}