import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Layout from "./components/Layout"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Register from "./pages/Register"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chat />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
