import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Layout from "./components/Layout"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./components/PrivateRoute"
import NotLogged from "./pages/NotLogged"

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="notlogged" element={<NotLogged />} />

            <Route element={<PrivateRoute />}>
              <Route index element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
export default App
