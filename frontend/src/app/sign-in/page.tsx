import { Session } from "next-auth";
import { GoogleSignInBtn } from "@/components/server/buttons/google-sign-in-btn";
import { redirect } from "next/navigation";
import { auth } from "@/authentication/auth";
import { GitHubSignInBtn } from "@/components/server/buttons/github-sign-in-btn";

export default async function SignInPage() {
  const session = await auth();
  console.log(session?.user);
  if (!session) {
    return (
      <div className="flex flex-col gap-3 items-center">
        <GoogleSignInBtn />
        <GitHubSignInBtn />
      </div>
    );
  }

  if (session && !session.user.username) {
    redirect("/create-username");
  }

  if (session && session.user.username) {
    redirect("/chat");
  }
}
