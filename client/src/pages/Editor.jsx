import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../App'

function Editor() {
    const {id} = useParams() 
    useEffect(()=>{
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`,{withCredentials:true})
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        handleGetWebsite()
    },[])
  return (
    <div>
        
    </div>
  )
}

export default Editor