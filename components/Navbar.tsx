"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold text-gray-800 cursor-pointer">
            Jewelry Store
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu Items */}
        <ul
          className={`absolute md:relative top-full left-0 w-full bg-white md:bg-transparent md:flex md:space-x-6 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          } md:block`}
        >
          <li>
            <Link href="/" className="block px-4 py-2 text-gray-600 hover:text-gray-800">
              Home
            </Link>
          </li>
          <li>
            <Link href="/shop" className="block px-4 py-2 text-gray-600 hover:text-gray-800">
              Shop
            </Link>
          </li>
          <li>
            <Link href="/about" className="block px-4 py-2 text-gray-600 hover:text-gray-800">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="block px-4 py-2 text-gray-600 hover:text-gray-800">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}