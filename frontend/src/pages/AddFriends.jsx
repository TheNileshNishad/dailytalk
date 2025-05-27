import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axiosInstance from "../api/axios"
import { useState } from "react"

const AddFriends = () => {
  const [activeUserId, setActiveUserId] = useState(null)
  const queryClient = useQueryClient()

  // get all non-friend users
  const { data: users, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => axiosInstance.get("/api/users/search"),
    select: (res) => res.data.users,
  })

  // send friend request
  const sendFriendRequest = useMutation({
    mutationFn: (userId) =>
      axiosInstance.post(`/api/friends/requests/${userId}`),
    onMutate: (userId) => setActiveUserId(userId),
    onSuccess: (response) => {
      alert(response.data.message)
      setActiveUserId(null)
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })

  if (isPending) return <p>Loading users...</p>

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 justify-items-center">
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
              <button
                onClick={() => sendFriendRequest.mutate(user._id)}
                className="btn btn-primary"
                disabled={activeUserId === user._id}
              >
                {activeUserId === user._id ? "Sending..." : "Send Request"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
export default AddFriends
