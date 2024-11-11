import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const isAuthor = false;
  return isAuthor ? children : <Navigate to="/" />;
};
