import { Navigate } from "react-router-dom";
// import { auth } from "../firebase/config"

export const ProtectedRoutes = ({ children }) => {
  //   const isAuth = auth.currentUser;
  const isAuth = false;
  return isAuth ? children : <Navigate to="/" />;
};
