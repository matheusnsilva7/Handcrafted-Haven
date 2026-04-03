"use client";

import { useState } from "react";
import { registerUser, createItem } from "@/app/lib/actions";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function TestPage() {
  const [message, setMessage] = useState("");

  async function handleRegister(formData: FormData) {
    const res = await registerUser({} as any, formData);
    setMessage(res?.message || "User created!");
  }

  async function handleLogin(e: any) {
    e.preventDefault();
    console.log("hey");
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const res = await signIn("credentials", {
      redirect: false, 
      email,
      password,
    });

    if (res?.error) {
      setMessage("❌ Login failed: " + res.error);
    } else {
      setMessage("✅ Logged in!");
      window.location.reload();
    }
  }

  async function handleCreateItem(formData: FormData) {
    const res = await createItem({} as any, formData);
    setMessage(res?.message || "Item created!");
  }

  return (
    <div style={{ padding: 20 }}>
      <Link href="/test/items">items</Link> <br />
      <Link href="/test/update">update</Link>
      <h1>🧪 Test Page</h1>

      <h2>Register</h2>
      <form action={handleRegister}>
        <input name="name" placeholder="Name" required />
        <br />
        <input name="email" placeholder="Email" required />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <hr />

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input name="email" placeholder="Email" required />
        <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        <br />
        {/*<button type="submit">Login</button>*/}
      </form>
      <hr />

      <h2>Create Item</h2>
      <form action={handleCreateItem}>
        <input name="title" placeholder="Title" required />
        <br />
        <input name="description" placeholder="Description" required />
        <br />
        <input name="price" type="number" placeholder="Price" required />
        <br />
        <button type="submit">Create Item</button>
      </form>
      <hr />
      <p>{message}</p>
    </div>
  );
}
