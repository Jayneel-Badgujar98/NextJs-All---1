// // app/users/page.js
// getServerSideProps is not supported by next js app router
// import React from 'react'

// export const getServerSideProps = async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users')
//         .then(res => res.json())
//         .then(data => setUsers(data));

//     return {
//         props: {
//             users
//         }
//     }
// }
// const page = (props) => {
//     return (
//         <div>
//             {
//                 props.users.map(user => {
//                     return (
//                         <Link key={user.id} href={`/usersn?id=${user.id}`}>
//                             <div >
//                                 <h1>{user.name}</h1>
//                                 <p>{user.email}</p>
//                             </div>
//                         </Link>
//                     )
//                 })
//             }
//         </div>
//     )
// }

// export default page

"use client";
import React from 'react'

const page = () => {
    console.log('page')
    return (
        <div></div>
    )
}

export default page