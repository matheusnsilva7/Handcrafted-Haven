"use client";

import { useActionState } from "react";
import { registerUser } from "@/app/lib/actions";

const initialState = {
  message: "",
  errors: {},
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerUser,
    initialState
  );

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
          width: "380px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
          Create Account
        </h1>

        <div style={{ marginBottom: "15px" }}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          {state?.errors?.name && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {state.errors.name[0]}
            </p>
          )}
        </div>

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
          {state?.errors?.email && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {state.errors.email[0]}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create password"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
          {state?.errors?.password && (
            <p style={{ color: "red", fontSize: "14px" }}>
              {state.errors.password[0]}
            </p>
          )}
        </div>

        {state?.message && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {state.message}
          </p>
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
          {pending ? "Creating Account..." : "Register"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
}