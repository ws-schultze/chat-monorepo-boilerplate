import Image from "next/image";

import { Session } from "next-auth";
import { SignOutBtn } from "../../components/server/buttons/sign-out-btn";

import { redirect } from "next/navigation";

type Props = {
  session: Session | null;
};

export default function SessionData({ session }: Props) {
  if (!session) {
    redirect("/sign-in");
  }

  // Session is authenticated and username has been made already
  if (session.user) {
    return (
      <div className="flex flex-col gap-3">
        <p className="rounded-md bg-gray-700 p-3 flex justify-center">
          Session data
        </p>
        <p className="rounded-md bg-gray-900 py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </p>

        <div className="rounded-md bg-gray-700 p-5 flex gap-5 items-center w-fit ">
          <p>{session.user.name}</p>
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="user image"
              width={64}
              height={64}
              priority
            />
          ) : null}
        </div>
        <SignOutBtn />
      </div>
    );
  }
}
