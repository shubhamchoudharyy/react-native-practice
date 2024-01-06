
import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

const PostContext=createContext()

const PostProvider=({children})=>{
    const [loading,setLoading]=useState(false)
    const [post,setPost]=useState([])

    const getPost=async()=>{
        setLoading(true)
        try{
            const{data}=await axios.get('/post/get-all-posts')
            setLoading(false)
            setPost(data?.posts)

        }
        catch(error){
            console.log(error)
            setLoading(false)
        }
    }
    useEffect(()=>{
        getPost();
    },[])

    return(
        <PostContext.Provider value={[post,setPost,getPost]}>
            {children}

        </PostContext.Provider>
    )
}





export  {PostContext,PostProvider};