import * as React from "react";
import Main from '../pages/Main/Main'
import Login from "../pages/Log-in/Login";
import Presence from "../pages/Presence/Presence"
import ProfilePage from "../pages/ProfilePage/ProfilePage";

import {
  createBrowserRouter,
} from "react-router-dom";
import Signup from "../pages/Sign-up/Sign-up";
import RequireAuth from '@auth-kit/react-router/RequireAuth';
import Calendar from "../pages/Calendar/Calendar";
import Analytics from "../pages/Analytics/Analytics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/presence",
    element: <RequireAuth fallbackPath={'/login'}> <Presence /> </RequireAuth>
  },
  {
    path: "/profile-page",
    element: <RequireAuth fallbackPath={'/login'}> <ProfilePage /> </RequireAuth>
  },
  {
    path: "/calendar",
    element: <RequireAuth fallbackPath={'/login'}> <Calendar /> </RequireAuth>
  },
  {
    path: "/analytics",
    element: <RequireAuth fallbackPath={'/login'}> <Analytics /> </RequireAuth>
  }
]);

export default router;