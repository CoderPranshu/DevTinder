const mongoose = require("mongoose");

const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://pranshudevTinder:hhUOePtkCCj9FxQS@cluster1.dvstzga.mongodb.net/devTinderDB",
    )
};

module.exports = connectDB;
