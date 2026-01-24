const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    first_name:{
       type : String,
       required : true,
       minLength : 4,
       maxLength : 30,
    },
    last_name:{
       type:  String,
       required: true,
    },
    email:{
       type:  String,
       required: true,
       lowercase : true,
       unique :  true,
       trim : true,
       validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Invalid Email address : " + value);
         }
       }
    },
    password:{
       type : String,
       required : true,
       validate(value){
         if(!validator.isStrongPassword(value)){
            throw new Error("Choose Strong Password : ", value);
         }
       }
    },
    age : {
       type : Number,
       min : 18,
    },
    gender:{
       type : String,
       validate(value){
         if(!["male","female","others"].includes(value)){
            throw new Error("Gender data is not valid.");
         }
       }  
   },
   photoUrl : {
      type : String ,
      default : "https://www.freepik.com/free-photos-vectors/user",
      validate(value){
         if(!validator.isURL(value)){
            throw new Error("Invalid Photo url : " + value)
         }
      }
   },
   about : {
      type : String,
      default : "This is default about of User",
   },
   skills : {
      type : [],
   },

},
{
      timestamps:true
});

// const User = mongoose.model(User, userSchema);

module.exports = mongoose.model("User",userSchema);
