import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "../pages/AuthPages/Auth.jsx";
import Login from "../pages/AuthPages/Login.jsx";
import Signup from "../pages/AuthPages/Signup.jsx";

export default function AuthRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Auth />}>
               <Route index element={<Login />} />
               <Route path="login" element={<Login />} />
               <Route path="signup" element={<Signup />} />
               <Route path="*" element={<Navigate to="/login" replace />} />
            </Route>
        </Routes>
    );
}