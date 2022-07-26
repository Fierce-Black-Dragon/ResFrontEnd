import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";

const RequireRole = () => {
  const token = useSelector(selectCurrentToken);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return token && user?.role === "Admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default RequireRole;
