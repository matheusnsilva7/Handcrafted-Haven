"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { sampleProducts } from "../../lib/sample-products";
import { Product } from "../../lib/types";
import ReviewForm from "./ReviewForm";
import { useCart } from "../../context/CartContext"; // 👈 importamos el contexto

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart(); // 👈 usamos la función global

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
        const apiProducts: Product[] = await res.json();
        const allProducts = [...apiProducts, ...sampleProducts];
        const found = allProducts.find((p) => p.id === id);
        setProduct(found || null);
      } catch (error) {
        console.error("Error fetching products:", error);
        const found = sampleProducts.find((p) => p.id === id);
        setProduct(found || null);
      }
    };
    fetchProducts();
  }, [id]);

  if (!product) return <p>Product not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{product.name}</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "400px 1fr",
          gap: "2rem",
          alignItems: "flex-start",
        }}
      >
        {/* Imagen */}
        <div>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: "100%", borderRadius: "8px" }}
            />
          )}
        </div>

        {/* Datos + Reviews */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Datos */}
          <div>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
            {product.artisan && <p><strong>Artisan:</strong> {product.artisan}</p>}
            <p><strong>Description:</strong> {product.description}</p>

            {product.rating && (
              <p>
                <strong>Average Rating:</strong>{" "}
                {renderStars(product.rating)} ({product.rating.toFixed(1)})
              </p>
            )}

            {/* 👇 Botón de carrito global */}
            <button
              onClick={() => addToCart(product)}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Agregar al carrito
            </button>
          </div>

          {/* Reviews */}
          <div
            style={{
              maxWidth: "500px",
              backgroundColor: "#fafafa",
              padding: "0.8rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "0.9rem",
            }}
          >
            <h2 style={{ marginBottom: "0.8rem", fontSize: "1.1rem" }}>Reviews and Ratings</h2>

            {product.reviews && product.reviews.length > 0 ? (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {product.reviews.map((r, i) => (
                  <li
                    key={i}
                    style={{
                      marginBottom: "0.8rem",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "0.4rem",
                    }}
                  >
                    <strong>{r.user}</strong>: {renderStars(r.stars)}<br />
                    <span>{r.comment}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet. Be the first to leave one!</p>
            )}

            <ReviewForm productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) stars.push("⭐");
  if (halfStar) stars.push("✨");
  return stars.join(" ");
}
