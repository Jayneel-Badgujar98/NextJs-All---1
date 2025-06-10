// "use client";
// import { useState } from "react";
// export default function Home() {

//   const [data, setData] = useState("");
//   const handlePost = async () => {

//     const response = await fetch("http://localhost:3000/api/hello", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/text"
//       },

//       body: JSON.stringify({ name: "Jay" })
//     })
//     const data = await response.text();
//     setData("Added data: " + data);

//   }
//   const handlePut = async () => {

//     const response = await fetch("http://localhost:3000/api/hello", {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },

//       body: JSON.stringify({ name: "Jay" })
//     })
//     const data = await response.json();
//     setData("Updated data: " + data.newName);
//   }
//   const handleDelete = async () => {


//     const response = await fetch("http://localhost:3000/api/hello", {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ name: "Jay" }), 
//     })
//     const data = await response.json();
//     setData("Deleted data: " + data.deletedName);

//   }
//   const handleGet = async () => {

//     const response = await fetch("http://localhost:3000/api/hello", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/text"
//       },

//     })
//     const data = await response.text();
//     setData("Fetched data: " + data);

//   }
//   return (
//     <div>
//       <button onClick={handleGet}>Get Response</button>
//       <br />
//       <button onClick={handlePost}>POST response</button>
//       <br />
//       <button onClick={handlePut}>PUT response</button>
//       <br />
//       <button onClick={handleDelete}>Delete response</button>
//       <br />
//       <br />
//       <div>{`Message :- ${data}`}</div>
//     </div>
//   );
// }

import React from 'react'

const page = async() => {
  const response = await fetch("http://localhost:3000/api/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ username: "    ", email: "" })
  })
  const data = await response.json();
  return (
    <div>
      <div>{`Message :- ${data.message}`}</div>
    </div>
  )
}

export default page