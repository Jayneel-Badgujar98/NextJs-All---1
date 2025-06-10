import React from 'react'
import Moreinfo from './Moreinfo'
import Link from 'next/link'
const page = ({ params }) => {
    return (
        <>
            <div>{params.slug}</div>
            <Moreinfo />
            <Link href="/home">Home</Link>
            <Link href={`/blog/${params.slug}/related`}>related page.js</Link>

        </>
    )
}

export default page