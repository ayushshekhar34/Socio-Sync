const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
// const { passwordUpdate, passwordUpdated } = require("../mail/passwordUpdate");
const Profile = require("../models/Profile");
const { use } = require("../routes/User");
require("dotenv").config();

// send OTP
exports.sendotp = async (req, res) => {
    try{
        // fetch email from req body
        const {email} = req.body;
        const {action} = req.body;
        console.log(email);
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: ", otp);

        // check unique otp or not
        var result = await OTP.findOne({otp: otp});

        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp: otp});
        }

        const otpPayload = {email, otp, action};
        // create an entry for OTP
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        // return res successful
        res.status(200).json({
            success:true,
            message:'OTP generated Successfully',
            otp,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in Generating otp. Please try again!!",
        })
    }
}

// signup
exports.signup = async (req, res) => {
    try{
        // data fetch
        const {
            email,
            password,
            confirmPassword,
            name,
            userName,
            otp,
            action
        } = req.body.ultraNewSignupData;
        console.log("backend data", req.body.ultraNewSignupData);
        // validate
        if(!name || !email || !password || !confirmPassword || !otp || !userName){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        // check if user already exists
        const checkUserPresent = await User.findOne({email: email});
        console.log(checkUserPresent);

        // if user already exists, then return a response
        if(checkUserPresent !== null) {
            return res.status(401).json({
                success: false,
                message: 'User already exists',
            })
        }

        // 2 password ko match karlo(password & confirm password)
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword does not match, please try again"
            });
        }

        // checking uniqueness of userName

        // check user alresdy exist or not
        const existingUser = await User.findOne({
            $or:[{email: email}, 
                {userName: userName}]
        });
        if(existingUser)
        {
            return res.status(400).json({
                success:false,
                message:'Email or UserName already exists',
            });
        }

        // find most recent OTP stored for the user
        const recentOtp =  await OTP.findOne({email: email}).sort({createdAt:-1});
        console.log(recentOtp)
        // validate otp
        console.log("before otp verification")
        if(recentOtp === null){
            // Otp not found
            return res.status(400).json({
                success:false,
                message:'OTP not found',
            })
        }
        else if(otp !== recentOtp.otp) {
            // Invalid Otp
            return res.status(400).json({
                success:false,
                message:'Otp not matched',
            })
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the User
        // entry create in DB
        const profileDetails = await Profile.create({
            name:name,
            gender:null,
            dob: null,
            about:null,
            ph_no:null,
            profileImage:`https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
        });

        const user = await User.create({
            name: name,
            email: email,
            password:hashedPassword,
            profile: profileDetails._id,
            activity:"active",
            userName: userName,
        });
        // return res
        return res.status(200).json({
            success:true,
            message:"User is registered successfully",
            user,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User is not Registred, Please try again."
        });
    }
}

// login

exports.login = async (req, res) =>{
    try{
        //  get data from req body
        const {email, password, userName} = req.body.formData;
        // validate data
        if((!email && !userName) || !password)
        {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        };
        // check user exists or not
        const user = await User.findOne({ email: email }).populate("profile") || await User.findOne({ userName: userName }).populate("profile");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User not registered",
            });
        }
        // generate jwt, after password matching
        if(await bcrypt.compare(password, user.password))
        {
            const payload = {
                email: user.email,
                id: user._id,
                userName: user.userName,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:"48h",
            });
            // save token to the user document in database
            user.token = token;
            user.password = undefined;
            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            console.log("sending data is",user);
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in Successfully',
            })
        }
        else
        {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure, please try again later',
        })
    }
}

// changepassword
exports.changePassword = async (req, res) => {
    console.log(req.body)
    try{
        // get user data from req body
        const userDetails = await User.findById(req.user.id);
        // this is an imp step as this fetches the details of the user from DB
        // so it contains the hashed password

        // here request will be passed from the auth middleware
        // and it will contain the user which contains the payload passed at the time of token creation


        // get oldPassword, newPassword, confirmNewPassword
        const {oldPassword, newPassword} = req.body;

        // validation
        if(!oldPassword || !newPassword)
        {
            return res.status(404).json({
                success:false,
                message:"Please fill all the fields required for password change",
            });
        }
        const doesPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        console.log(doesPasswordMatch);
        if(!doesPasswordMatch)
        {
            return res.status(401).json({
                success:false,
                message:"The password is incorrect",
            });
        }

        // update pwd in DB
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            {password: hashedPassword},
            {new:true},
        );

        // send mail - Password update
        try{
            // console.log("email jaane waala h");
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                // passwordUpdated(updatedUserDetails.email, `Password was updated successfully for ${updatedUserDetails.name}`),
                "Your password was updated successfully",
                `<h1> Thank You for using our Service </h1>`,
            );
            console.log("Email sent successfully: ", emailResponse.response);
        }
        catch(error){
            console.error("Error occurred while sending email", error);
                return res.status(500).json({
                success:true,
                message:"Error occurred while sending email",
                error:error.message,
            });
        }
        // return response
        return res.status(200).json({
                success:true,
                message:"Password changed successfully !!",
            });
        }
        catch(error){
            console.error("Error occurred while updating the password: ", error);
            return res.status(500).json({
                success:false,
                message: "Error occurred while updating the password",
                error: error.message,
            })
        }
    }

// forgot password
exports.forgotPassword = async (req, res) => {
    console.log("jai shri ram",req.body);
    try{
        const {
            email,
            password,
            confirmPassword,
            otp
        } = req.body.ultraNewSignupData;
        // validate
        if(!password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }
        if(confirmPassword !== password){
            return res.status(401).json({
                success:false,
                message:"Password and confirmPassword must be same",
            })
        }

        // check if user already exists
        const checkUserPresent = await User.findOne({email: email});
        console.log(checkUserPresent);

        // if user already exists, then return a response
        if(!checkUserPresent) {
            console.log("the user is not present")
            return res.status(401).json({
                success: false,
                message: 'User does not exists',
            })
        }

        // 2 password ko match karlo(password & confirm password)
        if(password !== confirmPassword)
        {
            return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword does not match, please try again"
            });
        }

        // find most recent OTP stored for the user
        const recentOtp =  await OTP.find({email: email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp[0].otp);
        // validate otp
        if(recentOtp.length === 0){
            // Otp not found
            return res.status(400).json({
                success:false,
                message:'OTP not found',
            })
        }
        else if(otp !== recentOtp[0].otp) {
            // Invalid Otp
            return res.status(400).json({
                success:false,
                message:'Otp not matched',
            })
        }
        
        // Hash password
        console.log("hash pwd tak pahuch gya")
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(
            checkUserPresent._id,
            {password: hashedPassword},
            {new:true},
        );
        console.log("pwd updated scsfly");
        // send mail - Password update
        try{
            const emailResponse = await mailSender(
                updatedUserDetails.email,
               "Your password was updated successfully",
               `<h1> Thank you for using our service </h1>`,
            );
            console.log("Email for resetpassword sent successfully: ", emailResponse.response);
        }
        catch(error){
            console.error("Error occurred while sending email", error);
                return res.status(500).json({
                success:true,
                message:"Error occurred while sending email",
                error:error.message,
            });
        }
        // return response
        return res.status(200).json({
            success:true,
            message:"Password changed succefully!!",
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"Error occurred while creating new password."
        })
    }
}