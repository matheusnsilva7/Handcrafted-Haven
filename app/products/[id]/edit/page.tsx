import postgres from "postgres";
import { getCurrentUser } from "@/app/lib/auth";
import { redirect, notFound } from "next/navigation";
import EditItemForm from "./ui";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }
  const { id } = await props.params;
  const items = await sql`
    SELECT * FROM items WHERE id = ${Number(id)} LIMIT 1
  `;

  const item = items[0];

  if (!item) {
    return notFound();
  }

  if (item.user_id !== Number(user.id)) {
    redirect("/dashboard");
  }

  return <EditItemForm item={item} />;
}
