let express = require("express");
let router = express.Router();
const { blogsModule } = require("./BlogSchema")

router.get("/", async(req,res)=>{
    let {category,author}=req.query;
    console.log(category,author)
    if(category && author){
        let data = await blogsModule.find({category,author});
        console.log(1)
        res.send(data)
    }else if(category){
        let data = await blogsModule.find({category});
        console.log(2)
        res.send(data)
    }else if(author){
        let data = await blogsModule.find({author});
        console.log(3)
        res.send(data)
    }else{
        let data = await blogsModule.find();
        console.log(4)
        res.send(data)
    }
})

router.post("/create", async(req,res)=>{
    try{
        const userID=req.userID;
        let {title,category,author,content}=req.body;
        let newBlog = new blogsModule({
            title:title,
            category:category,
            author:author,
            content:content,
            userID:userID
        })
        await newBlog.save();
        res.status(200).send("Blog added")
    }catch(err){
        console.log(err)
        res.send("error")
    }
})

router.delete("/:id", async(req,res)=>{
    try{
        let id = req.params.id;
        const userID=req.userID;
        const data = await blogsModule.findOne({_id:id});
        console.log(data)
        check = data.userID.toString()
        if(check===userID){
            await blogsModule.findOneAndDelete({_id:id})
            res.send("Deleted")
        }else{
            res.send("Not Deleted")
        }

    }catch(err){
        console.log(err)
        res.send(err)
    }
})

router.patch("/:id", async(req,res)=>{
    try{
        let id = req.params.id;
        let updates = req.body;
        const userID=req.userID;
        const data = await blogsModule.findOne({_id:id});
        console.log(data)
        check = data.userID.toString()
        if(check===userID){
            await blogsModule.findOneAndUpdate({_id:id},updates)
            res.send("Updated")
        }else{
            res.send("Not Updated")
        }

    }catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports={router}