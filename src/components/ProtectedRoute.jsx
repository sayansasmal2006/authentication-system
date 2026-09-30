import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const localUser = localStorage.getItem("authUser");
  const sessionUser = sessionStorage.getItem("authUser");

  const isLoggedIn = localUser || sessionUser;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;