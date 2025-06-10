// "use client";

// export default function CreateUserPage() {
// const createUser = async () => {
//   const response = await fetch("/api/create-user", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ name: "Jay", email: "jay@example.com" }),
//   });

//   const data = await response.json();
//   console.log(data);
// };

//   const createUser = async() => {
//     const response = await fetch("/api/create-user", {
//       method : "POST",
//       headers : {
//         "Content-type": "application/json",
//       },
//       body : JSON.stringify({name : "Jay", email : "jay@example.com", hobbies : ["cricket", "football"]}),
//     })
//     const data = await response.json();
//     console.log(data);
//   }
//   return (
//     <div>
//       <button onClick={createUser} style={{padding:"10px", backgroundColor:"blue", color:"white"}}>
//         Create User
//       </button>
//     </div>
//   );
// }
// This is a client component that allows you to create a user by sending a POST request to the API endpoint.
// The button triggers the createUser function, which sends the request with the user's name and email.

"use client"
import { useState, useEffect } from 'react'
import React from 'react'

const Page = () => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    hobbies: ""
  })
  const [userId, setUserId] = useState(null)
  const [update, setUpdate] = useState(false)
  const userPayload = {
    name: form.name,
    email: form.email,
    hobbies: form.hobbies.split(",").map((hobby) => hobby.trim()),
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await getUsers()
      setLoading(false)
    }
    fetchUsers()
  }, [])

  const handle = async (e) => {
    e.preventDefault()
    if (userId) {
      const response = await fetch("/api/update-user", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: userId,
          ...userPayload
        })
      })
      const data = await response.json()
      console.log(data)
    } else {

      const response = await fetch("/api/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          hobbies: form.hobbies.split(",").map((hobby) => { return hobby.trim() })
        })
      })
      const data = await response.json()
      console.log(data)
      console.log(response)
    }
    setForm({
      name: "",
      email: "",
      hobbies: ""
    })
    setUpdate(false)
    setUserId(null)
    getUsers()
  }
  const getUsers = async () => {
    const lekaraa = await fetch("/api/get-users",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
    const data = await lekaraa.json()
    setUsers(data)

  }
  const handleDelete = async (id) => {
    const response = await fetch("/api/delete-user", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id })
    })
    const data = await response.json()
    console.log(data)
    getUsers()
  }

  const handleEdit = async (id) => {
    setForm({
      name: users.find((user) => user.id === id).name,
      email: users.find((user) => user.id === id).email,
      hobbies: users.find((user) => user.id === id).hobbies.join(",")
    })
    setUpdate(true)
    setUserId(id)
  }


  return (
    <div>
      <form onSubmit={handle}>
        <input type="text" name="name" value={form.name} placeholder="Enter the name" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
        <input type="email" name="email" value={form.email} placeholder="Enter the email" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
        <input type="text" name="hobbies" value={form.hobbies} placeholder="Enter the hobbies" onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })} />
        <button type="submit" style={{ padding: "10px", backgroundColor: "blue", color: "white" }}>{update ? "Update User" : "Create User"}</button>

      </form>
      <div>
        <h2>All users and their data </h2>{
          loading ? <h1>Loading...</h1> :
            users.map((user) => {
              return (
                <div key={user.id}>
                  <li>name : {user.name}</li>
                  <li>email : {user.email}</li>
                  <li>hobbies : {user.hobbies.join(",")}</li>
                  <button className="bg-red-600 text-black py-2 px-6 mb-7 rounded-3xl" onClick={() => handleDelete(user.id)}>Delete</button>
                  <button className="bg-blue-800 text-black py-2 px-6 mb-7 rounded-3xl" onClick={() => handleEdit(user.id)}>Edit</button>
                  <br />
                </div>
              )
            })
        }


      </div>
    </div>
  )
}

export default Page