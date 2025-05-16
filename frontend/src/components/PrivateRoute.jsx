import useAuthStore from "../store/authStore"
import { Navigate, Outlet } from "react-router-dom"

const PrivateRoute = () => {
  const accessToken = useAuthStore((state) => state.accessToken)
  return accessToken ? <Outlet /> : <Navigate to="/notlogged" replace />
}

export default PrivateRoute
