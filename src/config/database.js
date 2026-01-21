const mongoose = require("mongoose")
const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://pranshu_db_user:SkcbKfwe4EKfWuUZ@cluster0.zmolzuf.mongodb.net/"
    )
};

connectDB()
    .then(()=> {
        console.log("DataBase connection Established...")
    })
    .catch((err)=>{
        console.log("DataBase can not be connected....")
    }
    );