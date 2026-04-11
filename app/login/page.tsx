import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/auth";
import LoginForm from "../ui/login-form";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}
