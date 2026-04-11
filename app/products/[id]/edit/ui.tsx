"use client";

import { useState } from "react";
import { updateItem } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

export default function EditItemForm({ item }: any) {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    const res = await updateItem(formData);
    setMessage(res?.message || "Updated!");

    if (!res?.message) {
      router.push("/dashboard");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 80,
        background: "rgb(247, 247, 247)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 420 }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: 20,
            fontSize: 28,
            fontWeight: "bold",
          }}
        >
          Edit product
        </h1>

        <form
          action={handleSubmit}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <input type="hidden" name="id" value={item.id} />

          {[
            {
              name: "title",
              label: "Title",
              placeholder: "Title",
              defaultValue: item.title,
            },
            {
              name: "description",
              label: "Description",
              placeholder: "Description",
              defaultValue: item.description,
            },
            {
              name: "price",
              label: "Price",
              placeholder: "Price",
              defaultValue: item.price,
            },
            {
              name: "image",
              label: "Image Path",
              placeholder: "Image path",
              defaultValue: item.image,
            },
            {
              name: "image_url",
              label: "Image URL",
              placeholder: "Image URL",
              defaultValue: item.image_url,
            },
          ].map((field) => (
            <div
              key={field.name}
              style={{ display: "flex", flexDirection: "column", gap: 6 }}
            >
              <label
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                {field.label}
              </label>

              <input
                name={field.name}
                defaultValue={field.defaultValue}
                placeholder={field.placeholder}
                style={{
                  padding: "12px 14px",
                  borderRadius: "10px",
                  border: "1px solid #ddd",
                  outline: "none",
                  fontSize: 14,
                  transition: "0.2s",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.border = "1px solid #111")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border = "1px solid #ddd")
                }
              />
            </div>
          ))}

          <label
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#333",
            }}
          >
            Category
          </label>

          <select
            name="category"
            defaultValue={item.category}
            required
            style={{
              padding: "12px 14px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              outline: "none",
              fontSize: 14,
              background: "white",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onFocus={(e) => (e.currentTarget.style.border = "1px solid #111")}
            onBlur={(e) => (e.currentTarget.style.border = "1px solid #ddd")}
          >
            <option value="Clay & Ceramics">Clay & Ceramics</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Textiles">Textiles</option>
            <option value="Woodcraft">Woodcraft</option>
            <option value="Scents">Scents</option>
            <option value="Art">Art</option>
          </select>

          <button
            type="submit"
            style={{
              marginTop: 10,
              padding: "12px",
              borderRadius: "10px",
              border: "none",
              background: "#111",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Update Item
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: 15,
              textAlign: "center",
              color: "green",
              fontWeight: 500,
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
