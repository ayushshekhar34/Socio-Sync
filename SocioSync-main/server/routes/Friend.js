const express = require("express")
const router = express.Router()

// Import the required controllers and middleware functions
const {
    sendRequest,
    acceptRequest,
    rejectRequest,
    deleteRequest
} = require("../controllers/Friend")

const { auth } = require("../middlewares/auth")

router.post("/sendrequest",auth, sendRequest)
router.post("/acceptrequest",auth, acceptRequest)
router.delete("/rejectrequest",auth, rejectRequest)
router.delete("/deleterequest",auth, deleteRequest)

module.exports = router