// filepath: app/login/page.js
"use client";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/set-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin username",
        role: "admin",
      }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Login failed");
    }
  };


  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
