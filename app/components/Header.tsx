"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const categories = [
  { name: "Clay & Ceramics", slug: "ceramics" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Textiles", slug: "textiles" },
  { name: "Woodcraft", slug: "wood" },
  { name: "Scents", slug: "scents" },
  { name: "Art", slug: "art" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

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
              <Link href="/" className="nav-link">
                Home
              </Link>
            </li>

            {/* SHOP DROPDOWN */}
            <li
              className="dropdown"
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}
              style={{ position: "relative" }}
            >
              <span className="nav-link" style={{ cursor: "pointer" }}>
                Shop ▾
              </span>

              {shopOpen && (
                <ul className="dropdown-menu">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link href={`/shop/${cat.slug}`}>{cat.name}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

            <li>
              <Link href="/makers" className="nav-link">
                Makers
              </Link>
            </li>

            <li>
              <Link href="/about" className="nav-link">
                About
              </Link>
            </li>
          </ul>
        </nav>

        {/* ACTIONS DESKTOP */}
        <div
          className="desktop-actions flex"
          style={{ gap: "15px", alignItems: "center" }}
        >
          <ShoppingCart size={20} />
          <Link href="/login">
            <User size={20} />
          </Link>
          <Link href="/shop">
            <button className="btn-primary">Shop</button>
          </Link>
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
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <div>
            <strong>Shop</strong>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/makers" onClick={() => setMenuOpen(false)}>
            Makers
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>

          <div style={{ marginTop: "20px" }}>
            <Link href="/shop">
              <button className="btn-primary">Shop</button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
