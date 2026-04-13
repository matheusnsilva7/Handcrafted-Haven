"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { sampleProducts } from "../lib/sample-products";
import { Product } from "../lib/types";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true); // nuevo estado

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
        const apiProducts = await res.json();
        setProducts([...apiProducts, ...sampleProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts(sampleProducts);
      } finally {
        setLoading(false); // termina la carga
      }
    };
    fetchProducts();
  }, []);

  const allowedCategories = ["Clay & Ceramics","Jewelry","Textiles","Woodcraft","Scents","Art"];
  const categories = ["all", ...new Set(products.map(p => p.category).filter(cat => allowedCategories.includes(cat)))];

  const filtered = category === "all"
    ? products.filter(p => allowedCategories.includes(p.category))
    : products.filter(p => p.category === category);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Shop</h1>

      {/* Filtros */}
      <div style={{ marginBottom: "1.5rem", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}>{cat === "all" ? "All" : cat}</button>
        ))}
      </div>

      {/* Productos */}
      {loading ? (
        <p>Loading products...</p> //estado de carga
      ) : filtered.length > 0 ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px" }}>
          {filtered.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <p>There are no products in this category yet</p>
      )}
    </div>
  );
}
