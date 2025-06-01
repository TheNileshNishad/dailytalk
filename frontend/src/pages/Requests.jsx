import IncomingRequests from "../components/IncomingRequests"
import OutgoingRequests from "../components/OutgoingRequests"

const Requests = () => {
  return (
    <div className="min-h-[calc(100dvh-75px)]">
      <IncomingRequests />
      <OutgoingRequests />
    </div>
  )
}
export default Requests
