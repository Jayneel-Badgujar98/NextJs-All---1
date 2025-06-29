'use client'
import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SigninPage() {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    console.log('loading set to true');
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/"
    })
    console.log('loading set to false');

    if (res?.error) {
      setError(res.error === "CredentialsSignin" ? "Invalid email or password" : res.error)
      setLoading(false)
    }
    if (res?.ok) {
      // wait a moment to show loading
      setTimeout(() => {
        router.push("/")
      }, 1000)
    }
  }


  return (
    <div className="min-h-screen bg-[#666666]/20 flex items-center justify-center">
      <div className="bg-black text-white p-10 rounded-xl space-y-6 shadow-2xl w-full max-w-lg ">
        <h1 className="text-4xl font-bold mb-6 text-center text-red-500">Sign In</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-3 rounded bg-gray-900 placeholder:text-gray-400"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 rounded bg-gray-900 placeholder:text-gray-400"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-400 text-white font-bold py-3 rounded"
          >
            Sign In
          </button>
        </form>
        {loading && <p className="text-green-500 text-lg text-center mt-2">Loading...</p>}
        {error && <p className="text-red-400 text-lg text-center mt-2">{error}</p>}

        <div className="mt-6 border-t border-gray-700 pt-6 flex flex-col gap-2">
          <div onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full rounded-full flex py-3 px-8 border border-gray-500 hover:border-gray-200 cursor-pointer">
            <div
              className="h-6 w-6 bg-no-repeat bg-center"
              style={{ backgroundImage: `url(https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg)` }}
            ></div>
            <div className='text-md text-center w-full whitespace-nowrap font-bold'>Continue with Google</div>
          </div>
          <div onClick={() => signIn("github", { callbackUrl: "/" })} className="w-full rounded-full flex py-3 px-8 border border-gray-500 hover:border-gray-200 cursor-pointer">
            <div
              className="h-6 w-6 bg-no-repeat bg-center invert-100"
              style={{ backgroundImage: `url(https://github.com/favicon.ico)` }}
            ></div>
            <div className='text-md text-center w-full whitespace-nowrap font-bold'>Continue with GitHub</div>
          </div>
        </div>

        <p className="text-center mt-4 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="underline text-white hover:text-red-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
