import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddShowHabits from "./pages/AddShowHabits";
import Layout from "./Layout/Layout";
import StreakDetails from "./pages/StreakDetails";
import Home from "./pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/habit", element: <AddShowHabits /> },
        { path: "/habit/streakLogs/:id", element: <StreakDetails /> },
        { path: "/", element: <Home /> }

      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
