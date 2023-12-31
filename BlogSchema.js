let mongoose = require("mongoose");

let blogSchema = mongoose.Schema({
    title:{type:String,required:true},
    category:{type:String,required:true},
    author:{type:String,required:true},
    content:{type:String,required:true},
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"userModule"}
})

let blogsModule = mongoose.model("Blog",blogSchema);

module.exports = {blogsModule}