// path : app/dashboard/page.js
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { signOut } from "next-auth/react";
export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {session?.user?.name}</h1>
      <button onClick = {() => signOut()}>Logout</button>
    </div>
  );
}
