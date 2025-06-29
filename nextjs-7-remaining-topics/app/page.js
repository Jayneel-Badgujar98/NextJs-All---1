// import Image from "next/image";
// import SSGPage from "./ssg-page/page";
// import SSRPage from "./ssr-page/page";
// import ISRPage from "./isr-page/page";
// import StreamingPage from "./streaming-page/page";


// export default function Home() {
//   return (
//     <div>

//       {/* <SSGPage /> */}
//       {/* <SSRPage /> */}
//       <ISRPage />


//     </div>
//   );
// }
// import SSGPage from "./ssg-page/page";
// import SSRPage from "./ssr-page/page";
// import ISRPage from "./isr-page/page";
// import StreamingClient from "./streaming-page/page"; // NOTE: Client-side component

// export default function HomePage() {
//   return (
//     <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
//       <h1>Main Page: Rendering Different Modes</h1>

//       <section style={{ border: '1px solid #ccc', marginBottom: '2rem', padding: '1rem' }}>
//         <SSRPage />
//       </section>

//       <section style={{ border: '1px solid #ccc', marginBottom: '2rem', padding: '1rem' }}>
//         <SSGPage />
//       </section>

//       <section style={{ border: '1px solid #ccc', marginBottom: '2rem', padding: '1rem' }}>
//         <ISRPage />
//       </section>

//       <section style={{ border: '1px solid #ccc', marginBottom: '2rem', padding: '1rem' }}>
//         <StreamingClient />
//       </section>
//     </main>
//   );
// }
// "use client"

// import Link from 'next/link';
// import React, { useEffect } from 'react'
// import { useState } from "react";


// const Page = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     async function fetchUsers() {
//       const res = await fetch('https://jsonplaceholder.typicode.com/users')
//         .then(res => res.json())
//         .then(data => setUsers(data));
//     }
//     fetchUsers()
//   }, [])

//   return (
//     <div>
//       {users.map(user => {
//         return (
//           <Link key={user.id} href={`/usersn?id=${user.id}`}>
//             <div >
//               <h1>{user.name}</h1>
//               <p>{user.email}</p>
//             </div>
//           </Link>
//         )
//       })}
//     </div>
//   )
// }

// export default Page

import React from 'react'
import ImageCompo from "./Image-Optimization"
const Page = () => {
  return (
    <div>
        <ImageCompo />
    </div>
  )
}

export default Page