'use client';

import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { createAcount, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createAcount, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-blue-800 p-4 md:p-6">
        <div className="mb-4">
          <label
            className="mb-3 mt-5 block text-xs font-medium text-white-900"
            htmlFor="email"
          >
            Email
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-white-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-white-900"
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email address"
              required
            />
          </div>
          <label
            className="mb-3 mt-5 block text-xs font-medium text-white-900"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-white-900 py-[9px] pl-10 text-sm outline-2 placeholder:text-white-900"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
          </div>
        {/* <Button type="submit">Create Acount</Button> */}
          <div className="mt-6 flex justify-center">
            <Button type="submit">Create Acount</Button>
          </div>
      </div>
      </div>
    </form>
  );
}
