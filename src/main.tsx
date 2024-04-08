import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider"

import Root from "@/routes/Root"
import Login from "@/routes/Login"
import Register from "@/routes/Register"
import Databases from "@/routes/Databases"
import NewDatabase from "@/routes/NewDatabase"
import Database from "@/routes/Database"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    path: "/databases",
    element: <Databases />,
  },
  {
    path: "/databases/new",
    element: <NewDatabase />,
  },
  {
    path: "/databases/:name",
    element: <Database />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
)
