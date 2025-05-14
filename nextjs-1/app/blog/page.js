import React from 'react'
import Link from 'next/link'
const page = ({params}) => {
  return (
    <div>blog/page
        <br />
        <Link href={`/blog/${params.slug}/related`}>related page.js</Link>
    </div>
  )
}

export default page