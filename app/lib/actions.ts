"use server";

import postgres from "postgres";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: any;
  message?: string | null;
};

const ItemSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(1, "Description required"),
  price: z.coerce.number().gt(0, "Price must be > 0"),
});

const UserSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export async function createItem(prevState: State, formData: FormData) {
  const userId = 1; 

  if (!userId) return { message: "Not authenticated" };

  const validated = ItemSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { title, description, price } = validated.data;

  try {
    await sql`
      INSERT INTO items (title, description, price, user_id)
      VALUES (${title}, ${description}, ${price}, ${userId})
    `;
  } catch (e) {
    return { message: "Database error" };
  }

  revalidatePath("/test/items");
  redirect("/test/items");
}

export async function updateItem(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const userId = 1;

  if (!userId) return { message: "Not authenticated" };

  const validated = ItemSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { title, description, price } = validated.data;

  try {
    await sql`
      UPDATE items
      SET title = ${title},
          description = ${description},
          price = ${price}
      WHERE id = ${id} AND user_id = ${userId}
    `;
  } catch (e) {
    return { message: "Database error" };
  }

  revalidatePath("/test/items");
  redirect("/test/items");
}

export async function deleteItem(id: string) {
  const userId = 1;

  if (!userId) return { message: "Not authenticated" };

  try {
    await sql`
      DELETE FROM items
      WHERE id = ${id} 
    `; //AND user_id = ${userId}
  } catch (e) {
    return { message: "Database error" };
  }

  revalidatePath("/test/items");
}

export async function registerUser(prevState: State, formData: FormData) {
  const validated = UserSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { name, email, password } = validated.data;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashed})
    `;
  } catch (e) {
    return { message: "User already exists or DB error" };
  }

  redirect("/test/items");
}

export async function updateUser(prevState: State, formData: FormData) {
  const userId = String(formData.get("id") || 3);

  if (!userId) return { message: "Not authenticated" };

  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");

  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}
      WHERE id = ${userId}
    `;
  } catch (e) {
    return { message: "Database error" };
  }

  revalidatePath("/test/items");
}

export async function deleteUser() {
  const userId = 1;

  if (!userId) return { message: "Not authenticated" };

  try {
    await sql`DELETE FROM items WHERE user_id = ${userId}`;
    await sql`DELETE FROM users WHERE id = ${userId}`;
  } catch (e) {
    return { message: "Database error" };
  }

  redirect("/");
}
