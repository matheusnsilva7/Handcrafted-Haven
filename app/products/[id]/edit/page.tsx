'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditProductPage({ params }: { params: { id: string } }) {
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id", params.id);

    await fetch("/api/products", {
      method: "PUT",
      body: formData,
    });

    alert("Product updated!");
    router.push("/products");
  }

  if (!product) return <p>Loading...</p>;

  return (
    <div className="edit-product-page">
      <div className="edit-product-card">
        <h1 className="edit-product-title">Edit Product</h1>
        <form onSubmit={handleSubmit} className="edit-product-form">
          <div className="edit-product-field">
            <label>Name</label>
            <input name="name" defaultValue={product.name} required className="edit-product-input" />
          </div>

          <div className="edit-product-field">
            <label>Price</label>
            <input name="price" defaultValue={product.price} required className="edit-product-input" />
          </div>

          <div className="edit-product-field">
            <label>Description</label>
            <textarea
              name="description"
              defaultValue={product.description}
              required
              className="edit-product-textarea"
            />
          </div>

          <div className="edit-product-field">
            <label>Category</label>
            <select name="category" defaultValue={product.category} required className="edit-product-input">
              <option value="Clay & Ceramics">Clay & Ceramics</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Textiles">Textiles</option>
              <option value="Woodcraft">Woodcraft</option>
              <option value="Scents">Scents</option>
              <option value="Art">Art</option>
            </select>
          </div>

          <button type="submit" className="edit-product-button">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
