const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const Group = require("../models/Group");
//auth
// during signup
exports.auth = async (req, res, next) => {
    // console.log("auth middleware mein ", req.files);
    try{
        //extract token
        // console.log(req)
        const token = req.header("Authorization").replace("Bearer ", "");
        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

// isAdmin
// This middleware is for group chat
exports.isAdmin = async (req, res, next) => {
    try{
           const {groupName,user} = req.body;
           const userID = user.id;
           const groupObject = await Group.findOne({name:groupName});
           const isUserAdmin = groupObject.admin.includes(userID);
           if(!isUserAdmin){
                return res.status(401).json({
                    success:false,
                    message:'Only Admins can do this',
                });
           }
           console.log("user is admin and has id",userID);
           next();
    }
    catch(error) {
       return res.status(500).json({
           success:false,
           message:'User role cannot be verified, please try again'
       })
    }
}