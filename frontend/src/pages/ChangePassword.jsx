import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema } from "../validators/authValidator"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../api/axios"
import { useNavigate } from "react-router-dom"

const ChangePassword = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  })

  const navigate = useNavigate()

  const changePassword = useMutation({
    mutationFn: (data) => axiosInstance.post("/api/auth/change-password", data),
    onSuccess: (response) => {
      alert(response.data.message)
      navigate("/")
    },
  })

  const onSubmit = (data) => {
    changePassword.mutate(data)
  }

  return (
    <div className="min-h-[calc(100dvh-75px)]">
      <div className="my-10">
        <p className="text-lg font-semibold text-center">
          Saying goodbye to the old password
        </p>
        <p className="text-lg font-semibold text-center">
          And welcoming your new secure password
        </p>
      </div>
      <div className="flex justify-center px-7 my-10">
        <div className="card card-xl bg-base-200 w-full max-w-sm rounded-2xl shadow-xl hover:shadow-2xl">
          <div className="card-body">
            <h2 className="card-title block text-center text-lg mb-2">
              Change your password
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-sm">
                <div>
                  <label htmlFor="oldPassword">
                    Old Password
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <input
                    id="oldPassword"
                    type="password"
                    className="input w-full rounded-lg my-3"
                    placeholder="Current password"
                    {...register("oldPassword")}
                  />
                  {errors.oldPassword && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="newPassword">
                    New Password
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    className="input w-full rounded-lg my-3"
                    placeholder="New password"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-lg my-3"
                  disabled={changePassword.isPending}
                >
                  {changePassword.isPending ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>

            {changePassword.isError && (
              <p className="text-red-500 pb-3 dark:text-red-400 text-center text-sm">
                {changePassword?.error?.response?.data?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChangePassword
