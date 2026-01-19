const express = require("express");

const app = express();

app.use((req,res)=>{
    res.send("Hello from DevTinder");
});

app.use("/testing",(req,res)=>{
    res.send("Hello from DevTinder Testing");
});
app.use("/home",(req,res)=>{
    res.send("Hello from DevTinder Home");
});

app.listen(7000,() =>{
    console.log('Server is running on port 7000....');
});