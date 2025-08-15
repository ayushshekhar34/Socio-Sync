const mongoose = require("mongoose");
const User = require("../models/User");
const Group = require("../models/Group");

exports.createGroup = async (req, res) => {
    try{
        const {groupName,creator,description} = req.body;
        const groupDetails = await Group.create({
            name:groupName,
            members:[creator],
            admin:[creator],
            description:description,
        });

        const UpdatedCreatorGroups = await User.findByIdAndUpdate(creator, {"$push": {"groups" : groupDetails._id},}, {new: true});

        return res.status(200).json({
            success: true,
            message: 'Group created successfully.',
            groupDetails:groupDetails,
            UpdatedCreatorGroups:UpdatedCreatorGroups,
        })
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in updating Chats",
            error: error.message,
        })
    }
}

//add member
exports.addMembers = async (req, res) => {
    try{
        const {groupName,members} = req.body;
        const groupID = await Group.find({name:groupName});
        var updatedGroup;
        for(member in members){
            //member updated
            const updatedMemberObject = await User.findOneAndUpdate({userName:member}, {"$push": {"groups" : groupID._id},}, {new: true});
            updatedGroup = await Group.findOneAndUpdate({name:groupName}, {"$push": {"members" : updatedMemberObject._id},}, {new: true});
        }

        return res.status(200).json({
            success: true,
            message: 'Members added successfully',
            updatedGroup:updatedGroup,
        })
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in updating Chats",
            error: error.message,
        })
    }
}
exports.removeMembers = async (req, res) => {
    try{
        const {groupName,members} = req.body;
        const groupID = await Group.find({name:groupName});
        var updatedGroup;
        for(member in members){
            //member updated
            const updatedMemberObject = await User.findOneAndUpdate({userName:member}, {"$pull": {"groups" : groupID._id},}, {new: true});
            updatedGroup = await Group.findOneAndUpdate({name:groupName}, {"$pull": {"members" : updatedMemberObject._id},}, {new: true});
            //if the user was admin...remove him from admin array also
            if(updatedGroup.admin.includes(updatedMemberObject._id)){
                await Group.updateOne({name:groupName}, {"$pull": {"admin" : updatedMemberObject._id},}, {new: true});
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Members added successfully',
            updatedGroup:updatedGroup,
        })
    }

    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in updating Chats",
            error: error.message,
        })
    }
}

// Todo:-
//make admin
//remove admin
