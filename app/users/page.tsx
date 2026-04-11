import { getCurrentUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { updateUser, deleteUser } from "@/app/lib/actions";
import ProfilePage from "../ui/update-user-form";

export default async function user() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfilePage user={user} />;
}
