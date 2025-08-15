// user id has been received
// fetch sender and receiver
// chat ke array ko update karo
const mongoose = require("mongoose");
const User = require("../models/User");
const Chat = require("../models/Chat");
const Group = require("../models/Group");

exports.updateChat = async (req, res) => {
    try{
        // const {sender, receiver, owner, chatType, groupId, time, MediaType, message} = req.body;
        // const chatDetails = await Chat.create({
        //     sender : sender,
        //     receiver:receiver,
        //     owner: owner,
        //     // will be kept null if grpchat
        //     chatType:chatType,
        //     groupId: groupId,
        //     time: time,
        //     MediaType:MediaType,
        //     message:message,
        //     // will be kept null in personal chat
        // });
        // const UpdatedSenderChats = await User.findByIdAndUpdate(sender, {"$push": {"chats" : chatDetails._id},}, {new: true});
        // var UpdatedReceiverChats;
        // if(receiver)
        // {
        //     UpdatedReceiverChats = await User.findByIdAndUpdate(receiver, {"$push": {"chats" : chatDetails._id},}, {new: true});
        // }
        // else{
        //     UpdatedReceiverChats = await Group.findByIdAndUpdate(groupId, {"$push": {"chats" : chatDetails._id},}, {new: true});
        //     // group model has been updated
        // }


        const chatObjects = req.body;
        console.log("chatobjects received in the backend", chatObjects);

        const result = await Chat.insertMany(chatObjects.query);

        return res.status(200).json({
            success: true,
            message: 'Chats updated successfully.',
            result: result,
            // senderChat: UpdatedSenderChats,
            // receiver: UpdatedReceiverChats,
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

exports.updateChatDirectly = async (query) => {
    try {
        const result = await Chat.insertMany(query);
        console.log("Chat updated directly in backend", result);
        return result;
    } catch (error) {
        console.error("Error updating Chat directly in backend:", error);
        throw error;
    }
}

exports.getChats = async (req, res) => {
    try{
        const sender = req.query.query;
        // console.log("user sent in  the backend to get the history ", sender);

        const result = await Chat.find({$or: [
            { sender: sender },
            { receiver: sender }
        ]});
        // console.log("result is",result);

        return res.status(200).json({
            success: true,
            message: 'Chats received successfully.',
            result: result,
            // senderChat: UpdatedSenderChats,
            // receiver: UpdatedReceiverChats,
        })
    }
    catch(error){
            console.error(error);
            return res.status(500).json({
                success:false,
                message:"Error in received Chats",
                error: error.message,
            })
    }
}