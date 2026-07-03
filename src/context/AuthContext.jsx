import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-hot-toast";
import { account } from "../lib/appwrite.js";
import { login } from "../utils/auth.js";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const result = await account.get();
            setUser(result);
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const loginUser = useCallback(async (email, password) => {
        try {
            const res = await login(email, password);
            if (res) {
                toast.success("Login successful");
                await refreshUser();
            }
        } catch (error) {
            toast.error(error.message);
            throw error; // Re-throw so callers can handle it too
        }
    }, [refreshUser]);

    const logoutUser = useCallback(async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            toast.success("Logout successful");
        } catch (error) {
            toast.error(error.message);
            throw error;
        }
    }, []);

    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    const value = {
        user,
        isLoading,
        loginUser,
        logoutUser,
        refreshUser,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;