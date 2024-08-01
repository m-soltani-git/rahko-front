import { useSelector } from "react-redux";
import { Stack, Typography } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ data }) {
  const { roles = [], element } = data;
  let location = useLocation();

  const loading = false;
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  if (loading) {
    return <p className="container">Checking auth..</p>;
  }

  const hasRequiredRole = (routeRoles = [], userRoles = []) => {
    if (routeRoles.length > 0) {
      return userRoles.filter((el) => routeRoles.includes(el.name)).length > 0;
    }
    return true;
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (isAuthenticated && !hasRequiredRole(roles, userInfo?.roles)) {
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h1" color="error">
          شما اجازه دسترسی به این صفحه ندارید!
        </Typography>
      </Stack>
    );
  }

  return element;
}
