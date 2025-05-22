import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import updateUserSchema from "../validators/userValidator"

const Profile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateUserSchema),
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className="min-h-[calc(100dvh-75px)]">
      <div className="my-10">
        <p className="text-lg font-semibold text-center">
          Show the world who you are ✨
        </p>
      </div>
      <div className="flex justify-center px-7 my-10">
        <div className="card card-xl bg-base-200 w-full max-w-sm rounded-2xl shadow-xl hover:shadow-2xl">
          <div className="card-body">
            <h2 className="card-title block text-center text-lg mb-2">
              Update your profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="text-sm">
                <div className="mt-3">
                  <label htmlFor="name">
                    Name
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="input w-full rounded-lg my-3"
                    autoComplete="on"
                    {...register("name")}
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
                    autoComplete="on"
                    {...register("userName")}
                  />
                  {errors.userName && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.userName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender">
                    Gender
                    <span className="text-red-500 dark:text-red-400"> *</span>
                  </label>
                  <select
                    id="gender"
                    className="select rounded-lg my-3"
                    {...register("gender")}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    type="text"
                    className="textarea  w-full rounded-lg my-3 "
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-red-500 pb-3 dark:text-red-400">
                      {errors.bio.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full rounded-lg my-3"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
