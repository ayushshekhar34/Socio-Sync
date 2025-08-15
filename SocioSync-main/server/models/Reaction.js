const mongoose = require('mongoose');
const reactionSchema = new mongoose.Schema({
    emoji: {
        type: String,
        required: true,
    },
    sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    chatType: {
        type: String,
        enum: ['personal', 'group'],
        required: true,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: function() {
            return this.chatType === 'group';
        },
    },
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;