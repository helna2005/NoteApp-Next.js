"use client"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import toast from "react-hot-toast"


export default function Login() {
    const [userDetails, setUserDetails] = useState({
        email: "", password: ""
    })

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const {  email, password } = userDetails
        if ( !email || !password) {
            toast.error("Please fill the form completly")
        } else {
            const res = await signIn('credentials',{
                email,password,redirect:false
            })
            console.log(res);
            if (res?.ok) {
                toast.success("Login successfull")
                setTimeout(() => {
                   window.location.href="/notes"
                }, 2000)
            } else {
                toast.error("Invalied credentials")
            }
            setUserDetails({  email: "", password: "" })
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-green-500 p-5 rounded w-100">
                <h1 className="text-2xl font-bold text-white">Note Hub</h1>
                <p className="text-white">Note Everything You Need to remember!!</p>
                <h3 className="text-white font-bold">Login...</h3>
                <form>
                    <div className="mt-5 mb-3 w-full">
                        <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder="Email" className="rounded bg-gray-100 p-3 w-full" />
                    </div>
                    <div className="mb-3 w-full">
                        <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder="Password" className="rounded bg-gray-100 p-3 w-full" />
                    </div>
                </form>
                <div className="md-3 flex text-white items-center">
                    <button onClick={handleLogin} type="submit" className="bg-green-600 rounded px-3 py-2 text-white">Login</button>
                    <span className="ms-5 text-sm">New User? Click <Link href={'/register'} className=" underline text-blue-800">Register</Link></span>
                </div>
            </div>
        </div>
    )
}