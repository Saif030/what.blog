import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { account } from "../lib/appwrite.js"
import { login } from "../utils/auth.js"

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [ user , setuser ] = useState(null)
    const [ isloading , setisloading ] = useState(true)

    async function refreshUser(){
        try{
            const result = await account.get();
            setuser(result)
        }catch(error){
            setuser(null)
        }finally{
            setisloading(false);
        }
    }

    async function loginUser(email, password) {
        try{
            await login(email, password);
            toast.success("Login successful");
        }catch(error){
            toast.error(error.message);
        }
    }

    async function logoutUser() {
        try{
            await account.deleteSession('current');
            setuser(null);
            toast.success("Logout successful");
        }catch(error){
            toast.error(error.message);
        }
    }

    useEffect(() => {
        refreshUser()
    },[])

    return (
        <AuthContext.Provider value={{
            user,
            setuser,
            isloading,
            setisloading,
            refreshUser,
            loginUser,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;