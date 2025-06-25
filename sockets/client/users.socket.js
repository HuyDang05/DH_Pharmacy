const User = require("../../models/user.model");
 
module.exports = async (res) => {
  _io.once('connection', (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // Thêm id của A vào acceptFriend của B
      const existUserAInB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId
      });

      if(!existUserAInB) {
        await User.updateOne({
          _id: userId
        }, {
          $push: { acceptFriends: myUserId }
        })
      }

      // Thêm id của B vào requestFriend của A
      const existUserBInA = await User.findOne({
        _id: myUserId,
        requestFriends: userId
      });

      if(!existUserBInA) {
        await User.updateOne({
          _id: myUserId
        }, {
          $push: { requestFriends: userId }
        })
      }
    });
  });
}