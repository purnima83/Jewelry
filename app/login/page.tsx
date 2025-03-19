"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="container mx-auto px-6 py-8 text-center">
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>
      <button
        onClick={() => signIn("github")}
        className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700 mb-4"
      >
        Sign in with GitHub
      </button>
      <br />
      <button
        onClick={() => signIn("google")}
        className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-500"
      >
        Sign in with Google
      </button>
    </div>
  );
}