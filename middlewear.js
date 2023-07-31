let jwt = require("jsonwebtoken")

function authentication(req,res,next){
    let subToken = req.headers.auth;
    if(!subToken){
        res.send("Please login first!")
    }else{
        let token = subToken;
        jwt.verify(token,process.env.SECRET_KEY,function(error,decoded){
            if(decoded){
                req.userID=decoded.userID;
                next();
            }else{
                res.send("Please login first")
            }
        })
    }
}

module.exports = {authentication}