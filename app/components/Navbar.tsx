"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/company", label: "Company" },
  { href: "/projects", label: "Projects" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar-transition fixed top-8 left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 items-center rounded-md bg-linear-to-b from-black/10 via-black/10 to-black/5 px-6 py-2 backdrop-blur-xl md:w-full">
      {/* Left Section - Logo */}
      <div className="flex flex-1 items-center">
        <Link href="/" className="flex cursor-pointer items-center">
          <Image
            src="/images/logovintage.svg"
            alt="COAN Logo"
            width={110}
            height={28}
            priority
            className="h-5 w-auto md:h-6"
          />
        </Link>
      </div>

      {/* Desktop Navigation - Perfectly Centered */}
      <div className="desktop-nav absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="cursor-pointer py-1 text-[0.95rem] tracking-wide text-white/90 transition-colors duration-200 hover:text-white/60"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right Section - Contact Link & Mobile Button */}
      <div className="flex flex-1 items-center justify-end gap-4">
        {/* Contact Link - Desktop */}
        <Link
          href="/contact"
          className="desktop-nav bg-secondary hover:bg-secondary cursor-pointer rounded-[1px] px-4 py-2 text-[0.95rem] tracking-wide text-white transition-all duration-200"
        >
          Contact
        </Link>
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-btn hidden cursor-pointer border-none bg-transparent p-2 text-2xl text-white"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="mobile-nav absolute top-full right-0 left-0 mt-2 flex flex-col gap-2 rounded-md bg-black/30 p-4 backdrop-blur-xl">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="cursor-pointer rounded px-4 py-3 text-base text-white/90 no-underline transition-all duration-200 hover:bg-white/10"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="bg-tertiary hover:bg-secondary cursor-pointer rounded-[1px] px-4 py-3 text-base text-white no-underline transition-all duration-200"
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
