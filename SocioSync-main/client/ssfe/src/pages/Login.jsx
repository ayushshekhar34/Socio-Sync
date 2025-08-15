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
} from "@chakra-ui/react";
import pic from "../assets/People1.png";
import { Logo } from "../components/Logo.jsx";
import React, { useEffect, useState } from "react";
import InputField from "../components/InputField.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/operations/authAPI.js";
import { getAllUsers } from "../services/operations/profileAPI.js";
import {
  setLoading,
  setLoginData,
  setToken,
} from "../redux/Slices/authSlice.js";
import { setRoom } from "../redux/Slices/onlineSlice.js";
import { getMedia } from "../services/operations/mediaAPI.js";
import useCustomToast from "../utils/useCustomToast.jsx";

export const Login = () => {
  const { showToast, updateToast } = useCustomToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LoginData = [
    {
      id: "email",
      l: "Email",
      f: "Enter your Email Address",
      p: false,
      v: formData.email,
    },
    {
      id: "password",
      l: "Password",
      f: "Enter your Password",
      p: true,
      v: formData.password,
    },
  ];

  const renderData = LoginData.map((item) => (
    <InputField
      key={item.id}
      label={item.l}
      field={item.f}
      password={item.p}
      value={item.v}
      onChange={(value) => handleFieldChange(item.id, value)}
    />
  ));

  const handleFieldChange = (fieldName, fieldValue) => {
    setFormData({
      ...formData,
      [fieldName]: fieldValue,
    });
  };

  const LinkData = "SignUp";
  const btnData = "Login";
  const topData = "Don't Have an account";

  const handleSubmit = async () => {
    dispatch(setLoading(true));

    try {
      // Dispatch login action
      await dispatch(login(formData, navigate, showToast, updateToast));

      // Check if loginData is null (indicating login failure)
      // if (loginData === null || token === null ) {
      //   toast({
      //     title: 'Login Failed.',
      //     description: 'An error occurred during login.',
      //     status: 'error',
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // }

      // If login is successful, show success toast
      if (token !== null) {
        toast({
          title: "Logged in Successfully.",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        dispatch(setRoom(null));
      }
      dispatch(getAllUsers());
    } catch (error) {
      // If an error occurs during login, show failure toast
      toast({
        title: "Login Failed.",
        description: error.message || "An error occurred during login.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      dispatch(setLoading(false));
      // if(token === null)
      // {
      //   toast({
      //     title: 'Login Failed.',
      //     description: error.message || 'An error occurred during login.',
      //     status: 'error',
      //     duration: 3000,
      //     isClosable: true,
      //   });
      // }
    }
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
        width={"60%"}
        mx={"auto"}
        variant={"filled"}
        borderRadius={"lg"}
        bg={"black"}
        shadow={"md"}
        p={4}
      >
        <CardBody shadow={"xl"} bg={"#2d3250"} borderRadius={"xl"}>
          <Box>
            <Logo ht={130} wt={470} />
            <Text fontSize={"20px"} color={"gray.200"}>
              {btnData}
            </Text>
            <HStack>
              <Text color={"gray.500"}>{topData}</Text>
              <NavLink to={"/signup"}>
                <Text color={"yellow.500"}>{LinkData}?</Text>
              </NavLink>
            </HStack>
          </Box>
          {renderData}
          <NavLink to={"/forgotpassword"}>
            <Text fontSize="xs" color={"yellow.500"}>Forgot Password ?</Text>
          </NavLink>
          <Button
            bgColor={"#cbb06a"}
            w={"50%"}
            mt={"20px"}
            _hover={{ bg: "yellow.500" }}
            onClick={handleSubmit}
          >
            {btnData}
          </Button>
        </CardBody>
        <Box mx={2} /> {/* Adjust the margin as needed */}
        <Hide below="lg">
          <CardBody height={"100%"} padding={0}>
            <Image
              src={pic}
              height={"100%"}
              borderTopRightRadius={"lg"}
              borderBottomRightRadius={"lg"}
              borderRadius={"xl"}
              p={0}
            />
          </CardBody>
        </Hide>
      </Card>
    </Card>
  );
};
