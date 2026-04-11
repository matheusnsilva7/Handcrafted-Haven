"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateProductPage() {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const router = useRouter();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setImagesPreview(urls);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // 👇 convertir precio a número antes de enviar
    const price = formData.get("price");
    if (price) {
      formData.set("price", String(Number(price)));
    }

    if (imagesPreview.length > 0) {
      formData.append("imageUrl", imagesPreview[0]);
    }

    await fetch("/api/products", {
      method: "POST",
      body: formData,
    });

    alert("Product created!");
    router.push("/products");
  }

  return (
    <div className="create-product-page">
      <div className="create-product-card">
        <h1 className="create-product-title">Create Product</h1>

        <form onSubmit={handleSubmit} className="create-product-form">
          <div className="create-product-field">
            <label>Name</label>
            <input name="name" required className="create-product-input" />
          </div>

          <div className="create-product-field">
            <label>Price</label>
            <input
              type="number" // 👈 ahora es numérico
              name="price"
              required
              className="create-product-input"
            />
          </div>

          <div className="create-product-field">
            <label>Description</label>
            <textarea name="description" required className="create-product-textarea" />
          </div>

          <div className="create-product-field">
            <label>Category</label>
            <select name="category" required className="create-product-input">
              <option value="Clay & Ceramics">Clay & Ceramics</option>
              <option value="Jewelry">Jewelry</option>
              <option value="Textiles">Textiles</option>
              <option value="Woodcraft">Woodcraft</option>
              <option value="Scents">Scents</option>
              <option value="Art">Art</option>
            </select>
          </div>

          <div className="create-product-field">
            <label>Images</label>
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="create-product-preview">
            {imagesPreview.map((src, i) => (
              <div key={i} className="create-product-image-box">
                <img src={src} className="create-product-image" />
              </div>
            ))}
          </div>

          <button type="submit" className="create-product-button">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
