import { useQuery } from "@tanstack/react-query"
import axiosInstance from "../api/axios"
import { useEffect, useState } from "react"
import useAuthStore from "../store/authStore"

const provideAuth = () => {
  const refreshAuth = async () => {
    const res = await axiosInstance.get("/api/auth/refresh")
    return res.data
  }

  const { data, isPending, error } = useQuery({
    queryKey: ["refresh"],
    queryFn: refreshAuth,
    retry: false,
  })

  const setAuthData = useAuthStore((state) => state.setAuthData)
  const clearAuthData = useAuthStore((state) => state.clearAuthData)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!isPending) {
      if (data) {
        setAuthData(data.user, data.accessToken)
      } else if (error) {
        clearAuthData()
      }
      setIsReady(true)
    }
  }, [data, isPending, error])

  return { isReady }
}

export default provideAuth
