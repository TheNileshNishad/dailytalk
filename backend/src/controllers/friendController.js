const getFriends = (req, res) => {
  res.send("getFriends")
}

const getIncomingRequests = (req, res) => {
  res.send("getIncomingRequests")
}

const getSentRequests = (req, res) => {
  res.send("getSentRequests")
}

const sendFriendRequest = (req, res) => {
  res.send("sendFriendRequest")
}

const cancelFriendRequest = (req, res) => {
  res.send("cancelFriendRequest")
}

const acceptFriendRequest = (req, res) => {
  res.send("acceptFriendRequest")
}

const rejectFriendRequest = (req, res) => {
  res.send("rejectFriendRequest")
}

const removeFriend = (req, res) => {
  res.send("removeFriend")
}

export {
  getFriends,
  getIncomingRequests,
  getSentRequests,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
}
