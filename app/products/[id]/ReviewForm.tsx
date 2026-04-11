"use client";

import { useState } from "react";

export default function ReviewForm({ productId }: { productId: string }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/api/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, comment, stars }),
    });

    alert("Review submitted!");
    setStars(0);
    setComment("");
    setUser("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Your Name:</label><br />
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Rating:</label><br />
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            onClick={() => setStars(n)}
            style={{
              cursor: "pointer",
              fontSize: "1.5rem",
              color: n <= stars ? "#FFD700" : "#ccc",
              marginRight: "0.2rem"
            }}
          >
            ★
          </span>
        ))}
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <label>Comment:</label><br />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem" }}
        ></textarea>
      </div>
      <button type="submit" style={{ padding: "0.7rem 1.2rem", backgroundColor: "#0070f3", color: "#fff", border: "none", borderRadius: "4px" }}>
        Submit Review
      </button>
    </form>
  );
}
