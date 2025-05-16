import { useNavigate } from "react-router-dom"

const NotLogged = () => {
  const navigate = useNavigate()

  return (
    <div className="hero bg-base-200 min-h-[calc(100dvh-35px)]">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Please Log In</h1>
          <p className="py-6">
            You need to be logged in to access this page. Please log in to
            continue!
          </p>
          <button
            onClick={() => navigate("/login", { replace: true })}
            className="btn btn-primary"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  )
}
export default NotLogged
