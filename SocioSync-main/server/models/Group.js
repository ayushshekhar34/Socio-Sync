const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default:null,
    }],
    admin:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    chats:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Chat",
        }
    ],
    description:{
        type:String,
    },
    grp_icon:{
        type:String,
        trim:true,
    },
})


module.exports = mongoose.model("Group", groupSchema);