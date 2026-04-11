"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [paid, setPaid] = useState(false);

  // 👇 convertir siempre a número
  const total = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const handlePayment = () => {
    setPaid(true);
    clearCart(); // 👈 vacía el carrito al finalizar compra
  };

  if (paid) {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Thank you for your purchase!</h1>
        <p>Your order is being processed.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <h2>Order Summary</h2>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "0.8rem",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "0.4rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{item.name} - ${item.price}</span>
                <button
                  onClick={() => removeFromCart(idx)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "1rem" }}>Total: ${total.toFixed(2)}</h3>

          <button
            className="btn-primary"
            style={{ marginTop: "1.5rem" }}
            onClick={handlePayment}
          >
            Complete Purchase
          </button>
        </div>
      )}
    </div>
  );
}
