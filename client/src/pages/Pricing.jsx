import { ArrowLeft, Check, Coins } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App'


const plans = [
    {
        key: "free",
        name: "Free",
        price: "₹0",
        credits: 100,
        description: "For beginners getting started",
        features: [
            "Basic generation",
            "Limited credits",
            "Community support"
        ],
        popular: false,
        button: "Get Started",
    },
    {
        key: "pro",
        name: "Pro",
        price: "₹499",
        credits: 500,
        description: "For serious creators & freelancers",
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit & regenerate",
            "Download source code",
        ],
        popular: true,
        button: "Upgrade to Pro",
    },
    {
        key: "enterprise",
        name: "Enterprise",
        price: "₹1499",
        credits: 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    }
];
function Pricing() {
    const navigate = useNavigate()

    const { userData } = useSelector(state => state.user)
    const [loadingPlan, setLoadingPlan] = useState(null)

    const handlePayment = async (planKey) => {
        if (!userData) {
            navigate("/")
            return
        }
        if (planKey === "free") {
            alert("You are already on the free plan!")
            navigate("/dashboard")
            return
        }
        const selectedPlan = plans.find(p => p.key === planKey)
        setLoadingPlan(planKey)
        try {
            const result = await axios.post
                (`${serverUrl}/api/payment/order`,
                    {
                        planId: planKey,
                        amount: parseInt(selectedPlan.price.replace("₹", "")), // or hardcode
                        credits: selectedPlan.credits
                    },
                    { withCredentials: true }
                )

            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: result.data.amount,
                currency: "INR",
                order_id: result.data.id,

                
            }

            const rzp = new window.Razorpay(options)
            rzp.open()

        } catch (error) {
            console.log(error)
            setLoadingPlan(false)
        }
    }







    return (
        <div className='relative min-h-screen overflow-hidden bg-[#050505] text-white px-6 pt-6 pb-24'>
            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-30 -left-30 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] ' />

                <div className='absolute -bottom-20 -right-20 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px] ' />
            </div>
            <button className='relative z-10 mb-8 flex justify-center items-center border border-white/30 rounded-xl px-3 py-1 gap-2 text-sm text-zinc-400 hover:text-white transition cursor-pointer'
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={16} /> Back
            </button>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-4xl mx-auto text-center mb-14"
            >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, transparent pricing</h1>
                <p className="text-zinc-400 text-lg">Buy credits once. Build anytime.</p>
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        whileHover={{ y: -14, scale: 1.03 }}
                        className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-all 
                            ${p.popular
                                ? "border-indigo-500 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/30"
                                : "border-white/10 bg-white/5 hover:border-indigo-400 hover:bg-white/10"
                            }`}
                    >
                        {p.popular && (
                            <span className="absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500">
                                Most Popular
                            </span>
                        )}

                        <h1 className="text-xl font-semibold mb-2">{p.name}</h1>
                        <p className="text-zinc-400 text-sm mb-6">{p.description}</p>

                        <div className="flex items-end gap-1 mb-4">
                            <span className="text-4xl font-bold">{p.price}</span>
                            <span className="text-sm text-zinc-400 mb-1">/one-time</span>
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                            <Coins size={18} className='text-yellow-400' />
                            <span className='font-semibold'>{p.credits} Credits</span>
                        </div>
                        <ul className="space-y-3 mb-10">
                            {p.features.map((f) => (
                                <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                                    <Check className="w-4 h-4 text-indigo-400" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            //onClick-disables
                            className={`w-full py-3 rounded-xl font-semibold cursor-pointer transition ${p.popular
                                ? "bg-indigo-500 hover:bg-indigo-600"
                                : "bg-white/10 hover:bg-white/20"
                                } disabled:opacity-60`}
                        >
                            //Loadingplan
                        </motion.button>

                    </motion.div>
                ))}
            </div>


        </div>
    )


}

export default Pricing