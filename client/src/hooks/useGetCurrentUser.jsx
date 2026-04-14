import React from 'react'
import { useEffect } from 'react'
import axios from "axios";
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData, setUserLoading } from '../redux/userSlice';

function useGetCurrentUser() {
    const dispatch = useDispatch()
    useEffect(() => {
        const getCurrentUser = async () => {
            dispatch(setUserLoading(true))
            try {
                const result = await axios.get(`${serverUrl}/api/user/me`,
                    { withCredentials: true }
                )
                dispatch(setUserData(result.data))
            } catch (error) {
                console.log(error)
            } finally {
                dispatch(setUserLoading(false))
            }
        }
        getCurrentUser()
    }, [])
}

export default useGetCurrentUser