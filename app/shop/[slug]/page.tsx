"use client";
import React, { useState, useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import { sampleProducts } from "../../lib/sample-products";
import { Product } from "../../lib/types";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products", {
          cache: "no-store",
        });
        const data = await res.json();
        setProducts([...data, ...sampleProducts]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([...sampleProducts]);
      }
    };

    fetchProducts();
  }, []);

  // Mapa de equivalencias entre slug y categoría exacta
  const categoryMap: Record<string, string> = {
    ceramics: "Clay & Ceramics",
    jewelry: "Jewelry",
    textiles: "Textiles",
    wood: "Woodcraft",
    scents: "Scents",
    art: "Art",
  };

  const categoryName = categoryMap[slug];
  const filtered = products.filter((p) => p.category === categoryName);

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>{categoryName}</h2>

      {filtered.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No hay productos en esta categoría todavía.</p>
      )}
    </div>
  );
}
