import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddShowHabits from "./pages/AddShowHabits";
import Layout from "./Layout/Layout";
import StreakDetails from "./pages/StreakDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./Layout/ProtectedRoute";
import axios from "axios";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            { path: "/habits", element: <AddShowHabits /> },
            {
              path: "/habits/habit/streakLogs/:id",
              element: <StreakDetails />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
