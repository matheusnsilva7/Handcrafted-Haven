"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        }}
      >
        {/* LOGO */}
        <h1
          style={{
            fontSize: "1.5rem",
            color: "var(--color-primary)",
            margin: 0,
          }}
        >
          Handcrafted Haven
        </h1>

        {/* NAV DESKTOP */}
        <nav className="desktop-nav">
          <ul className="flex" style={{ gap: "30px", listStyle: "none" }}>
            <li>
              <Link href="/" className="nav-link">Home</Link>
            </li>
            <li>
              <Link href="/products" className="nav-link">Products</Link>
            </li>
            <li>
              <Link href="#">About</Link>
            </li>
          </ul>
        </nav>

        {/* ACTIONS DESKTOP */}
        <div className="desktop-actions flex" style={{ gap: "15px", alignItems: "center" }}>
          <ShoppingCart size={20} />
          <User size={20} />
          <button className="btn-primary">Shop</button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="mobile-menu-btn">
          {menuOpen ? (
            <X size={26} onClick={() => setMenuOpen(false)} />
          ) : (
            <Menu size={26} onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link href="#" onClick={() => setMenuOpen(false)}>About</Link>

          <div style={{ marginTop: "20px" }}>
            <button className="btn-primary">Shop</button>
          </div>
        </div>
      )}
    </header>
  );
}