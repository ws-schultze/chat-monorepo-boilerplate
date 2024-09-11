import React from "react";
import SessionData from "./session-data";
import { auth } from "@/authentication/auth";
import { redirect } from "next/navigation";

type Props = {};

export default async function ChatPage({}: Props) {
  const session = await auth();

  console.log(session?.user);

  if (session && session.user.username) {
    return (
      <div>
        <SessionData session={session} />
      </div>
    );
  }

  if (session && !session.user.username) {
    redirect("/create-username");
  }

  if (!session) {
    redirect("/");
  }
}
