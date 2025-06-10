// filepath: app/admin/page.js
"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

// This function handles the logout process


const Page = () => {
  const router = useRouter()
  const handleLogout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (res.ok) {
      const deletedToken = await res.json()
      console.log(deletedToken.message)
      router.push("/login")
    }
    else {
      alert("Logout failed")
    }
  }
  return (
    <>
      <div>Admin Page</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Page