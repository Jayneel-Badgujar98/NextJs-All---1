'use client';
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>

      <button
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        onClick={() => signOut({ callbackUrl: "/login" })}
      >
        Logout
      </button>
    </div>
  );
}
