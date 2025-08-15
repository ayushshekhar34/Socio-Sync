const mongoose = require("mongoose");
const User = require("../models/User");

exports.sendRequest = async (req, res) => {
    try{
        const senderName = req.user.userName;
        const receiverName = req.body.userName;

        const senderID = await User.findOne({ userName: senderName});
        const receiverID = await User.findOne({ userName: receiverName});
        console.log("backend mein sender is ", senderID , senderName);
        console.log("backend mein receiver is ", receiverID, receiverName);
        const UpdatedSender = await User.findByIdAndUpdate( senderID, {"$push": {"requests" : receiverID},}, {new: true}).populate("requests").exec();
        const UpdatedReceiver = await User.findByIdAndUpdate( receiverID, {"$push": {"invites" : senderID} }, {new: true}).populate("invites").exec();

        return res.status(200).json({
            success: true,
            message: 'Friend request sent successfully.',
            sender: UpdatedSender,
            receiver: UpdatedReceiver,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in sending request",
            error: error.message,
        })
    }
}

exports.acceptRequest = async (req, res) => {
    try{
        const acceptorName = req.user.userName;
        const newFriendName = req.body.userName;


        const acceptorID = await User.findOne({ userName: acceptorName});
        const newFriend = await User.findOne({ userName: newFriendName});

        let UpdatedAcceptor = await User.findByIdAndUpdate(acceptorID._id,
                                {"$push": {"friends" : newFriend}},
                                {new: true});
        let UpdatedFriend = await User.findByIdAndUpdate(newFriend._id,
                                {"$push": {"friends" : acceptorID} },
                                {new: true});

        UpdatedAcceptor = await User.findByIdAndUpdate(acceptorID._id,
                        {"$pull": {"invites" : newFriend._id}},
                        {new: true});

        UpdatedFriend = await User.findByIdAndUpdate(newFriend._id,
                        {"$pull": {"requests" : acceptorID._id}},
                        {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request accepted successfully.',
            acceptor: UpdatedAcceptor,
            receiver: UpdatedFriend,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in accepting request",
            error: error.message,
        })
    }
}

exports.rejectRequest = async (req, res) => {
    try{
        const rejectorName = req.user.userName;
        const rejectedFriendName = req.body.userName;
        console.log("req ki body in friends controller...", req.body);

        console.log("rejector Name is", rejectorName);
        console.log("rejected friend is ", rejectedFriendName)
        const rejectorID = await User.findOne({ userName: rejectorName});
        const rejectedFriend = await User.findOne({ userName: rejectedFriendName});

        UpdatedAcceptor = await User.findByIdAndUpdate(rejectorID._id,
                        {"$pull": {"invites" : rejectedFriend._id}},
                        {new: true});

        UpdatedFriend = await User.findByIdAndUpdate(rejectedFriend._id,
                        {"$pull": {"requests" : rejectorID._id}},
                        {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request rejected successfully.',
            acceptor: UpdatedAcceptor,
            receiver: UpdatedFriend,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in rejecting request",
            error: error.message,
        })
    }
}

exports.deleteRequest = async (req, res) => {
    try{
        const senderName = req.user.userName;
        const receiverName = req.body.userName;

        console.log("request ki body in controller is ...", req.body);

        console.log("sender is ", senderName);
        console.log("receiver is ", receiverName);

        const senderID = await User.findOne({ userName: senderName});
        const receiverID = await User.findOne({ userName: receiverName});

        const UpdatedSender = await User.findByIdAndUpdate(senderID._id, {"$pull": {"requests" : receiverID._id},}, {new: true});
        const UpdatedReceiver = await User.findByIdAndUpdate(receiverID._id, {"$pull": {"invites" : senderID._id} }, {new: true});

        return res.status(200).json({
            success: true,
            message: 'Friend request retrieved successfully.',
            sender: UpdatedSender,
            receiver: UpdatedReceiver,
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error in retrieving request",
            error: error.message,
        })
    }
}