import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../../services/operations/ProfileSettingsAPI";
import IconBtn from "../../common/IconBtn";
import useCustomToast from "../../../utils/useCustomToast";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Heading,
  Flex
} from "@chakra-ui/react";

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const{showToast, updateToast} = useCustomToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const submitPasswordForm = async (data) => {
    console.log("og data", data);
    try {
      await changePassword(token, data, showToast, updateToast);
      reset();
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };

  return (
    <Box 
    mx="auto"
    width={"100%"}
    maxW={"700px"}
    p={"8"}
    rounded="md"
    borderWidth="1px"
    borderColor="richblack.700"
    bg="gray.800"
    >
      <form onSubmit={handleSubmit(submitPasswordForm)}>
        <Box
          bg="gray.800"
          borderColor="gray.700"
        >
          <Heading as="h2" fontSize="lg" fontWeight="semibold" mb={6}>
           Update Password
          </Heading>
          <Flex gap={5}>
            <FormControl
              isInvalid={errors.oldPassword}
            >
              <FormLabel htmlFor="oldPassword">Current Password</FormLabel>
              <Input
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="Enter Current Password"
                {...register("oldPassword", { required: true })}
              />
              <FormErrorMessage>
                {errors.oldPassword && "Please enter your Current Password."}
              </FormErrorMessage>
              <Box
                position="absolute"
                right="3"
                top="38px"
                zIndex="10"
                cursor="pointer"
                onClick={() => setShowOldPassword((prev) => !prev)}
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </Box>
            </FormControl>
            <FormControl
            //   flex="48%"
              mb={4}
              isInvalid={errors.newPassword}
            >
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                {...register("newPassword", { required: true })}
              />
              <FormErrorMessage>
                {errors.newPassword && "Please enter your New Password."}
              </FormErrorMessage>
              <Box
                position="absolute"
                right="3"
                top="38px"
                zIndex="10"
                cursor="pointer"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </Box>
            </FormControl>
          </Flex>
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              mr={2}
              onClick={() => {
                navigate("/dashboard/myprofile");
              }}
              colorScheme="gray"
            >
              Cancel
            </Button>
            <IconBtn type="submit" text="Update" />
          </Box>
        </Box>
      </form>
    </Box>
  );
}
