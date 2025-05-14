// app/page.js
// 'use client'
// import { signIn } from 'next-auth/react'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const router = useRouter()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const res = await signIn('credentials', {
//       redirect: false,
//       email,
//       password
//     })

//     if (res.ok) router.push('/')
//     else alert('Invalid credentials')
//   }

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto' }}>
//       <h2>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type='email'
//           placeholder='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         /><br /><br />
//         <input
//           type='password'
//           placeholder='Password'
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         /><br /><br />
//         <button type='submit'>Login</button>
//       </form>
//     </div>
//   )
// }
import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
