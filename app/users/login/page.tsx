import { Suspense } from 'react';
import { Metadata } from 'next';
// import Form from '@/app/users/ui/login-form'
export const metadata: Metadata = {
  title: 'Invoices',
};

export default async function Page() {
  return (
    <main>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`text-2xl`}>Login</h1>
        </div>
      </div>
    </main>
  );
}
