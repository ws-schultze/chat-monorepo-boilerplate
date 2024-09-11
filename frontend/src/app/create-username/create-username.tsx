"use client";

import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CreateUsernameData, CreateUsernameVariables } from "@/types/index";
import { userOperations } from "@/graphql/operations/users";
import { reloadSession } from "@/utils/reload-session";
import { Session, User } from "next-auth";
import { useRouter } from "next/navigation";

type Props = {
  session: Session | null;
};

export function CreateUsername({ session }: Props) {
  const [username, setUsername] = useState<string>("");

  const [createUsername, { data, loading, error }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);

  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery<{ users: User[] }>(userOperations.Queries.getUsers);

  const router = useRouter();

  if (!usersData) return "NO USERS FOUND";

  if (usersLoading) return "Loading...";

  if (usersError) return `Error! ${usersError.message}`;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  async function handleSubmit() {
    if (!username) return;

    try {
      const { data } = await createUsername({
        variables: {
          username,
        },
      });

      if (!data?.createUsername) {
        throw new Error();
      }

      if (data.createUsername.error) {
        const {
          createUsername: { error },
        } = data;

        toast.error(error);
        return;
      }

      toast.success("Username successfully created");
      router.push("/chat");
    } catch (error) {
      toast.error("There was an error");
      console.log("onSubmit error", error);
    }
  }

  if (session && session.user) {
    return (
      <div className="flex flex-col w-full gap-4 items-center ">
        <h1>Please create a username</h1>
        <input
          type="text"
          placeholder={`${session.user.email}`}
          value={username}
          onChange={(e) => handleChange(e)}
          className="p-2 rounded text-black"
        />
        <>
          <button
            type="button"
            onClick={handleSubmit}
          >
            Create
          </button>

          {usersData.users.map((user) => (
            <div key={user.id}>{JSON.stringify(user)}</div>
          ))}
        </>
      </div>
    );
  }

  throw new Error("session.user.email is undefined");
}
