const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");


// [GET] /chat
module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  // Socket IO
  _io.once('connection', (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content
      });
      await chat.save();

      // Trả data về cho client
      _io.emit("SERVER_RETURN_MESSAGE", {
        userId: userId,
        fullName: fullName,
        content: content
      });
    });

    socket.on("CLIENT_SEND_TYPING", (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type
      })
    }); 
  });
  // End SocketIO

  // Get data
  const chats = await Chat.find({
    deleted: false
  })

  for (const chat of chats) {
    const infoUser = await User.findOne({
        _id: chat.user_id
    }).select("fullName");

    chat.infoUser = infoUser;
  }

  res.render("client/pages/chat/index", {
    pageTitle : "Chat",
    chats: chats
  });
} 