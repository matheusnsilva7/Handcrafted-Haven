"use server";

import postgres from "postgres";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, getCurrentUser, logoutSession } from "./auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export type State = {
  errors?: any;
  message?: string | null;
};

const ItemSchema = z.object({
  title: z.string().min(1, "Title required"),
  description: z.string().min(1, "Description required"),
  price: z.coerce.number().gt(0, "Price must be > 0"),
  category: z.string().min(1, "Category required"),
  image: z.string().optional(),
  image_url: z.string().optional(),
});

const UserSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export async function createItem(prevState: State, formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { message: "Not authenticated" };
  }

  const title = String(formData.get("title"));
  const description = String(formData.get("description"));
  const price = Number(formData.get("price"));
  const category = String(formData.get("category"));
  const image = formData.get("image") ? String(formData.get("image")) : null;
  const image_url = formData.get("image_url")
    ? String(formData.get("image_url"))
    : null;

  try {
    await sql`
  INSERT INTO items (
    title,
    description,
    price,
    category,
    artisan,
    image,
    image_url,
    user_id
  )
  VALUES (
    ${title},
    ${description},
    ${price},
    ${category},
    ${String(user.name)},
    ${String(image)},
    ${String(image_url)},
    ${Number(user.id)}
  )
`;
  } catch (e) {
    return { message: "Database error" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateItem(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    return { message: "Not authenticated" };
  }

  const id = String(formData.get("id"));

  const validated = ItemSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    category: formData.get("category"),
    image: formData.get("image"),
    image_url: formData.get("image_url"),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Invalid fields",
    };
  }

  const { title, description, price, category, image, image_url } =
    validated.data;

  await sql`
    UPDATE items
    SET
      title = ${title},
      description = ${description},
      price = ${price},
      category = ${category},
      image = ${String(image)},
      image_url = ${String(image_url)}
    WHERE id = ${Number(id)} AND user_id = ${Number(user.id)}
  `;

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteItem(id: string) {
  const userId = await getCurrentUser();

  if (!userId) return { message: "Not authenticated" };

  try {
    await sql`
    DELETE FROM items
    WHERE id = ${id} AND user_id = ${Number(userId.id)}
  `;
  } catch (e) {
    return { message: "Database error" };
  }

  revalidatePath("/dashboard");
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
    const result = await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashed})
      RETURNING id, name, email
    `;

    const user = result[0];

    await createSession({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (e) {
    return {
      message: "User already exists or database error",
    };
  }

  redirect("/dashboard");
}

export async function updateUser(formData: FormData) {
  const id = Number(formData.get("id") || "");

  if (!id) return { message: "Not authenticated" };
  const name = String(formData.get("name") || "");
  const email = String(formData.get("email") || "");

  try {
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}
      WHERE id = ${id}
    `;

    await createSession({
      id,
      name,
      email,
    });
  } catch (e) {
    return { message: "Database error" };
  }

  redirect("/dashboard");
}

export async function deleteUser() {
  const user = await getCurrentUser();

  if (!user) return;

  try {
    await sql`DELETE FROM users WHERE id = ${Number(user.id)}`;
  } catch (e) {
    return;
  }

  await logoutUser();
}

export async function loginUser(prevState: State, formData: FormData) {
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const users = await sql`
    SELECT * FROM users WHERE email = ${email}
  `;

  const user = users[0];

  if (!user) return { message: "Invalid credentials" };

  const match = await bcrypt.compare(password, user.password);

  if (!match) return { message: "Invalid credentials" };

  await createSession({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  redirect("/dashboard");
}

export async function logoutUser() {
  await logoutSession();
  redirect("/login");
}
