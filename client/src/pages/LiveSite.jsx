import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'
import axios from 'axios'
import { useState } from 'react'

function LiveSite() {
    const { slug } = useParams()
    const [html, setHtml] = useState("")
    const [error, setError] = useState("")
    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-slug/${slug}`, { withCredentials: true })
                setHtml(result.data.latestCode)

            } catch (error) {
                console.log(error)
                setError("Site not found")
            }
        }
        handleGetWebsite()
    }, [slug])

    if(error){
        return (
        <div className='h-screen flex items-center justify-center bg-black text-white'> 
            {error}
        </div>
    )}

    

    return (
        <iframe title='Live Site' srcDoc={html} className='h-screen w-screen border-none' sandbox='allow-same-origin allow-scripts allow-forms'/>
    )
}

export default LiveSite