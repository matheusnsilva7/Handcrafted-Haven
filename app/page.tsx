"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-content">

          {/* TEXTO */}
          <div className="hero-text">
            <h1 className="fade-in">
              Discover Unique <br /> Handcrafted Treasures
            </h1>

            <p className="fade-in fade-in-delay">
              Support artisans, explore creativity, and bring meaningful,
              handmade pieces into your everyday life.
            </p>

            <div className="hero-buttons fade-in fade-in-delay-2">
              <Link href="/products">
                <button className="btn-primary">Shop Now</button>
              </Link>

              <Link href="/about">
                <button className="btn-secondary">
                  Learn More
                </button>
              </Link>
            </div>
          </div>

          {/* IMAGEN CON PARALLAX */}
          <div
            className="hero-image fade-in fade-in-delay"
            style={{
              transform: `translateY(${offset}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d"
              alt="Handcrafted items"
            />
          </div>

        </div>
      </section>
    </main>
  );
}