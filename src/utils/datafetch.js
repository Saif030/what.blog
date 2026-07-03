import { toast } from "react-hot-toast";
import { account, db , DATABASE_ID , TABLE_ID } from "../lib/appwrite.js"
import { Query } from "appwrite";

const getUser = async () => {
    try{
        const user = await account.get()
        if(!user){
            toast.error("user not found")
            return
        }
        const result = await db.getRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: user?.$id,
        });

        return result
    }catch(error){
        toast.warn("login required")
    }
}

const getUserPosts = async (userId) => {
    try{
        const result = await db.listRows({
            databaseId: DATABASE_ID,
            tableId: "posts",
            queries: [Query.equal("userId", userId)]
        });

        return result
    }catch(error){
        console.log("login required")
    }
}

const specificUser = async (userId) => {
    try{
        const result = await db.getRow({
            databaseId: DATABASE_ID,
            tableId: "users",
            rowId: userId
        });

        return result
    }catch(error){
        toast.error("specific user not found")
    }

}

const getPost = async (postId) => {
    try{
        const result = await db.getRow({
            databaseId: DATABASE_ID,
            tableId: "posts",
            rowId: postId
        });
        return result
    }catch(error){
        toast.error("post not found")
    }

}

const dbgetPosts = async () => {
    try{
        const postres = await db.listRows({
            databaseId: DATABASE_ID,
            tableId: "posts",
        });
        return postres
    }catch(error){
        toast.error("unable to fetch posts")
    }
}

export { getUser , getUserPosts , getPost ,specificUser , dbgetPosts }