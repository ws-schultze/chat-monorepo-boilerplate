import { signIn, signOut } from "@/authentication/auth";
import { PrimaryBtn } from "./primary-btn";
import { redirect } from "next/navigation";

interface SignInBtnProps {
  provider: string;
  children: React.ReactNode;
  height?: string;
  width?: string;
}

export function SignIn({ provider, children, height, width }: SignInBtnProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
      className={`${height ? height : ""} ${width ? width : ""}`}
    >
      <PrimaryBtn>{children}</PrimaryBtn>
    </form>
  );
}

interface SignOutBtnProps {
  children: React.ReactNode;
  props?: React.ComponentPropsWithRef<typeof PrimaryBtn>;
}

export function SignOut({ children }: SignOutBtnProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        redirect("/");
      }}
      className="w-full"
    >
      <PrimaryBtn>{children}</PrimaryBtn>
    </form>
  );
}
