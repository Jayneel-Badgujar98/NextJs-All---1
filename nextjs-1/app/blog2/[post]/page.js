"use client"
// This is the page.js file in the blog/[post] directory
import React from 'react'
import { notFound, useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
const Blogpost = {
    react: "React Blog",
    next: "Next Blog",
}



const page = ({ params }) => {

    const [haserror, setError] = useState(false);
    const [Data, setData] = useState(null);
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(true); // Set to true for testing

    useEffect(() => {
        setTimeout(() => {
            try {
                if (!authenticated) {
                    router.replace("/login")
                    return;
                }

                const post = params?.post;
                if (!Blogpost[post]) {
                    notFound()

                }
                setData(Blogpost[post])
            } catch (error) {
                setError(error.message)
            }
            if (haserror) throw new Error("Error fetching data")
            }, 2000);
    }, )
    return haserror ? <div>{haserror}</div> : <div>{Data}</div>
}

export default page