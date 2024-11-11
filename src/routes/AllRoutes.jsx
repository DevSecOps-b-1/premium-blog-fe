import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { CreateBlogPage } from "../pages/CreateBlogPage";
import { BlogPage } from "../pages/BlogPage/BlogPage";
import { AuthorsBlogPage } from "../pages/AuthorsBlogPage/AuthorsBlogPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Login } from "../pages/Auth/Login";
import { Register } from "../pages/Auth/Register";

export const AllRoutes = ({ isAuth, setIsAuth, userStatus }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage setIsAuth={setIsAuth} userStatus={userStatus} />}
      />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/register" element={<Register setIsAuth={setIsAuth} />} />
      <Route
        path="create-blog"
        element={
          <ProtectedRoutes>
            <CreateBlogPage />
          </ProtectedRoutes>
        }
      />
      <Route path="blog/:id" element={<BlogPage isAuth={isAuth} />} />
      <Route
        path="author/:id"
        element={
          <ProtectedRoutes>
            <AuthorsBlogPage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};
