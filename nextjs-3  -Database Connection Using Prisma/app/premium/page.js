"use client"
import React from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const router = useRouter()
    return (
        <div>
            <div>You are a premium user </div>
            <button onClick={() => {
                document.cookie = "isPremium=false; path=/; max-age=0"
                router.push("/upgrade")
            }} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>

        </div>
    )
}

export default Page