import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../api/axios"

const IncomingRequests = () => {
  // get all incoming friend requests
  const { data: incomingRequests, isPending } = useQuery({
    queryKey: ["incomingRequests"],
    queryFn: () => axiosInstance.get("/api/friends/requests/incoming"),
    select: (res) => res.data.incomingRequests,
  })

  if (isPending) return <p>Loading incoming requests</p>

  return (
    <>
      <div className="my-10">
        <p className="text-lg font-semibold text-center">
          Incoming friend requests
        </p>
      </div>

      {incomingRequests.length === 0 ? (
        <p>No pending friend requests found!</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 justify-items-center">
          {incomingRequests.map((incomingRequest) => (
            <div
              key={incomingRequest._id}
              className="card w-90 bg-base-300 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    {incomingRequest?.sender?.avatar ? (
                      <img
                        src={incomingRequest?.sender?.avatar?.secure_url}
                        alt={`${incomingRequest.sender.name}'s avatar`}
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full">
                        <span className="text-xl">
                          {incomingRequest.sender
                            ? incomingRequest.sender.name
                                .charAt(0)
                                .toUpperCase()
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="card-title mt-4">
                  {incomingRequest.sender.name}
                </h2>
                <p className="text-sm text-gray-500">
                  @{incomingRequest.sender.userName}
                  {incomingRequest.sender.gender &&
                    incomingRequest.sender.gender !== "prefer not to say" &&
                    ` ⚥${incomingRequest.sender.gender}`}
                </p>
                <p className="mt-2">{incomingRequest.sender?.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
export default IncomingRequests
