"use client"
import React from 'react'
import { notFound } from "next/navigation"
import { useState, useEffect } from 'react'

const page = ({ params }) => {

    const [data, setData] = useState(null)

    const { username } = params
    const fetchdata = async () => {
        try {
            const res = await fetch(`https://api.github.com/users/${username}`)
            if (!res.ok) {
                if (res.status === 404) {
                    notFound()
                } else if (res.status === 500) {
                    throw new Error("Server Error :- Something went wrong while loading this user.")
                }
                throw new Error("Something went wrong while loading this user.")
            }
            const data = await res.json()
            setData(data)
        } catch (error) {
            throw new Error("Something went wrong while loading this user.")
        }
    }

    useEffect(() => {
        fetchdata()
    }, [username])
    return (
        <div>
           
            <div>
                <div>GitHub username info: {username}</div>
                {data ? (
                    <div>Public repos: {data.public_repos}</div>
                ) : (
                    <div>Loading GitHub data...</div>
                )}
            </div>
            );

        </div>
    )
}


export default page