import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AddShowHabits from "./pages/AddShowHabits";
import Layout from "./Layout/Layout";
import StreakDetails from "./pages/StreakDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <AddShowHabits /> },
        { path: "/habit/streakLogs/:id", element: <StreakDetails /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
