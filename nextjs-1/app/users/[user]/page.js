// /app/users/[username]/page.js
// /app/users/[username]/page.js

// does not show properly error and notfound and shows hello, notfound instead of showing 
// notfound page
// "use client";
// import { useEffect, useState } from "react";
// import { notFound } from "next/navigation";

// const Page = ({ params }) => {
//     const [data, setData] = useState("");
//     const { user } = params;

//     useEffect(() => {
//         const fetchData = async () => {
//             await new Promise(resolve => setTimeout(resolve, 1000)); // simulate fetch

//             if (user === "notfound") {
//                 notFound(); // 🚨 trigger not-found.js
//             }

//         };
//         setData(user); // ✅ set username

//         fetchData();
//     },[user]);

//     return data ? <h1>Hello, {data}</h1> : <p>Loading...</p>;
// };

// export default Page;

// shows properly error and notfound
// app/users/[user]/page.js
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { user } = params;

  // Simulate loading
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Trigger not-found.js
  if (user === "notfound") {
    notFound();
  }

  // Trigger error.js
  if (user === "error") {
    throw new Error("Something went wrong while loading this user.");
  }

  // Valid case
  return <h1>Hello, {user}</h1>;
}
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const Page = ({ params }) => {
//   const [data, setData] = useState("");
//   const router = useRouter();
//   const { user } = params;

//   useEffect(() => {
//     const fetchData = async () => {
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       if (user === "notfound") {
//         router.replace("/404"); // custom redirect (not ideal)
//         return;
//       }

//       if (user === "error") {
//         setData("❌ ERROR");
//         return;
//       }

//       setData(user);
//     };

//     fetchData();
//   }, [user]);

//   return data ? <h1>Hello, {data}</h1> : <p>Loading...</p>;
// };
// export default Page;