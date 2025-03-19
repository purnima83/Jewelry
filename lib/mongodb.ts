import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is missing in .env.local");
}

// ✅ Use globalThis to cache the connection properly
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

declare global {
  var mongooseCache: MongooseCache;
}

globalThis.mongooseCache = globalThis.mongooseCache || { conn: null, promise: null };

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (globalThis.mongooseCache.conn) return globalThis.mongooseCache.conn;

  if (!globalThis.mongooseCache.promise) {
    try {
      globalThis.mongooseCache.promise = mongoose.connect(MONGODB_URI, {
        dbName: "JewelryDB",
        bufferCommands: false,
      }).then(mongoose => {
        console.log("✅ Connected to MongoDB");
        return mongoose.connection;
      });
    } catch (error) {
      console.error("🚨 MongoDB Connection Error:", error);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  globalThis.mongooseCache.conn = await globalThis.mongooseCache.promise;
  return globalThis.mongooseCache.conn;
}