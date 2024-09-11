import Image from "next/image";
import GitHubLogo from "public/github-logos/github-mark-white.svg";
import { SignIn } from "./auth-btns";

export function GitHubSignInBtn() {
  return (
    <SignIn
      provider="github"
      height="h-5"
    >
      <Image
        src={GitHubLogo}
        alt="GitHub Logo"
        width={25}
      />
      Sign in with GitHub
    </SignIn>
  );
}
