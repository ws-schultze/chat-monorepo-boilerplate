import React from "react";
import { CreateUsername } from "./create-username";
import { auth } from "@/authentication/auth";

type Props = {};

export default async function CreateUsernamePage({}: Props) {
  const session = await auth();
  return <CreateUsername session={session} />;
}
