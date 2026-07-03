import { toast } from "react-hot-toast";
import { account , db , DATABASE_ID , TABLE_ID } from "../lib/appwrite.js"
import { ID } from "appwrite";

const signup = async (username, email, password) => {
    try {
        const result = await account.create({
            userId: ID.unique(),
            email,
            password,
            name: username,
        });

        toast.success("Account created successfully!");

        return result;
    } catch (error) {
        toast.error(error.message);
    }
};

const login = async (email,password) => {
    try{
        const result = await account.createEmailPasswordSession({
            email,
            password
        });

        return result

    }catch(error){
        toast.error(error.message);

    }
}

const logout = async (sessionId) => {
    try {
        await account.deleteSession({
            sessionId
        });
        toast.success("Logout successful");
    } catch (error) {
        toast.error(error.message);
    }
};

const dbUserAdd = async (username,email,userAuthId) => {
    try{
        const dbres = await db.createRow({
            databaseId: DATABASE_ID,
            tableId: TABLE_ID,
            rowId: userAuthId,
            data: {
                username,
                email
            },
        });
        return dbres
    }catch(error){
        toast.error(error.message)
    }
}

export { signup , login , logout , dbUserAdd }