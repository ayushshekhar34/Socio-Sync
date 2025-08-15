const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    gender:{
        type:String,
        enum:["Male", "Female", "Other"],
    },
    dateOfBirth:{
        type:Date,
    },
    about:{
        type:String,
    },
    contactNumber:{
        type:String,
    },
    profileImage:{
        type:String,
        default:null,
    },
})


module.exports = mongoose.model("Profile", profileSchema);