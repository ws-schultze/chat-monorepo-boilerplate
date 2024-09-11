import Image from "next/image";
import GoogleLogo from "public/google-logo.svg";
import { SignIn } from "./auth-btns";

export function GoogleSignInBtn() {
  return (
    <SignIn provider="google">
      <Image
        src={GoogleLogo}
        alt="Google Logo"
      />
      Sign in with Google
    </SignIn>
  );
}
