import { AuthLayout } from "layouts";
import { Navigate, useRoutes } from "react-router-dom";

import Login from "screens/Authentication/Login";
import ResetPhone from "screens/Authentication/ResetPhone";
// import Register from '../screens/Register';
// import SignUpOTP from '../screens/SignUpOTP';
// import NotFound from '../screens/Page404';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "reset-phone", element: <ResetPhone /> },
        // { path: 'register', element: <Register /> },
        // { path: 'sign-up-otp', element: <SignUpOTP /> },
        // { path: '404', element: <NotFound /> },
        { path: "/", element: <Navigate to="/login" /> },
        { path: "*", element: <Navigate to="/login" /> },
      ],
    },
    { path: "*", element: <Navigate to="/login" replace /> },
  ]);
}
