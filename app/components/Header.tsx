"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: scrolled
          ? "rgba(255,255,255,0.95)"
          : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled
          ? "1px solid rgba(0,0,0,0.08)"
          : "1px solid transparent",
        transition: "all 0.3s ease",
      }}
    >
      <div
        className="container flex-between"
        style={{
          height: scrolled ? "65px" : "80px",
          transition: "all 0.3s ease",
        }}
      >
        {/* LOGO */}
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            letterSpacing: "1px",
            color: "var(--color-primary)",
            margin: 0,
            transition: "all 0.3s ease",
          }}
        >
          Handcrafted Haven
        </h1>

        {/* NAV */}
        <nav>
          <ul
            className="flex"
            style={{
              gap: "30px",
              listStyle: "none",
              fontWeight: "500",
            }}
          >
            <li>
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="nav-link">
                Products
              </Link>
            </li>
            <li>
              <Link href="#" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="flex" style={{ gap: "15px", alignItems: "center" }}>
          {/* ICONOS */}
          <ShoppingCart
            size={20}
            style={{ cursor: "pointer", transition: "0.2s" }}
          />
          <User
            size={20}
            style={{ cursor: "pointer", transition: "0.2s" }}
          />

          {/* CTA */}
          <button
            style={{
              background: "var(--color-primary)",
              color: "white",
              padding: "8px 18px",
              borderRadius: "999px",
              fontWeight: "500",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.background = "var(--color-accent)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.background = "var(--color-primary)";
            }}
          >
            Shop
          </button>
        </div>
      </div>
    </header>
  );
}