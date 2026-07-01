import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser , getUserPosts , getPost , dbgetPosts } from "../utils/datafetch.js";
import { userdbUpdate , dbPostDelete } from "../utils/dbUpload.js"

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [ userData , setuserData ] = useState(null)
    const [ isloading , setisloading ] = useState(true)
    const [userPosts , setuserPosts] = useState(null)
    const [post ,setpost] = useState(null);
    const [allposts,setallposts] = useState(null);

    async function fetchUser(){
        try{
            const result = await getUser()
            const posts = await getUserPosts()
            setuserData(result)
            setuserPosts(posts)
        }catch(error){
            setuserData(null)
        }finally{
            setisloading(false);
        }
    }

    async function updateUser(data){
        try{
            await userdbUpdate(data)
            await fetchUser()
        }catch(error){
            toast.error(error.message)
        }
        
    }

    async function fetchpost(postId){
        try{
            const result = await getPost(postId)
            setpost(result)
        }catch(error){
            setpost(null)
        }
    }

    async function fetchallposts(){
        try{
            const result = await dbgetPosts()
            setallposts(result)
        }catch(error){
            setallposts(null)
        }

    }

    async function deletePost(postId){
        try{
            await dbPostDelete(postId)
            await fetchUser()
        }catch(error){
            toast.error(error.message)
        }
    }

    useEffect(() => {
        fetchUser()
    },[])

    return (
        <DataContext.Provider value={{
            userData,
            isloading,
            setisloading,
            fetchUser,
            updateUser,
            userPosts,
            fetchpost,
            post,
            allposts,
            fetchallposts,
            deletePost
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;