const adminAuth = (req,res,next) => {
    const token = "xyz";
    const isAdminAuthorized = token === "xyz"

    if(!isAdminAuthorized){
        res.status(401).send("UnAuthorized Admin")
    }
    else{
        next();
    }
};

const userAuth = (req,res,next) => {
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
    if(!isUserAuthorized){
        res.status(404).send("Unauthorized User.");
    }
    else{
        next();
    }
}
module.exports = {
    adminAuth,
    userAuth
}