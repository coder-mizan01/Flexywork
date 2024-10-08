
import {createBrowserRouter, RouteObject} from "react-router-dom";
import Root from "../Root";

//pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/auth/Dashboard"
import ActivateUser from "../pages/auth/ActivateUser"
import PostJob from "../pages/Jobs/PostJob"

const routes : RouteObject[] = [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path : "/dashboard",
          element : <Dashboard />
        },
        {
          path : "user/activate/:token",
          element : <ActivateUser />
        },
        {
          path : "/post-job",
          element : <PostJob />
        }
        
      ],
    },
  ];

 export const router = createBrowserRouter(routes); 