// filepath: app/not-authorized/page.js
"use client"
import React from 'react'
import {useRouter} from 'next/navigation'
const Page = () => {
    const router = useRouter()
  return (
    <div>
        <div>Not Authorized Page</div>
        <button onClick = {() => {router.push('/login')}}>Go to login</button>
    </div>
  )
}

export default Page