const User = require("../../models/user.model");
const usersSocket = require("../../sockets/client/users.socket");


// [GET] /user/not-friend
module.exports.notFriend = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket
  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId
  }); 

  const requestFriends = myUser.requestFriends;
  const acceptFriends = myUser.acceptFriends;
 
  const users = await User.find({
    $and: [
      { _id: { $ne: userId } },
      { _id: { $nin: requestFriends } },
      { _id: { $nin: acceptFriends } } 
    ],
    status: "active",
    deleted: false
  }).select("avatar fullName");


  res.render("client/pages/users/not-friend", {
    pageTitle : "Danh sách người dùng",
    users: users
  });
} 

// [GET] /user/request
module.exports.request = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket
  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId
  })

  const requestFriends = myUser.requestFriends;

  const users = await User.find({
    _id : { $in: requestFriends },
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/users/request", {
    pageTitle : "Lời mời đã gửi",
    users: users
  });
} 


// [GET] /user/accept
module.exports.accept = async (req, res) => {
  // Socket
  usersSocket(res);
  // End Socket
  const userId = res.locals.user.id;

  const myUser = await User.findOne({
    _id: userId
  })

  const acceptFriends = myUser.acceptFriends;

  const users = await User.find({
    _id : { $in: acceptFriends },
    status: "active",
    deleted: false
  }).select("id avatar fullName");

  res.render("client/pages/users/accept", {
    pageTitle : "Lời mời đã nhận",
    users: users
  });
} 
