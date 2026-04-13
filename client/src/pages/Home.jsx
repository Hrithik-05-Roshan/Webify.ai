import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react";
import LoginModel from '../components/LoginModel';
import { useDispatch, useSelector } from 'react-redux';
import { Coins } from "lucide-react";
import axios from 'axios';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [openLogin, setOpenLogin] = useState(false)
    const { userData } = useSelector(state => state.user)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, {
                withCredentials: true
            })
                dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (!userData) {
            return
        }
        const handleGetAllWebsites = async () => {

            try {
                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        handleGetAllWebsites()
    }, [userData])

    return (
        <div className='relative min-h-screen bg-[#040404] text-white overflow-hidden '>
            <motion.div
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className='fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10'
            >
                <div className='max-w-7xl mx-auto px-6 py-4 flex justify-between items-center'>
                    <div className='text-lg font-semibold'>
                        Webify.ai
                    </div>
                    <div className='flex items-center gap-6'>
                        <div className='hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer'
                            onClick={() => navigate("/pricing")}
                        >
                            Pricing
                        </div>

                        {userData && <div className='hidden md:flex items-center justify-between gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition'
                            onClick={() => navigate("/pricing")}
                        >
                            <Coins size={18} className='text-yellow-400' />
                            <span className='text-zinc-300'>Credits</span>
                            <span className=''>{userData.credits}</span>
                            <span className='font-bold text-lg'>+</span>
                        </div>}
                        {!userData ? <button className='px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm hover:cursor-pointer'
                            onClick={() => setOpenLogin(true)}
                        >
                            Get Started
                        </button> :
                            <div className='relative'>
                                <button className='flex items-center cursor-pointer' onClick={() => setOpenProfile(!openProfile)}>
                                    <img src={userData.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="/profileimage" referrerPolicy='no-referrer' className='w-10 h-10 rounded-full border border-white/20 object-cover' />
                                </button>
                                <AnimatePresence>
                                    {openProfile && (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                                className='absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden'
                                            >
                                                <div className='px-4 py-3 border-b border-white/10'>
                                                    <p className='text-sm font-medium truncate'>{userData.name} </p>
                                                    <p className='text-xs text-zinc-500 truncate'>{userData.email} </p>
                                                </div>
                                                <button
                                                    onClick={() => navigate("/pricing")}
                                                    className='md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
                                                    <Coins size={18} className='text-yellow-400' />
                                                    <span className='text-zinc-300'>Credits</span>
                                                    <span className=''>{userData.credits}</span>
                                                    <span className='font-bold text-lg'>+</span>
                                                </button>
                                                <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5 cursor-pointer' onClick={() => navigate("/dashboard")}>Dashboard</button>
                                                <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5 cursor-pointer' onClick={handleLogout}>Logout</button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>

                            </div>
                        }

                    </div>
                </div>
            </motion.div>

            <section className='pt-44 pb-32 px-6 text-center'>
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className='text-5xl md:text-7xl font-bold tracking-tight'
                >
                    Build Stunning <br /> Websites <span className='bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent'>with AI</span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className='mt-8 max-w-3xl mx-auto text-zinc-400 text-lg'
                >
                    Describe your idea and let AI generate a modern, responsive, production-ready Websites.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    transition={{ duration: 2 }}
                    className='px-10 py-4 rounded-xl bg-white text-black text-lg font-semibold hover:scale-105 transition mt-12 hover:cursor-pointer'
                    // onClick={() => navigate("/dashboard")}
                    onClick={() => setOpenLogin(true)}
                >
                    {userData ? "Go to Dashboard" : "Get Started"}
                </motion.button>
            </section>


            {!userData && (
                <section className='max-w-7xl mx-auto px-6 pb-32'>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {highlights.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ y: 40, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className='rounded-2xl bg-white/5 border border-white/10 p-8 '
                            >
                                <h1 className='text-xl font-semibold mb-3'>{h}</h1>
                                <p className='text-sm text-zinc-400'>
                                    Webify.AI builds real Websites - clean code, animations, responsiveness & scalable structure.
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}


            {userData && websites?.length > 0 && (
                <section className='max-w-7xl mx-auto px-6 pb-32'>
                    <h3 className='text-2xl font-semibold mb-6'>Your Websites</h3>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {websites.slice(0, 3).map((w, i) => (
                            <motion.div
                                key={w._id}
                                whileHover={{ y: -6 }}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className='cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden'
                            >
                                <div className='h-40 bg-black'>
                                    <iframe
                                        srcDoc={w.latestCode}
                                        className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none: bg-white '
                                    />
                                </div>
                                <div className='p-4 gap-4 flex-col flex'>
                                    <h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
                                    <p className='text-xs text-zinc-400'>Last Updated {""}{new Date(w.updateAt).toLocaleDateString()} </p>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </section>

            )}


            <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} Webify.ai
            </footer>

            {openLogin && <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />}

        </div>
    )
}

export default Home