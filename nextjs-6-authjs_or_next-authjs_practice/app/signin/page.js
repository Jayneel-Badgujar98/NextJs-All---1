// "use client";
// import { signIn } from "next-auth/react";
// import { useState } from "react";

// export default function signin() {

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = async (e) => {

//         e.preventDefault();
//         const res = await signIn("credentials",
//             {
//                 email,
//                 password,
//                 redirect: false,
//                 callbackUrl: "/dashboard",
//             }
//         )
//         if (res?.error) {
//             alert(res.error);
//         }

//     }
//     return (
//         <div style={{ padding: 20 }}>
//             <h1>Sign In</h1>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     onChange={(e) => setEmail(e.target.value)}
//                 /><br />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     onChange={(e) => setPassword(e.target.value)}
//                 /><br />
//                 <button type="submit">Sign In</button>
//             </form>
//             <br />
//             <button onClick={() => signIn("github")}>Sign in with GitHub</button>
//             <br />
//             <button onClick={() => signIn("google")}>Sign in with Google</button>
//         </div>
//     )
// }
// path: app/signIn/page.js
"use client";
import { signIn, signOut, useSession } from "next-auth/react"

export default function AuthButton() {
  const { data: session } = useSession()

  return session ? (
    <>
      <p>Welcome, {session.user.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  ) : (
    <button onClick={() => signIn("github")}>Sign in with GitHub</button>
  )
}
