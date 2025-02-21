"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Signed in as {session.user.name} with {session.user.email}</p>
        <button onClick={() => signOut()}>logout</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={() => signIn("google")}>login with google</button>
    </div>
  );
}
