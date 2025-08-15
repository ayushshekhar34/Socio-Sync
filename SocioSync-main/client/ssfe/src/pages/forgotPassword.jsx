import React, { useState } from 'react';
import { Card, CardBody, Text, HStack, Link, Center, Button, Input, Box } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp } from "../services/operations/authAPI.js";
import { setSignupData } from '../redux/Slices/authSlice.js';
import useCustomToast from '../utils/useCustomToast.jsx';

export const ForgotPassword = () => {
  const {signupData} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showToast, updateToast} = useCustomToast();
  const action = "forgotpassword";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSignupData = {
      ...signupData,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    }
    dispatch(setSignupData(newSignupData));
    dispatch(sendOtp(action, formData.email, navigate, showToast, updateToast));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
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
        '&::-webkit-scrollbar': {
          width: "10px",
        },
      }}
    >
      <Card mt={"auto"} mb={"auto"} align={"center"} width={["40%", "65%", "40%", "40%", "30%", "30%"]} mx={"auto"} variant={"filled"} borderRadius={"lg"} bg={"black"} shadow={"md"} p={1}>
        <CardBody shadow="xl" bg="#2d3250" borderRadius="lg" w="100%">
          <Text color="gray.100" fontSize="20px">
            Reset Your Password
          </Text>
          <Text color="gray.400" fontSize="13px">
            Please enter your email address. An OTP will be sent to this address.
          </Text>
          <form onSubmit={handleSubmit}>
            <Text mb={0} mt={3} color="gray.400" fontSize="small">
              Email address <sup>*</sup>
            </Text>
            <Center mt={0}>
              <Input
                type="email"
                placeholder="Email address"
                variant="filled"
                bg="gray.900"
                _hover={{ bg: "gray.900" }}
                focusBorderColor="yellow.600"
                color="gray.300"
                fontSize="medium"
                mt={0}
                mb={3}
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
            </Center>
            <Text mb={0} mt={3} color="gray.400" fontSize="small">
              Password <sup>*</sup>
            </Text>
            <Center mt={0}>
              <Input
                type="password"
                placeholder="Password"
                variant="filled"
                bg="gray.900"
                _hover={{ bg: "gray.900" }}
                focusBorderColor="yellow.600"
                color="gray.300"
                fontSize="medium"
                mt={0}
                mb={3}
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
              />
            </Center>
            <Text mb={0} mt={3} color="gray.400" fontSize="small">
              Confirm Password <sup>*</sup>
            </Text>
            <Center mt={0}>
              <Input
                type="password"
                placeholder="Confirm Password"
                variant="filled"
                bg="gray.900"
                _hover={{ bg: "gray.900" }}
                focusBorderColor="yellow.600"
                color="gray.300"
                fontSize="medium"
                mt={0}
                mb={3}
                value={formData.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                required
              />
            </Center>
            <Center>
              <Button
                type="submit"
                w="100%"
                fontSize="15px"
                bgColor="#cbb06a"
                _hover={{ bg: "yellow.500" }}
              >
                Send OTP
              </Button>
            </Center>
          </form>
          <HStack fontSize="small" justify="space-between" pr={2} pl={2} mt={4}>
            <Link color="gray.400" as={NavLink} to="/login" _hover={{ color: "yellow.400" }}>
              <ArrowBackIcon />
              Return to login
            </Link>
          </HStack>
        </CardBody>
      </Card>
    </Card>
  )
}
