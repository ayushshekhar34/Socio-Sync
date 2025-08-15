const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const User = require("./User");
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp: {
        type:String,
        required:true,
    },
	// expires: Date.now() + 1,
	action: {
		type:String,
		required:false
	},
    createdAt: {
        type:Date,
        default:Date.now,
		expires:1*60*1000,
    },
});
// OTPSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 });


async function sendVerificationEmail(email, otp, action) {
	// Create a transporter to send emails

	// Define the email options
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			`<h1>Your Otp for signup on our app SocioSync is : ${otp} ;</h1>)`
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}
// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");
	// this.expiresAt
	// Only send an email when a new document is created
	if (this.isNew) {
		try{
			const existingUser = await User.findOne({email : this.email});
			// Send the email
			if(this.action === "signup" && existingUser){
				throw Error("This email is already registered");
			}
			if(this.action == "forgotpassword" && !existingUser){
				throw Error("This email id is not registered");
			}
			await sendVerificationEmail(this.email, this.otp, this.action);
		}
		catch(error) {
			return next(error);
		}
	}
	next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;