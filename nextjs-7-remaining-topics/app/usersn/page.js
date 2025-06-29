"use client";
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

export default function Page(){

    // const {id} = useParams();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [user, setuser] = useState({})  ;
    useEffect(() => {
        const fetchUser = async() => {
            // await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            // .then(res => res.json())
            // .then(data => setuser(data));

            const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await res.json();
            setuser(data);
        }
        fetchUser();
    },[])
    return (
    <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
    </div>
  )
}