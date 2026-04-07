import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'

function Editor() {
    const { id } = useParams()

    const [website, setWebsite] = useState(null)
    const [error, setError] = useState("")



    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
                setWebsite(result.data)
            } catch (error) {
                console.log(error.response.data.message)
                setError()
            }
        }
        handleGetWebsite()
    }, [id])

    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        )
    }

    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading...
            </div>
        )
    }




    return (
        <div className='h-screen w-screen flex bg-black text-white overflow-hidden'>
            <aside>
                <Header />
                <Chat />
            </aside>
        </div>
    )

    function Header() {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10 mb-5'>
                <span className='font-semibold truncate'>{website.title}</span>
            </div>
        )
    }

    function Chat() {
        return (
            <div className='flex-1 overflow-y-auto px-4 space-y-4'>
                {website.conversation.map((m, i) => (
                    <div
                        key={i}
                        className={`max-w-[85%] ${m.role === "user"
                                ? "ml-auto"
                                : "mr-auto"
                            }`}
                    >

                        <div
                            className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                ? "bg-white text-black"
                                : "bg-white/5 border border-white/10 text-zinc-200"
                                }`}
                        >
                            {m.content}

                        </div>

                    </div>
                ))}
            </div>
        )
    }
}

export default Editor