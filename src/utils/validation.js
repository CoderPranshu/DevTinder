const validator = require("validator");

const validateSignUpData = (req) => {
    const {first_name,last_name,email,password} = req.body; //it is JS object extraction

    if(!first_name || !last_name){
        throw new Error("Name is not Valid.");
    }
    // else if(first_name<4 || first_name>50){
    //     throw new Error("First name should be btw 4-50 charactors.");
    // }
    else if(!validator.isEmail(email)){
        throw new Error("Invalid Email");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please insert a Storng Password.");
    } 
};

module.exports = {validateSignUpData};