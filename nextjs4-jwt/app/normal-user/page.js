// filepath: app/normal-user/page.js
import React from 'react'
import {useRouter} from 'next/navigation'
const Page = () => {
    const router = useRouter()
  return (
    <div>
        <div>Normal User Page</div>
        <button onClick = {() => {router.push('/login')}}>Go to login</button>
    </div>
  )
}

export default Page