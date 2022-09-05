import mongoose from 'mongoose';
// for providing infomation about what you need to add while you want to post something in social media. like making blue about a post wih different fields like instagram
const postSchema=mongoose.Schema({
    title:String,
    message:String,
    name:String,
    creator:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String], //arrays of ids
        default:[]
    },
    comments:{
        type:[String], //arrays of comments
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },

})
const PostMessage=mongoose.model('PostMessage',postSchema);

export default PostMessage;