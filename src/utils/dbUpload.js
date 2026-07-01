import { toast } from "react-toastify";
import { account , databases , db , DATABASE_ID , POST_TABLE_ID , TABLE_ID } from "../lib/appwrite.js"
import { ID } from "appwrite";
import { specificUser } from "./datafetch.js"

const dbPostUpload = async ({title,content,author,image}) => {
    try{
        const user = await account.get()
        const data = await specificUser(user?.$id)
        if(!data){
            toast.error("user not found please singup again")
            return
        }
        const postres = await db.createRow({
            databaseId: DATABASE_ID,
            tableId: "posts",
            rowId: ID.unique(),
            data: {
                title,
                "author_name":user?.name,
                "image_url":image,
                content,
                "userId":data?.$id,
                "author_image":data?.profile_pic
            },
        });
        toast.success("post created")
        return postres


    }catch(error){
        toast.error(error.message)
    }
}

const userdbUpdate = async (userdata) => {
    try{
        const user = await account.get()
        if(!user){
            toast.error("user not found please singup again")
            return
        }
        const result = await db.updateRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: user?.$id,
            data: {
                ...userdata
            }
        });
        toast.success("update sucessful")
        return result
    }catch(error){
        toast.error("unable to update data")
    }
}

const dbPostDelete = async (postId) => {
    try{
        const user = await account.get()
        if(!user){
            toast.error("user not found please singup again")
            return
        }
        const result = await db.deleteRow({
            databaseId: DATABASE_ID,
            tableId: "posts",
            rowId: postId,
        });
        toast.success("post deleted")
        return result
    }catch(error){
        console.log(error.message)
        toast.error("unable to delete post")
    }
}

export { dbPostUpload , userdbUpdate , dbPostDelete }