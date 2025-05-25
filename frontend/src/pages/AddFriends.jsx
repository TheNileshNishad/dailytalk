import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../api/axios"

const AddFriends = () => {
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => axiosInstance.get("/api/users/search"),
    select: (res) => res.data.users,
  })

  if (isPending) return <p>Pending...</p>

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-4 justify-items-center">
      {users.map((user) => (
        <div key={user._id} className="card w-100 bg-base-300 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                {user?.avatar ? (
                  <img
                    src={user?.avatar?.secure_url}
                    alt={`${user.name}'s avatar`}
                  />
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <span className="text-xl">
                      {user ? user.name.charAt(0).toUpperCase() : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <h2 className="card-title mt-4">{user.name}</h2>
            <p className="text-sm text-gray-500">
              @{user.userName}
              {user.gender &&
                user.gender !== "prefer not to say" &&
                ` ⚥${user.gender}`}
            </p>
            <p className="mt-2">{user?.bio}</p>
            <div className="card-actions mt-4">
              <button className="btn btn-primary">Send Request</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AddFriends
