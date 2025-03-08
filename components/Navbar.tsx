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
          className="md:hidden text-gray-800 text-2xl focus:outline-none transition-transform duration-300"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu Items */}
        <ul
          className={`absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex md:space-x-6 transition-all duration-300 ease-in-out ${
            menuOpen ? "block opacity-100" : "hidden opacity-0 md:opacity-100"
          }`}
        >
          {["Home", "Shop", "About", "Contact"].map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.toLowerCase()}`}
                className="block px-6 py-3 text-gray-600 hover:text-gray-800"
                onClick={() => setMenuOpen(false)}
              >
                {item}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}