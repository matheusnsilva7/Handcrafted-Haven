import { Suspense } from 'react';
import { Metadata } from 'next';
import Form from '@/app/users/ui/create-user-form'
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page() {
  return (
    <main>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>Create User</h1>
        </div>
        <Form/>
      </div>
    </main>
  );
}
