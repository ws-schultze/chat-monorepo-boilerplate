import { ApolloProviderWrapper } from "@/context/apollo-provider-wrapper";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat | Woodland",
  description: "A chat app for you and all of your friends 😅",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} p-5 flex flex-col`}>
        <ApolloProviderWrapper>
          {children}
          <Toaster />
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
