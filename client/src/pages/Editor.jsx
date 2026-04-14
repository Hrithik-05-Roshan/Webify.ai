import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import { CodeXml, MessageCircleMore, MessageSquare, Monitor, Rocket, SendHorizonal, Shrink, X } from 'lucide-react'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import Editor from '@monaco-editor/react';

function WebsiteEditor() {
    const { id } = useParams()
    const [website, setWebsite] = useState(null)
    const [error, setError] = useState("")
    const [code, setCode] = useState("")
    const [messages, setMessages] = useState([])
    const [prompt, setPrompt] = useState("")
    const iframeRef = useRef(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [thinkingIndex, setThinkingIndex] = useState(0)
    const [showCode, setShowCode] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const thinkingSteps = [
        "Understanding the request ...",
        "Planning layout changes...",
        "Improving responsiveness...",
        "Applying Animations...",
        "Finalizing Update..."
    ]

    const handleDeploy = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/website/deploy/${website._id}`,
                {}, { withCredentials: true })
            window.open(`${result.data.url}`, "_blank")
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async () => {
        if (!prompt) return
        setUpdateLoading(true)
        const text = prompt
        setPrompt("")
        setMessages((m) => [...m, { role: "user", content: prompt }])
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, { prompt: text }, { withCredentials: true })
            console.log(result)
            setUpdateLoading(false)
            setMessages((m) => [...m, { role: "ai", content: result.data.message }])
            setCode(result.data.code)
        } catch (error) {
            setUpdateLoading(false)
            console.log(error)
        }
    }

    useEffect(() => {
        if (!updateLoading) return
        const i = setInterval(() => {
            setThinkingIndex((i) => (i + 1) % thinkingSteps.length)
        }, 1200)

        return () => clearInterval(i)
    }, [updateLoading])


    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
                setWebsite(result.data)
                setCode(result.data.latestCode)
                setMessages(result.data.conversation)
            } catch (error) {
                console.log(error)
                setError(error.response?.data?.message || "Something went wrong")
            }
        }
        handleGetWebsite()
    }, [id])

    useEffect(() => {
        if (!iframeRef.current || !code) return;
        const blob = new Blob([code], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url
        return () => URL.revokeObjectURL(url)
    }, [code])

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
            <aside className='hidden lg:flex w-[380px] flex-col border-r-4 border-white/10 bg-black/80'>
                <Header />
                <>
                    <div className='flex-1 overflow-y-auto px-4 space-y-4'>
                        {messages.map((m, i) => (
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

                        {updateLoading &&
                            <div className='max-w-[85%] mr-auto'>
                                <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
                                    {thinkingSteps[thinkingIndex]}
                                </div>
                            </div>}

                    </div>
                    <div className='p-3 border-t border-white/10'>
                        <div className='flex gap-2 items-center justify-between'>
                            <input placeholder='Describe changes ...'
                                onChange={(e) => setPrompt(e.target.value)} value={prompt}
                                className='flex-1 resize-none rounded-2xl px-3 py-2 bg-white/5 border border-white/10 text-sm outline-none overflow-hidden' />
                            <button className='h-12 w-12 px-2 py-2 text-sm flex items-center justify-center font-semibold gap-2 rounded-full -rotate-30 bg-gradient-to-r from-indigo-500 to-purple-500 text-white/90 hover:scale-105 active:scale-95 transition-all cursor-pointer' disabled={updateLoading}
                                onClick={handleUpdate}
                            >
                                <SendHorizonal size={20} strokeWidth={2.3} className='translate-x-[1px]' />
                            </button>
                        </div>
                    </div>

                </>
            </aside>

            <div className='flex-1 flex flex-col'>
                <div className='h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80'>
                    <span className='text-xs text-zinc-400'>
                        Live Preview
                    </span>
                    <div className='flex gap-2'>
                        {website.deployed ? "" :
                            <button className='flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-105 transition cursor-pointer'
                                onClick={() => handleDeploy()}
                            >
                                <Rocket size={16} /> Deploy
                            </button>
                        }
                        <button className='p-2 cursor-pointer lg:hidden' onClick={() => setShowChat(true)}>
                            <MessageCircleMore size={18} />
                        </button>
                        <button className='p-2 cursor-pointer hover:border hover:border-white/10 hover:bg-white/10 hover:rounded-full ' onClick={() => setShowCode(true)}>
                            <CodeXml size={18} />
                        </button>
                        <button className='p-2 cursor-pointer hover:border hover:border-white/10 hover:bg-white/10 hover:rounded-full ' onClick={() => setShowPreview(true)}>
                            <Monitor size={18} />
                        </button>
                    </div>
                </div>
                <iframe ref={iframeRef} className='flex-1 w-full bg-white' sandbox='allow-same-origin allow-scripts allow-forms' />
            </div>



            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        className='fixed inset-0 z-[9999] bg-black flex flex-col'
                    >
                        <Header onClose={() => setShowChat(false)} />
                        <>
                            <div className='flex-1 overflow-y-auto px-4 space-y-4'>
                                {messages.map((m, i) => (
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

                                {updateLoading &&
                                    <div className='max-w-[85%] mr-auto'>
                                        <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>
                                            {thinkingSteps[thinkingIndex]}
                                        </div>
                                    </div>}

                            </div>
                            <div className='p-3 border-t border-white/10'>
                                <div className='flex gap-2 items-center justify-between'>
                                    <input placeholder='Describe changes ...'
                                        onChange={(e) => setPrompt(e.target.value)} value={prompt}
                                        className='flex-1 resize-none rounded-2xl px-3 py-2 bg-white/5 border border-white/10 text-sm outline-none overflow-hidden' />
                                    <button className='h-12 w-12 px-2 py-2 text-sm flex items-center justify-center font-semibold gap-2 rounded-full -rotate-30 bg-gradient-to-r from-indigo-500 to-purple-500 text-white/90 hover:scale-105 active:scale-95 transition-all cursor-pointer' disabled={updateLoading}
                                        onClick={handleUpdate}
                                    >
                                        <SendHorizonal size={20} strokeWidth={2.3} className='translate-x-[1px]' />
                                    </button>
                                </div>
                            </div>

                        </>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className='fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#1e1e1e] flex flex-col'
                    >
                        <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]'>
                            <span className='text-sm font-medium'>index.html</span>
                            <button className='cursor-pointer' onClick={() => setShowCode(false)}>
                                <X size={18} />
                            </button>
                        </div>
                        <Editor
                            theme='vs-dark'
                            value={code}
                            language='html'
                            onChange={(c) => setCode(c)}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showPreview && (
                    <motion.div
                        className='fixed inset-0 z-[9999] bg-black'
                    >
                        <iframe className='w-full h-full bg-white' srcDoc={code} sandbox='allow-same-origin allow-scripts allow-forms' />
                        <button className='absolute top-3.5 right-3.5 p-1.5 cursor-pointer hover:border border-white/10 hover:bg-white/10 rounded-lg ' onClick={() => setShowPreview(false)}><Shrink size={26} strokeWidth={1.3} /></button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )

    function Header({ onClose }) {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10 mb-5'>
                <span className='font-semibold truncate'>{website.title}</span>
                {onClose && (
                    <button className='cursor-pointer' onClick={onClose}> <X size={18} color='white' /> </button>
                )}
            </div>
        )
    }

}

export default WebsiteEditor
