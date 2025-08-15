import { Card, CardBody, Text, Box, HStack, PinInput, PinInputField, Button, Center, Link } from "@chakra-ui/react"
import { RepeatClockIcon, ArrowBackIcon } from '@chakra-ui/icons'
import { signUp } from "../services/operations/authAPI"
import { forgotPassword} from "../services/operations/authAPI"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import useCustomToast from "../utils/useCustomToast"
export const VerifyEmail = () => {
  const location = useLocation();
  const msg = location.state.message;
  const {signupData} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {showToast, updateToast} = useCustomToast();
  const [otpValue, setOtpValue] = useState(['', '', '', '', '', '']);
  // const [otp, setOtp] = useState('');

  const handleChange = (index, value) => {
    const newOtpValue = [...otpValue];
    newOtpValue[index] = value;
    setOtpValue(newOtpValue);
  }
  const handleClick = (e) => {
    e.preventDefault()
    const otp = otpValue.join('');
    console.log(signupData)
    const ultraNewSignUpData = {
      ...signupData,
      otp: otp,
      action:msg,
    }
    if(msg === "forgotpassword"){
      console.log("forgot pwd. ke liye jaa rha h", ultraNewSignUpData);
      dispatch(forgotPassword(ultraNewSignUpData, navigate, showToast, updateToast));
    }
    // console.log("email 1", email)
    // console.log("the otp is", otp)
    // console.log("verify email mein", ultraNewSignUpData);
    else{
      dispatch(signUp(ultraNewSignUpData, navigate, showToast, updateToast));
    }
  }

  return (
    <Card
    width={"100%"} 
    height={"100vh"} 
    bg={"#1a202f"} 
    borderRadius={"0"} 
    overflow={"auto"} 
    pt={"20px"} 
    pb={"20px"}
    css={{
      '&::-webkit-scrollbar': {
        width: "10px",
      },
    }}
    >
        <Card mt={"auto"} mb={"auto"} align={"center"} width={["40%", "65%", "40%", "40%", "30%", "30%"]} mx={"auto"} variant={"filled"} borderRadius={"lg"} bg={"black"} shadow={"md"} p={1}>
            <CardBody shadow={"xl"} bg={"#2d3250"} borderRadius={"lg"} w={"100%"}>
                    <Text color={"gray.100"} fontSize={"20px"} >Verify your Email</Text>
                    <Text color={"gray.400"} fontSize={"13px"}> A verification mail has been sent to you. Enter the code below </Text>
                    <Center>
                    <HStack mt={2} mb={4}>
                        <PinInput type='number' placeholder="-">
                            <PinInputField value={otpValue[0]} onChange={(e) => handleChange(0, e.target.value)}color={"gray.200"}/>
                            <PinInputField value={otpValue[1]} onChange={(e) => handleChange(1, e.target.value)}color={"gray.200"}/>
                            <PinInputField value={otpValue[2]} onChange={(e) => handleChange(2, e.target.value)}color={"gray.200"}/>
                            <PinInputField value={otpValue[3]} onChange={(e) => handleChange(3, e.target.value)}color={"gray.200"}/>
                            <PinInputField value={otpValue[4]} onChange={(e) => handleChange(4, e.target.value)}color={"gray.200"}/>
                            <PinInputField value={otpValue[5]} onChange={(e) => handleChange(5, e.target.value)}color={"gray.200"}/>
                        </PinInput>
                    </HStack>
                    </Center>
                        <Center>
                        <Button 
                        w={"90%"} 
                        fontSize={"15px"} 
                        bgColor={"#cbb06a"} 
                        _hover={{bg: "yellow.500"}}
                        onClick={handleClick}
                        > 
                          Verify Email
                        </Button>
                        </Center>
                    <HStack fontSize={"small"} justify={"space-between"} pr={2} pl={2} mt={4}>
                      <Link color={"gray.400"} href="/login" _hover={{color:"yellow.400"}}>
                        <ArrowBackIcon/>
                        return to login
                      </Link>
                      <Text color={"blue.200"} _hover={{cursor: "pointer"}}><RepeatClockIcon/>resend Otp</Text>
                    </HStack>
            </CardBody>
        </Card>
    </Card>
  )
}

export default VerifyEmail