"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
const Page = () => {

    const router = useRouter()
    return (
        <div>
            <h1>Upgrade</h1>
            <p>Upgrade your plan to access more features.</p>
            <button onClick={() => {
                document.cookie = "isPremium=true; path=/ ; max-age=3600"
                router.push("/premium")
            }} className="bg-blue-500 text-white px-4 py-2 rounded">Upgrade Now</button>
        </div>
    )
}

export default Page