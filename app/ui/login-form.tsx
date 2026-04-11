"use client";

import { useActionState } from "react";
import { loginUser } from "@/app/lib/actions";

const initialState = {
  message: "",
  errors: {},
};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <form
        action={formAction}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>Login</h1>

        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {state?.message && (
          <p style={{ color: "red", marginBottom: "10px" }}>{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#111",
            color: "white",
            cursor: "pointer",
          }}
        >
          {pending ? "Logging in..." : "Login"}
        </button>
        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account? <a href="/register">Register here</a>
        </p>
      </form>
    </div>
  );
}
