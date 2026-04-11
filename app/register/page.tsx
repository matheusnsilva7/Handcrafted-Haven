import { Metadata } from "next";
import RegisterPage from "@/app/ui/create-user-form";
import { redirect } from "next/navigation";
import { getCurrentUser } from "../lib/auth";
export const metadata: Metadata = {
  title: "Invoices",
};

export default async function Page() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <RegisterPage />;
}
