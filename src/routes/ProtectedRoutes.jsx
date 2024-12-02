import { Navigate } from "react-router-dom";

export const ProtectedRoutes = ({ children, userStatus }) => {
  const isAuthor = userStatus.is_author;
  return isAuthor ? children : <Navigate to="/" />;
};
