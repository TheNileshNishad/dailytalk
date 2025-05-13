import useAuthStore from "../store/authStore"

const Chat = () => {
  const user = useAuthStore((state) => state?.user?.name)

  return <div>Hello {user && user}</div>
}
export default Chat
