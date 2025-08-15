import {
  Button,
  Card,
  CardBody,
  Image,
  Box,
  Input,
  Text,
  Hide,
  Link,
  HStack,
  useToast,
  Flex
} from "@chakra-ui/react";
import pic from "../assets/People1.png";
import { Logo } from "../components/Logo.jsx";
import React, { useState } from "react";
import InputField from "../components/InputField.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSignupData } from "../redux/Slices/authSlice.js";
import { sendOtp } from "../services/operations/authAPI.js";
import useCustomToast from "../utils/useCustomToast.jsx";
export const SignUp = () => {
  const action = "signup";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selector = useSelector((state) => state.signupData);
  const toast = useToast();
  const {showToast, updateToast} = useCustomToast();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const SignUpData = [
    {
      id: "email",
      l: "Email Address",
      f: "Enter your Email Address",
      p: false,
      v: formData.email,
    },
    { 
        id: "name", 
        l: "Name", 
        f: "Enter Your Name", 
        p: false, 
        v: formData.name
    },
    {
      id: "userName",
      l: "UserName (This should be unique)",
      f: "Enter your UserName",
      p: false,
      v: formData.userName,
    },
    {
      id: "password",
      l: "Create Password",
      f: "Enter your Password",
      p: true,
      v: formData.password,
    },
    {
      id: "confirmPassword",
      l: "Confirm Password",
      f: "Confirm your Password",
      p: true,
      v: formData.confirmPassword,
    },
  ];

  const handleFieldChange = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const renderData = SignUpData.map((item) => (
    <InputField
      key={item.id}
      label={item.l}
      field={item.f}
      password={item.p}
      value={item.v}
      onChange={(value) => handleFieldChange(item.id, value)}
    />
  ));

  const LinkData = "Login";
  const btnData = "SignUp";
  const topData = "Don't Have an account";

  const handleSubmit = (e) => {
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password not Matched",
        description:
          "Please make sure that password and confirm password are same.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    dispatch(setSignupData(formData));
    dispatch(sendOtp(action,formData.email, navigate, showToast, updateToast));

    setFormData({
      email: "",
      name: "",
      userName: "",
      password: "",
      confirmPassword: "",
    });
  };

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
        "&::-webkit-scrollbar": {
          width: "10px",
        },
      }}
    >
      <Card
        direction={"row"}
        mt={"auto"}
        mb={"auto"}
        align={"center"}
        width={"65%"}
        // height={"70%"}
        mx={"auto"}
        variant={"filled"}
        borderRadius={"xl"}
        bg={"black"}
        shadow={"md"}
        p={4}
      >
        <CardBody 
          shadow={"xl"}
          bg={"#2d3250"}
          borderRadius={"lg"}
          h = 'full'>
          <Box>
            <Logo ht={130} wt={470} />
            <Text fontSize="20px" color="gray.200">
              {btnData}
            </Text>
            <HStack>
              <Text color="gray.500">{topData}</Text>
              <NavLink to={"/login"}>
                <Text color="yellow.500">{LinkData}?</Text>
              </NavLink>
            </HStack>
          </Box>
          <Flex justifyContent="space-between">
            {/* First row */}
            {renderData.slice(0, 2).map((item, index) => (
              <div key={index} style={{ width: "48%" }}> {/* Adjust width as needed */}
                {item}
              </div>
            ))}
          </Flex>
          <Flex justifyContent="space-between">
            {/* Second row */}
            {renderData.slice(2, 4).map((item, index) => (
              <div key={index} style={{ width: "48%" }}> {/* Adjust width as needed */}
                {item}
              </div>
            ))}
          </Flex>
          <Box>
            {renderData[4]}
          </Box>
          <Button
            bgColor="#cbb06a"
            w="50%"
            mt="20px"
            _hover={{ bg: "yellow.500" }}
            onClick={handleSubmit}
          >
            {btnData}
          </Button>
        </CardBody>
        <Box mx={2} />
        <Hide below="lg">
          <CardBody height={"100%"} padding={0}>
            <Image
              src={pic}
              height={"100%"}
              borderRadius={"xl"}
              p={0}
            />
          </CardBody>
        </Hide>
      </Card>
    </Card>
  );
};
