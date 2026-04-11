"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart, removeFromCart } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // cada vez que cambia la ruta, cerramos el panel del carrito
  useEffect(() => {
    setCartOpen(false);
  }, [pathname]);

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
            <li>
              <Link href="/shop" className="nav-link">
                Shop
              </Link>
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
          {/* Carrito con badge rojo */}
          <div style={{ position: "relative" }}>
            <ShoppingCart
              size={20}
              style={{ cursor: "pointer" }}
              onClick={() => setCartOpen(true)}
            />
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -6,
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "0.7rem",
                  padding: "2px 6px",
                  fontWeight: "bold",
                }}
              >
                {cart.length}
              </span>
            )}
          </div>

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
          <Link href="/shop" onClick={() => setMenuOpen(false)}>
            Shop
          </Link>
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

      {/* OVERLAY OSCURO */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            zIndex: 1500,
          }}
        />
      )}

      {/* MINI PANEL DE CARRITO */}
      {cartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "300px",
            height: "100%",
            background: "#695c8e",
            color: "#333",
            boxShadow: "-2px 0 12px rgba(0,0,0,0.3)",
            padding: "1rem",
            zIndex: 2001,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={() => setCartOpen(false)}
            style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
          >
            <X size={20} />
          </button>
          <h2>Tu carrito</h2>
          {cart.length === 0 ? (
            <p>No hay productos en el carrito.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
              {cart.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: "0.5rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {item.name} - ${item.price}
                  </span>
                  <button
                    onClick={() => removeFromCart(idx)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
          <Link href="/checkout" onClick={() => setCartOpen(false)}>
            <button className="btn-primary" style={{ marginTop: "auto" }}>
              Ir a pagar
            </button>
          </Link>
        </div>
      )}
    </header>
  );
}
