"use client";

import { useState } from "react";
import { updateUser, updateItem } from "@/app/lib/actions";
import Link from "next/link";

export default function UpdatePage() {
  const [message, setMessage] = useState("");

  async function handleUpdateUser(formData: FormData) {
    const res = await updateUser(formData);
    setMessage(res?.message || "✅ User updated!");
  }

  async function handleUpdateItem(formData: FormData) {
    const id = String(formData.get("id"));

    const res = await updateItem(formData);
    setMessage(res?.message || "✅ Item updated!");
  }

  return (
    <div style={{ padding: 20 }}>
      <Link href="/test">Home</Link> <br/>
      <Link href="/test/items">items</Link>
      <h1>✏️ Update Page</h1>

      <h2>Update User</h2>
      <form action={handleUpdateUser}>
        <input name="id" placeholder="ID" />
        <br />
        <input name="name" placeholder="New name" />
        <br />
        <input name="email" placeholder="New email" />
        <br />
        <button type="submit">Update User</button>
      </form>

      <hr />

      <h2>Update Item</h2>
      <form action={handleUpdateItem}>
        <input name="id" placeholder="Item ID" required />
        <br />
        <input name="title" placeholder="New title" required />
        <br />
        <input name="description" placeholder="New description" required />
        <br />
        <input name="price" type="number" placeholder="New price" required />
        <br />
        <button type="submit">Update Item</button>
      </form>

      <hr />

      <p>{message}</p>
    </div>
  );
}
