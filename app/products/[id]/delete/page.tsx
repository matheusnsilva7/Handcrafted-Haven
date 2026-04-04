'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DeleteProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch("http://localhost:3000/api/products", { cache: "no-store" });
      const products = await res.json();
      const found = products.find((p: any) => p.id === params.id);
      setProduct(found);
    }
    fetchProduct();
  }, [params.id]);

  async function handleDelete() {
    await fetch("/api/products", {
      method: "DELETE",
      body: JSON.stringify({ id: params.id }),
    });
    alert("Product deleted!");
    router.push("/products");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="delete-product-page">
      <div className="delete-product-card">
        <h1 className="delete-product-title">Delete Product</h1>
        <p className="delete-product-text">
          Are you sure you want to delete <strong>{product.name}</strong>?
        </p>
        <div className="delete-product-actions">
          <button onClick={handleDelete} className="delete-product-button danger">
            Yes, Delete
          </button>
          <button onClick={() => router.push("/products")} className="delete-product-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
