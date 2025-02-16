const mongoose = require("mongoose");

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect successfully");
    } catch (error) {
        console.log("Connect Error");
    }
}