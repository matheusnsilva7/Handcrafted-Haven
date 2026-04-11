"use client";

import { useActionState } from "react";
import { createItem } from "@/app/lib/actions";

const initialState = {
  message: "",
  errors: {},
};

export default function CreateProductPage() {
  const [state, formAction, pending] = useActionState(createItem, initialState);

  return (
    <div className="create-product-page">
      <div className="create-product-card">
        <h1>Create Product</h1>

        <form action={formAction} className="create-product-form">
          <input
            name="title"
            placeholder="Title"
            required
            className="create-product-input"
          />


          <input
            name="price"
            type="number"
            placeholder="Price"
            required
            className="create-product-input"
          />


          <textarea
            name="description"
            placeholder="Description"
            required
            className="create-product-input"
          />

          <select name="category" required className="create-product-input">
            <option value="Clay & Ceramics">Clay & Ceramics</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Textiles">Textiles</option>
            <option value="Woodcraft">Woodcraft</option>
            <option value="Scents">Scents</option>
            <option value="Art">Art</option>
          </select>

          <input
            name="image"
            placeholder="/vase.jpg"
            className="create-product-input"
          />

          <input
            name="image_url"
            placeholder="https://..."
            className="create-product-input"
          />

          {state?.message && <p style={{ color: "red" }}>{state.message}</p>}

          <button disabled={pending}>
            {pending ? "Creating..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
