import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "../validators/authValidator"
import { useMutation } from "@tanstack/react-query"
import axiosInstance from "../api/axios"
import useAuthStore from "../store/authStore"
import { useEffect } from "react"

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) })

  const navigate = useNavigate()
  const setAuthData = useAuthStore((state) => state.setAuthData)
  const isAuthenticated = useAuthStore(
    (state) => !!state.user && !!state.accessToken
  )

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true })
  }, [isAuthenticated])

  const registration = useMutation({
    mutationFn: (newUser) => axiosInstance.post("/api/auth/register", newUser),
    onSuccess: (response) => {
      const { user, accessToken } = response.data
      setAuthData(user, accessToken)
      navigate("/", { replace: true })
    },
  })

  const onSubmit = (data) => {
    registration.mutate(data)
  }

  return (
    <div className="min-h-[calc(100dvh-75px)]">
      <div className="my-10">
        <p className="text-lg font-semibold text-center">
          Create your DailyTalk account
        </p>
        <p className="text-lg font-semibold text-center">
          and stay connected with your friends.
        </p>
      </div>
      <div className="flex justify-center px-7 my-10">
        <div className="card card-xl bg-base-200 w-full max-w-sm rounded-2xl shadow-xl hover:shadow-2xl">
          <div className="card-body">
            <h2 className="card-title block text-center text-lg mb-2">
              Register to DailyTalk
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-sm">
                <div>
                  <label htmlFor="name">
                    Name
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input w-full rounded-lg my-3"
                    placeholder="Enter your name"
                    {...register("name")}
                    autoComplete="on"
                  />
                  {errors.name && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.name.message}
                    </p>
                  )}
                </div>

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
                  disabled={registration.isPending}
                >
                  {registration.isPending
                    ? "Creating account..."
                    : "Create account"}
                </button>
              </div>
            </form>

            {registration.isError && (
              <p className="text-red-500 pb-3 dark:text-red-400 text-center text-sm">
                {registration?.error?.response?.data?.message}
              </p>
            )}

            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-red-500 dark:text-red-400">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Register
