import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getUser , getUserPosts , getPost , dbgetPosts , specificUser } from "../utils/datafetch.js";
import { userdbUpdate , dbPostDelete } from "../utils/dbUpload.js"

export const DataContext = createContext();

const DataProvider = ({children}) => {
    const [ userData , setuserData ] = useState(null)
    const [ isloading , setisloading ] = useState(true)
    const [userPosts , setuserPosts] = useState(null)
    const [post ,setpost] = useState(null);
    const [allposts,setallposts] = useState(null);
    const [viewUser, setviewUser] = useState(null);
    const [isViewingUser, setisViewingUser] = useState(false);
    const [viewingUserId, setviewingUserId] = useState(null);
    const [viewUserPosts, setviewUserPosts] = useState(null);

    async function fetchUser(){
        try{
            const result = await getUser()
            const posts = await getUserPosts(result.$id)
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

    async function fetchViewUser(userId){
        try{
            const result = await specificUser(userId)
            const posts = await getUserPosts(userId)
            setviewUser(result)
            setviewUserPosts(posts)
            setisViewingUser(true)
            setviewingUserId(userId)
        }catch(error){
            setviewUser(null)
            setisViewingUser(false)
            setviewingUserId(null)
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
            deletePost,
            viewUser,
            setviewUser,
            isViewingUser,
            setisViewingUser,
            viewingUserId,
            setviewingUserId,
            fetchViewUser,
            viewUserPosts,
            setviewUserPosts
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;