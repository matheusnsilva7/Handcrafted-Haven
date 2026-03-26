'use server';

import { hashPassword } from '@/auth';
// import { AuthError } from 'next-auth';
 
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
// import postgres from 'postgres';

// const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

const FormSchema = z.object({
  id: z.string(),
  email: z.string({ message: 'Please enter a email.' }),
  password: z.string({ message: 'Please enter an pasword.' }),
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
      message: 'There was a troble, check the fields..',
    };
  }

  const { email, password } = validatedFields.data;
  const safePassword = await hashPassword(password);
  try {
  // await sql`
  //   INSERT INTO Users (email, password)
  //   VALUES (${email}, ${password})
  // `;
  console.log('yay');
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

