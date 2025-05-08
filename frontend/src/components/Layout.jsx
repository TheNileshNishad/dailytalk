import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

const Layout = () => {
  return (
    <>
      <Sidebar />
      <div className="p-4 sm:ml-64 h-[100dvh]">
        <div className="p-4 border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-500">
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default Layout
