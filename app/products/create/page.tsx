'use client';

import { useState } from 'react';

export default function CreateProductPage() {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

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

    await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    alert('Product created!');
  }

  return (
    <div className="create-product-page">
      <div className="create-product-card">

        <h1 className="create-product-title">Create Product</h1>

        <form onSubmit={handleSubmit} className="create-product-form">

          {/* NAME */}
          <div className="create-product-field">
            <label>Name</label>
            <input
              name="name"
              required
              className="create-product-input"
            />
          </div>

          {/* PRICE */}
          <div className="create-product-field">
            <label>Price</label>
            <input
              name="price"
              required
              className="create-product-input"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="create-product-field">
            <label>Description</label>
            <textarea
              name="description"
              required
              className="create-product-textarea"
            />
          </div>

          {/* IMAGES */}
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

          {/* PREVIEW */}
          <div className="create-product-preview">
            {imagesPreview.map((src, i) => (
              <div key={i} className="create-product-image-box">
                <img src={src} className="create-product-image" />
              </div>
            ))}
          </div>

          {/* BUTTON */}
          <button type="submit" className="create-product-button">
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
}