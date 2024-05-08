import { Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/HomePage"
import { CreateBlogPage } from "../pages/CreateBlogPage"
import { BlogPage } from "../pages/BlogPage"
import { AuthorsBlogPage } from "../pages/AuthorsBlogPage/AuthorsBlogPage"
import { ProtectedRoutes } from "./ProtectedRoutes"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="create-blog" element={<ProtectedRoutes><CreateBlogPage /></ProtectedRoutes>} />
            <Route path="blog/:id" element={<BlogPage />} />
            <Route path="author/:id" element={<ProtectedRoutes><AuthorsBlogPage /></ProtectedRoutes>} />
        </Routes>
    )
}
