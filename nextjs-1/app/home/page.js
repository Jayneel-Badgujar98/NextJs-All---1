import React from 'react'
import Link from 'next/link'
const page = () => {
    return (
        <div>
            <Link href="/blog/css">CSS Blog</Link>
            <br />
            <Link href="/blog/html">HTML Blog</Link>
            <br />
            <Link href="/blog/javascript">JavaScript Blog</Link>
            <br />
            <Link href="/blog/react">React Blog</Link>
            <br />
            <Link href="/blog/vue">Vue Blog</Link>
            <br />
            <Link href="/blog/angular">Angular Blog</Link>
        </div>
    )
}

export default page