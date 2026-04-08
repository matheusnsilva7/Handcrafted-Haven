import { sql } from "@vercel/postgres";
import * as actions from "../../lib/actions";
import Link from "next/link";

export default async function ItemsPage() {
  const { rows: items } = await sql`
  SELECT 
    items.id,
    items.title,
    items.description,
    items.price,
    items.category,
    items.image,
    items.user_id,
    users.name AS user_name,
    users.email
  FROM items
  JOIN users ON items.user_id = users.id
  ORDER BY items.id DESC
`;

  const { rows: users } = await sql`
    SELECT id, name, email FROM users
    ORDER BY id DESC
  `;

  console.log
  return (
    <div style={{ padding: "20px" }}>
      <Link href="/test">Home</Link> <br />
      <Link href="/test/update">Update</Link>
      <h1>🛒 Marketplace</h1>
      <hr />
      <h2>📦 Items</h2>
      {items.length === 0 && <p>No items yet.</p>}
      {items.map((item: any) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>{item.name}</h3>

          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "150px", borderRadius: "6px" }}
            />
          )}

          <p>{item.description}</p>
          <p>ID = {item.id}</p>
          <p>💲 {item.price}</p>

          <p>📂 Category: {item.category}</p>

          <p>
            👤 Seller: <strong>{item.user_name}</strong>
          </p>

          <form onSubmit={actions.deleteItem.bind(null, item.id)}>
            <button type="submit">❌ Delete Item</button>
          </form>
        </div>
      ))}
      <hr />
      <h2>👥 All Users</h2>
      {users.length === 0 && <p>No users yet.</p>}
      {users.map((user: any) => (
        <div
          key={user.id}
          style={{
            border: "1px solid #aaa",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "6px",
          }}
        >
          <p>
            <strong>{user.name}</strong>
          </p>
          <p>{user.email}</p>
          <p>ID= {user.id}</p>
        </div>
      ))}
    </div>
  );
}
