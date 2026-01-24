const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt");

app.use(express.json());
//sign up route
    app.post("/signUp", async(req,res)=> {
        try{
        //validation of Data
        validateSignUpData(req);
        //encrypt the PassWord
        const {first_name , last_name , email , password} = req.body ;
        const passwordHash = await bcrypt.hash(password,10);

        //creting an instance of User model and passing req.body to it or //this is how we create a new user using mongoose model or schema
        const user = new User({
            first_name,
            last_name,
            email,
            password : passwordHash ,
        });
            await user.save();
            res.send("User Signed Up Successfully..");
        }
        catch(err){
            // console.log(err);
            res.status(400).send("Error " + err.message);
        }       
    });
//LOGIN ROUTE
    
    app.post("/login", async(req,res)=>{
        try{
        const {email,password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid Credentials..");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(isPasswordValid){
            res.send("Login Successfull!!!");
        }else{
            throw new Error("Invalid Credentials");
        }
        }
        catch(err){
            res.status(400).send("Error : " + err.message);
        }
       
    });

//fetch user by email
    app.get("/getUsersByMail",async(req,res)=>{
        const userEmail = req.body.email;
        try{
            const users = await User.find({email:userEmail});
            if(users.length === 0){
                res.status(404).send("User not found...");
            }
            else{
                res.send(users);
            }
        }
        catch(err){
            res.status(400).send("Something went wrong");
        }
    });
//fetch all users
    app.get("/getAllUser",async(req,res)=>{
        try{
            const users = await User.find({});
            if(users.length === 0) {
                res.status(404).send("Users not found...");
            }
            else{
                res.send(users);
            }          
        }
        catch(err){
            res.status(400).send("Something Went Wrong...");
        }
    });
//fetch user by ID
    app.get("/feed",async(req,res)=>{
        try{
            const users = await User.findById(req.body.userId);
            if(!users){
                res.status(404).send("User not found...");
            }
            else{
                res.send(users);
            }
        }
        catch(err){
            res.status(400).send("Something went wrong...");
        }
    });

    app.delete("/deleteItem",async(req,res)=>{
        const usersId = req.body.userId;

        try{
            const users = await User.findByIdAndDelete(usersId);
            // const users = await User.findByIdAndDelete({_id : usersId});
            if(!usersId){
                res.status(404).send("User not found...");
            }
            else{
                res.send("User Deleted Successfully...");
            }
        }
        catch(err){
            res.status(400).send("Something went wrong...");
        }
    });
//update user by ID

    app.patch("/user/:userId",async(req,res)=>{
        const userId = req.params?.userId;
        const data = req.body;

        try{
            const allowed_updates = ["photoUrl","about","gender","age","skills"];
            const isUpdateAllowed = Object.keys(data).every((k) => allowed_updates.includes(k));

            if(!isUpdateAllowed){
                throw new Error ("Update Not Allowed..");
            }
            // if(data?.skills.length>10){
            //     throw new Error("Skills can not be more than 10");
            // }

            const user = await User.findByIdAndUpdate(userId , data ,{
                returnDocument : "after",
                runValidators : true,
            });
            if(!user){
                res.status(404).send("User not found...");
            }
            else{
                res.send("User Updated Successfully...");
            }
        }
        catch(err){
            res.status(400).send("UPDATE_FAILED : " + err.message);
        }
    });

//connecting to database and starting the server

connectDB()
    .then(()=> {
        console.log("DataBase connection Established...")

        app.listen(4000,()=>{
        console.log("Server is running on port 4000...");
    })

    })
    .catch((err)=>{
        console.log("DataBase can not be connected....")
    }
    );




// const {adminAuth, userAuth} = require("./middlewares/adminAuth")

// app.use("/admin",adminAuth);



// app.get("/admin/getAllData",(req,res)=>{
//     res.send("All Data send");
// }
// )
// app.get("/admin/deleteAllData",(req,res)=>{
//     res.send("All Data DELETED");
// }
// )
// app.use("/user",userAuth,(rq,res)=>{
//     res.send("User is Authorized");
// })

// app.listen(3000,()=>{
//     console.log("Server is running on port 3000...");
// })
// app.use("/user",(req,res)=>{
//     res.send("This is User.")
// },
// (req,res,next)=>{
//      res.send("This is 2nd User.")
//      next();
// },
// (req,res)=>{
//     res.send("This is 3rd User.")
// }

//)

// app.listen(3000,()=>{
//     console.log("Server is running on port 3000...");
// })

// app.get("/user",(req,res)=>  {
//     console.log(req.query);
//     res.send({name:"Pranshu",age:21});
// })

// app.post("/user",(req,res)=> {
//     res.send("Post request called at /user....");
// })

// app.delete("/user",(req,res)=>{
//     res.send("Delete request called at /user....");
// });


//this is route parameter example and not query parameter 
//in query parameter we use ? and & to pass multiple parameters
//in route parameter we use / to pass multiple parameters
// app.get("/user/:id",(req,res)=>{
//     // console.log(req.params);
//     const userId = req.params.id;
//     res.send({id:userId,name:"Pranshu",age:21});
// }

//this will match all the HTTP method api calls to /testing like GET, POST, DELETE, PUT etc.
//this is called as middleware function in expressjs
//this creates problem if we have to create different handlers for different HTTP methods like GET, POST etc.


// app.use("/testing",(req,res)=>{
//     res.send("Hello from DevTinder Testing");
// });

// app.use("/home",(req,res)=>{
//     res.send("Hello from DevTinder Home");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello from DevTinder");
// });

// app.listen(7000,() =>{
//     console.log('Server is running on port 7000....');
// });