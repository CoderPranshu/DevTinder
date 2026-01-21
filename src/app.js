const express = require("express");
require("./config/database");
const app = express();

const {adminAuth, userAuth} = require("./middlewares/adminAuth")

app.use("/admin",adminAuth);



app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data send");
}
)
app.get("/admin/deleteAllData",(req,res)=>{
    res.send("All Data DELETED");
}
)
app.use("/user",userAuth,(rq,res)=>{
    res.send("User is Authorized");
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000...");
})
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