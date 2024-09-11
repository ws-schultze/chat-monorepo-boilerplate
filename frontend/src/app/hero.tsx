"use client";
import Link from "next/link";
import React, { useEffect } from "react";

type Props = {};

export function Hero({}: Props) {
  useEffect(() => {}, []);

  return (
    <>
      <header>Welcome to the chat</header>
      <div className="flex flex-col gap-5 bg-gray-800 p-10 rounded">
        <h1>Ready to get started?</h1>
        <Link
          href={"/sign-in"}
          className="rounded bg-green-600 p-3 flex justify-center"
        >
          Enter the chat
        </Link>
      </div>
    </>
  );
}
