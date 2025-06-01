import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../api/axios"

const OutgoingRequests = () => {
  // get all outgoing friend requests
  const { data: outgoingRequests, isPending } = useQuery({
    queryKey: ["outgoingRequests"],
    queryFn: () => axiosInstance.get("/api/friends/requests/outgoing"),
    select: (res) => res.data.outgoingRequests,
  })

  if (isPending) return <p>Loading outgoing requests</p>

  return (
    <>
      <div className="my-10">
        <p className="text-lg font-semibold text-center">
          Outgoing friend requests
        </p>
      </div>

      {outgoingRequests.length === 0 ? (
        <p>No outgoing friend request found!</p>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 justify-items-center">
          {outgoingRequests.map((outgoingRequest) => (
            <div
              key={outgoingRequest._id}
              className="card w-90 bg-base-300 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <div className="avatar">
                  <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    {outgoingRequest?.receiver?.avatar ? (
                      <img
                        src={outgoingRequest?.receiver?.avatar?.secure_url}
                        alt={`${outgoingRequest.receiver.name}'s avatar`}
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full">
                        <span className="text-xl">
                          {outgoingRequest.receiver
                            ? outgoingRequest.receiver.name
                                .charAt(0)
                                .toUpperCase()
                            : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="card-title mt-4">
                  {outgoingRequest.receiver.name}
                </h2>
                <p className="text-sm text-gray-500">
                  @{outgoingRequest.receiver.userName}
                  {outgoingRequest.receiver.gender &&
                    outgoingRequest.receiver.gender !== "prefer not to say" &&
                    ` ⚥${outgoingRequest.receiver.gender}`}
                </p>
                <p className="mt-2">{outgoingRequest.receiver?.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
export default OutgoingRequests
