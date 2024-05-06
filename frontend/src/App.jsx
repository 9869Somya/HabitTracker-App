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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/habits", element: <AddShowHabits /> },
        { path: "/habits/habit/streakLogs/:id", element: <StreakDetails /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
