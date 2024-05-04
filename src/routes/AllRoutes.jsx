import { Routes, Route } from "react-router-dom"
import { HomePage } from "../pages/HomePage/HomePage"
import { CreateBlogPage } from "../pages/CreateBlogPage/CreateBlogPage"
import { BlogPage } from "../pages/BlogPage"
import { AuthorsBlogPage } from "../pages/AuthorsBlogPage/AuthorsBlogPage"

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="create-blog" element={<CreateBlogPage />} />
            <Route path="blog/:id" element={<BlogPage />} />
            <Route path="author/:id" element={<AuthorsBlogPage />} />
        </Routes>
    )
}
