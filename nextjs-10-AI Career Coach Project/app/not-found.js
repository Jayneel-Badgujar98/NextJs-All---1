// pages/404.js (or app/not-found.js for the /app directory)
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button' // Adjust path as needed

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen  bg-background">
     
      <div className="mt-8 text-4xl font-bold text-gray-700">404 - Page Not Found</div>
      <div className="text-lg text-gray-500 mt-2 mb-8">Sorry, the page you are looking for does not exist.</div>
      <Link href="/">
        <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">Back to Home</Button>
      </Link>
    </div>
  )
}
