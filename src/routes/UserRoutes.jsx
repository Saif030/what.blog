import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../pages/UserPages/Layout.jsx"
import Home from "../pages/UserPages/Home.jsx"
import AddBlog from "../pages/UserPages/AddBlog.jsx";
import Profile from "../pages/UserPages/Profile.jsx";
import Post from "../pages/UserPages/Post.jsx";

export default function UserRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="post" element={<AddBlog />} />
                <Route path="profile" element={<Profile />} />
                <Route path="mypost/:id" element={<Post />} />
                <Route path="*" element={<Navigate to="/home" replace />} />
            </Route>
        </Routes>
    );
}