import { lazy } from "react";
import { AppLayout } from "layouts";
import { Loadable, PrivateRoute } from "components";
import { Navigate, Routes, Route } from "react-router-dom";

import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";

const NotFound = Loadable(lazy(() => import("screens/Authentication/Page404")));
const Dashboard = Loadable(lazy(() => import("screens/SuperAdminRole/Dashboard")));

export const navConfig = [
  {
    path: "/",
    element: <Navigate to="/app" replace />,
  },
  {
    path: "/",
    url: "/",
    title: "title",
    inSidebar: true,
    element: <AppLayout />,
    icon: <DashboardRoundedIcon fontSize="small" />,
    children: [
      { element: <Navigate to="/app" replace /> },
      {
        path: "/app",
        url: "/app",
        title: "app",
        element: <Dashboard />,
        inSidebar: false,
      },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "404",
        element: <NotFound />,
      },
      {
        path: "login",
        element: <Navigate to="/" />,
      },
      {
        path: "register",
        element: <Navigate to="/" />,
      },
      {
        path: "sign-up-otp",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
];

const Router = () => {
  return (
    <Routes>
      {navConfig.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          element={<PrivateRoute data={route} />}
        >
          {route.children &&
            route.children.map((child, c) => (
              <Route
                key={c}
                path={child.path}
                element={<PrivateRoute data={child} />}
              />
            ))}
        </Route>
      ))}
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default Router;
