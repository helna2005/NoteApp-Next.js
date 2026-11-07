"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaClock, FaEdit, FaPlus, FaPowerOff, FaStickyNote, FaTrash, FaUser } from "react-icons/fa";

interface Note {
    _id: string;
    title: string;
    description: string;
    color: string;
    userMail: string;
    createAt: string
}
export default function Dashboard() {
    const { data: session, status } = useSession()
    //console.log(session,status);
    const [allNotes, setAllNotes] = useState<Note[]>([])
    console.log(allNotes);

    useEffect(() => {
        if (session?.user?.email) {
            fetchNotes()
        }
    }, [session])

    const fetchNotes = async () => {
        const res = await fetch(`/api/notes?email=${session?.user?.email}`)
        const serverResponse = await res.json()
        setAllNotes(serverResponse)
    }


    const deletenote=async(id:string)=>{
        const res=await fetch(`/api/notes/${id}`,{method:"DELETE"})
        toast.success("Note Removed successfully")
        fetchNotes()
    }

    if (status == "loading") {
        return <p className="text-center mt-10 text-2xl">Loading...</p>
    }
    if (status == "unauthenticated") {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Header */}
            <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">

                <div className="flex items-center gap-2">
                    <FaStickyNote className="text-sky-500 text-2xl" />
                    <h1 className="text-xl font-semibold text-sky-600">Note Hub</h1>
                </div>

                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2 text-gray-600">
                        <FaUser />
                        <span>{session?.user?.name}</span>
                    </div>

                    <button><FaPowerOff className="text-red-500 text-xl cursor-pointer" onClick={() => signOut()} /></button>
                </div>

            </nav>

            {/* Main Section */}
            <div className="bg-white px-6 py-8 my-5">

                <h2 className="text-4xl font-bold text-blue-600 mb-7">
                    My Notes
                </h2>

                <div className="flex flex-wrap gap-6">

                    {/* Note Card */}
                    {
                        allNotes.length > 0 &&
                        allNotes.map(note => (
                            <div key={note?._id} className={`w-52 h-52 bg-${note?.color}-300 rounded-lg p-5 shadow-sm`}>

                                <div className="flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-900">{note?.title}</h3>
                                    <Link href={`/notes/${note?._id}`}>
                                        <FaEdit className="cursor-pointer text-gray-800" />
                                    </Link>
                                </div>

                                <p className="text-sm text-gray-600 mt-4"> {note?.description}</p>

                                <div className="flex justify-between items-center mt-10">
                                    <span className="flex items-center gap-2 text-sm text-gray-500">
                                        <FaClock />
                                        {new Date(note?.createdAt).toLocaleDateString()}
                                    </span>

                                    <button onClick={()=>deletenote(note?._id)} >
                                        <FaTrash className="text-red-500 hover:text-red-700" />
                                    </button>
                                </div>

                            </div>
                        ))

                    }

                    {/* New Note Card  */}
                    <div className="w-52 h-52 border-2 border-dashed border-gray-400 rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-100">

                        <Link href={'/notes/add'}>
                            <FaPlus className="text-3xl text-black" />
                        </Link>

                        <h3 className="font-semibold text-gray-900">New Note</h3>

                    </div>

                </div>
            </div>

        </div>
    )
}