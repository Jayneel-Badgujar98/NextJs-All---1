// path: app/dashboard/page.js
"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
            <h1>Welcome, {session?.user?.email}</h1>
        </div>
    );
}

// import { getServerSession } from "next-auth";
// import { authOptions } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

// export default async function DashboardPage() {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/login"); // user not logged in, redirect to login
//   }

//   return (
//     <div>
//       <h1>Welcome {session?.user?.name || "User"}!</h1>
//       <p>Email: {session?.user?.email}</p>
//     </div>
//   );
// }
// | Situation                                                                | Use `useSession()` (Client)   | Use `getServerSession()` (Server) |
// | ------------------------------------------------------------------------ | ----------------------------- | --------------------------------- |
// | You’re inside a **client component** like `Navbar`, `Button`, `Header`   | ✅ Yes                         | ❌ No                              |
// | You’re building a full **page like `/dashboard`** and want to protect it | ⚠️ Not ideal (causes flicker) | ✅ Yes (best practice)             |
// | You want to access session **securely on server** (to query DB)          | ❌ No                          | ✅ Yes                             |
// | You want to **redirect before page loads** if not logged in              | ❌ Not possible                | ✅ Yes                             |
// | Use in `app/` directory with Server Components                           | ❌ No                          | ✅ Yes                             |
// | SEO important page, want cleaner HTML                                    | ❌ No (hydration issues)       | ✅ Yes                             |
// | You just want to **show login/logout button** in header                  | ✅ Yes                         | ❌ No                              |
// | Want to fetch user's posts from DB using Prisma                          | ❌ No (not secure)             | ✅ Yes                             |
