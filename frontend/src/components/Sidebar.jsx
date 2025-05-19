import { Link, useNavigate } from "react-router-dom"
import useAuthStore from "../store/authStore"
import LogoutModal from "./LogoutModal"
import { useState } from "react"

const Sidebar = () => {
  const user = useAuthStore((state) => state?.user?.name)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const navigate = useNavigate()

  return (
    <>
      <aside className="fixed w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-base-300">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Chat</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-friends"
                className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Add Friends
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/requests"
                className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Pending Requests
                </span>
              </Link>
            </li>
          </ul>

          <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-dashed border-gray-300 dark:border-gray-500">
            <li>
              <Link
                to="/profile"
                className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to="/change-password"
                className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Change Password
                </span>
              </Link>
            </li>
            <li
              onClick={() => {
                if (user) setShowLogoutModal(true)
                else navigate("/notlogged")
              }}
              className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </li>
          </ul>

          {!user && (
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-dashed border-gray-300 dark:border-gray-500">
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">Login</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="flex items-center p-2 rounded-lg hover:bg-base-100 dark:hover:bg-gray-700"
                >
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Register
                  </span>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} />
      )}
    </>
  )
}
export default Sidebar
