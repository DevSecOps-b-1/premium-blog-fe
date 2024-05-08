import { Navigate } from "react-router-dom";
import { auth } from "../firebase/config"

export const ProtectedRoutes = ({ children }) => {
    const isAuth = auth.currentUser;
    return isAuth ? children : <Navigate to='/' />
}
