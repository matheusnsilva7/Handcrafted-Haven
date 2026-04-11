"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-primary)",
        color: "white",
        marginTop: "auto",
      }}
    >
      <div className="container" style={{ padding: "60px 20px" }}>
        
        {/* TOP SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "40px",
          }}
        >
          {/* BRAND */}
          <div>
            <h2 style={{ marginBottom: "10px" }}>
              Handcrafted Haven
            </h2>
            <p style={{ opacity: 0.8 }}>
              Celebrating creativity, supporting artisans, and bringing unique handcrafted treasures to your home.
            </p>
          </div>

          {/* LINKS */}
          <div>
            <h3 style={{ marginBottom: "10px" }}>Explore</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><Link href="/" className="nav-link">Home</Link></li>
              <li><Link href="/shop" className="nav-link">Shop</Link></li>
              <li><Link href="/makers" className="nav-link">Makers</Link></li>
              <li><Link href="/about" className="nav-link">About</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 style={{ marginBottom: "10px" }}>Contact</h3>
            <p>Email: hello@handcrafted.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          style={{
            marginTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.2)",
            paddingTop: "20px",
            textAlign: "center",
            fontSize: "0.9rem",
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} Handcrafted Haven — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
