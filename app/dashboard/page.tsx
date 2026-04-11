import Link from "next/link";
import postgres from "postgres";
import { getCurrentUser } from "@/app/lib/auth";
import { logoutUser, deleteItem } from "@/app/lib/actions";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const items = await sql`
    SELECT
      id,
      title,
      description,
      price,
      category,
      image,
      user_id
    FROM items
    WHERE user_id = ${Number(user.id)}
    ORDER BY id DESC
  `;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f7f7",
        padding: "30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>
              <h1 style={{ margin: 0 }}>Welcome, {String(user.name)} 👋</h1>

              <p style={{ color: "#666", marginTop: "8px" }}>
                Manage your products here.
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Link
                href="/users"
                style={{
                  padding: "12px 18px",
                  background: "#2563eb",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Update Profile
              </Link>

              <form action={logoutUser}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 18px",
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "25px" }}>
          <Link
            href="/products/create"
            style={{
              padding: "12px 18px",
              background: "#111",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              display: "inline-block",
            }}
          >
            + Create Product
          </Link>
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          {items.length === 0 && (
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              No products yet.
            </div>
          )}

          {items.map((item: any) => (
            <div
              key={item.id}
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              />
              <h3 style={{ marginTop: 0 }}>{item.title}</h3>

              <p>{item.description}</p>

              <p>
                <strong>$ {item.price}</strong>
              </p>

              <p style={{ color: "#666" }}>Category: {item.category}</p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <Link
                  href={`/products/${item.id}/edit`}
                  style={{
                    padding: "10px 14px",
                    background: "#2563eb",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Update
                </Link>

                <form onSubmit={deleteItem.bind(null, item.id)}>
                  <button
                    type="submit"
                    style={{
                      padding: "10px 14px",
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
