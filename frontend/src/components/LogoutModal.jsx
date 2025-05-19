import { useNavigate } from "react-router-dom"
import axiosInstance from "../api/axios"
import { useMutation } from "@tanstack/react-query"
import useAuthStore from "../store/authStore"

const LogoutModal = ({ onClose }) => {
  const clearAuthData = useAuthStore((state) => state.clearAuthData)
  const navigate = useNavigate()

  const { mutate: handleConfirmLogout, isPending } = useMutation({
    mutationFn: () => axiosInstance.post("/api/auth/logout"),
    onSuccess: () => {
      clearAuthData()
      onClose()
      setTimeout(() => {
        navigate("/login", { replace: true })
      }, 0)
    },
  })

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Confirm Logout</h3>
        <p className="py-4">Are you sure you want to logout?</p>
        <div className="modal-action">
          <button
            className="btn btn-outline"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </button>
          <button
            className="btn btn-error"
            onClick={handleConfirmLogout}
            disabled={isPending}
          >
            {isPending ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
      <div
        className="modal-backdrop"
        onClick={isPending ? undefined : onClose}
      ></div>
    </div>
  )
}
export default LogoutModal
