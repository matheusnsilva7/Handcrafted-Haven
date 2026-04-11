"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { sampleProducts } from "../lib/sample-products";
import { Product } from "../lib/types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
        const apiProducts = await res.json();
        setProducts([...apiProducts, ...sampleProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(sampleProducts);
      }
    };
    fetchProducts();
  }, []);

  // Categorías permitidas
  const allowedCategories = [
    "Clay & Ceramics",
    "Jewelry",
    "Textiles",
    "Woodcraft",
    "Scents",
    "Art",
  ];

  // Lista única de categorías
  const categories = ["all", ...new Set(products.map(p => p.category).filter(cat => allowedCategories.includes(cat)))];

  // Filtrar productos según categoría seleccionada
  const filtered = category === "all"
    ? products.filter(p => allowedCategories.includes(p.category))
    : products.filter(p => p.category === category);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Shop</h1>

      {/* Filtros */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: category === cat ? "2px solid var(--color-primary)" : "1px solid #ccc",
              background: category === cat ? "var(--color-primary-light)" : "#f9f9f9",
              color: category === cat ? "var(--color-primary)" : "#333",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            {cat === "all" ? "All" : cat}
          </button>
        ))}
      </div>

      {/* Productos */}
      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No hay productos en esta categoría todavía.</p>
      )}
    </div>
  );
}
