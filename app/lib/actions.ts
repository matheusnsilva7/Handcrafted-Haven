'use server';

import { hashPassword } from '@/auth';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

/* =======================================================
  MOCK USER (simula usuario logueado)
======================================================= */
const CURRENT_USER_ID = 'user_123';

/* =======================================================
  MOCK DATABASE (sin DB real)
======================================================= */
let products: any[] = [];

/* =======================================================
  AUTH 
======================================================= */
const FormSchema = z.object({
  id: z.string(),
  email: z.string({ message: 'Please enter an email.' }),
  password: z.string({ message: 'Please enter a password.' }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createAcount(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'There was a problem, check the fields.',
    };
  }

  const { email, password } = validatedFields.data;
  const safePassword = await hashPassword(password);

  try {
    console.log('User created:');
    console.log(email);
    console.log(safePassword);
  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create User.',
    };
  }

  revalidatePath('/users/login');
  redirect('/users/login');
}

/* =======================================================
  PRODUCT SCHEMA (VALIDACIÓN)
======================================================= */
const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  price: z.string().min(1, 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  images: z.array(z.any()).min(1, 'At least one image is required'),
});

/* =======================================================
  CREATE PRODUCT
======================================================= */
export async function createProduct(formData: FormData) {
  try {
    const name = formData.get('name');
    const price = formData.get('price');
    const description = formData.get('description');

    if (!name || !price || !description) {
      console.log('Validation failed');
      return;
    }

    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price,
      description,
      userId: CURRENT_USER_ID,
    };

    products.push(newProduct);

    console.log('PRODUCT CREATED:', newProduct);

    revalidatePath('/products');
    redirect('/products');

  } catch (error) {
    console.error('SERVER ERROR:', error);
  }
}

/* =======================================================
  GET ALL PRODUCTS (solo del usuario)
======================================================= */
export async function getProducts() {
  return products.filter((p) => p.userId === CURRENT_USER_ID);
}

/* =======================================================
  GET PRODUCT BY ID
======================================================= */
export async function getProductById(id: string) {
  const product = products.find((p) => p.id === id);

  if (!product || product.userId !== CURRENT_USER_ID) {
    throw new Error('Unauthorized');
  }

  return product;
}

/* =======================================================
  UPDATE PRODUCT
======================================================= */
export async function updateProduct(formData: FormData) {
  const id = formData.get('id');

  const product = products.find((p) => p.id === id);

  if (!product || product.userId !== CURRENT_USER_ID) {
    throw new Error('Unauthorized');
  }

  product.name = formData.get('name');
  product.price = formData.get('price');
  product.description = formData.get('description');

  console.log('PRODUCT UPDATED:', product);

  revalidatePath('/products');
  redirect('/products');
}

/* =======================================================
  DELETE PRODUCT
======================================================= */
export async function deleteProduct(formData: FormData) {
  const id = formData.get('id');

  const product = products.find((p) => p.id === id);

  if (!product || product.userId !== CURRENT_USER_ID) {
    throw new Error('Unauthorized');
  }

  products = products.filter((p) => p.id !== id);

  console.log('PRODUCT DELETED:', id);

  revalidatePath('/products');
}