import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "../validators/authValidator"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../api/axios"
import useAuthStore from "../store/authStore"
import { useEffect } from "react"

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const navigate = useNavigate()
  const setAuthData = useAuthStore((state) => state.setAuthData)
  const isAuthenticated = useAuthStore(
    (state) => !!state.user && !!state.accessToken
  )

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true })
  }, [isAuthenticated])

  const login = useMutation({
    mutationFn: (data) => axiosInstance.post("/api/auth/login", data),
    onSuccess: (response) => {
      const { user, accessToken } = response.data
      setAuthData(user, accessToken)
      navigate("/", { replace: true })
    },
  })

  const onSubmit = (data) => {
    login.mutate(data)
  }

  return (
    <div className="min-h-[calc(100dvh-75px)]">
      <div className="my-10">
        <p className="text-lg font-semibold text-center">
          Log in to access your account
        </p>
        <p className="text-lg font-semibold text-center">
          and continue talking with your friends.
        </p>
      </div>
      <div className="flex justify-center px-7 my-10">
        <div className="card card-xl bg-base-200 w-full max-w-sm rounded-2xl shadow-xl hover:shadow-2xl">
          <div className="card-body">
            <h2 className="card-title block text-center text-lg mb-2">
              Log in to DailyTalk
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-sm">
                <div>
                  <label htmlFor="userName">
                    Username
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <input
                    id="userName"
                    type="text"
                    className="input w-full rounded-lg my-3"
                    placeholder="Enter username"
                    {...register("userName")}
                    autoComplete="on"
                  />
                  {errors.userName && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="password">
                    Password
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="input w-full rounded-lg my-3"
                    placeholder="Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-lg my-3"
                  disabled={login.isPending}
                >
                  {login.isPending ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>

            {login.isError && (
              <p className="text-red-500 pb-3 dark:text-red-400 text-center text-sm">
                {login?.error?.response?.data?.message}
              </p>
            )}

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-red-500 dark:text-red-400">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login
