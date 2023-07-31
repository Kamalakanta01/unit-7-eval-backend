let express = require("express");
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
const { connection } = require("./connection");
const { userModule } = require("./UsersSchema")
const { authentication } = require("./middlewear");
const { router } = require("./blogRouter");
let app = express();
app.use(express.json())
app.use("/blogs",authentication,router)

app.post("/signup", async(req,res)=>{
    let {name,email,password}=req.body;
    console.log(req.body);
    let userObj = await userModule.findOne({email});
    if(userObj){
        res.send("This Email already exists, please login or use a different email");
    }else{
        bcrypt.hash(password ,10 , async(error,hashedPassword)=>{
            if(error){
                console.log(error)
                res.status(500).send(`Error hashing password`)
            }else{
                let user=req.body;
                user.password=hashedPassword;
                console.log(user)
                await userModule.create(user)
                res.status(200).send(`User Created Successfully`);
            }
        })
    }
})

app.post("/login", async(req,res)=>{
    let {email,password}=req.body;
    let userObj = await userModule.findOne({email})
    if(userObj){
        let pd = userObj.password;
        let result = await bcrypt.compare(password,pd);
        if(result){
            let token = jwt.sign({userID:userObj._id}, process.env.SECRET_KEY);
            res.status(200).send({"msg":"Successful",token})
        }else{
            res.send("Wrong credentials")
        }
    }else{
        res.send("email does not exist, please signup first")
    }
})

app.listen(8080, async()=>{
    try{
        await connection;
        console.log("connected on port 8080")
    }catch(err){
        console.log("error :")
        console.log(err)
    }
})