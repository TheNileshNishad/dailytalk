import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import provideAuth from "../api/provideAuth"

const Layout = () => {
  const { isReady } = provideAuth()
  if (!isReady) return <p>Checking authentication...</p>
  return (
    <>
      <Sidebar />
      <div className="sm:ml-64">
        <div className="p-4 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-500">
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default Layout
