import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../services/operations/ProfileSettingsAPI";
import IconBtn from "../../common/IconBtn";
import useCustomToast from "../../../utils/useCustomToast";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  HStack,
  VStack,
  Radio,
  RadioGroup,
  Stack
} from "@chakra-ui/react";
const genders = ["Male", "Female", "Other"];
function formatDate(date) {
  if (!date || isNaN(new Date(date))) {
    return "Invalid Date";
  }
  const year = new Date(date).getFullYear();
  const month = String(new Date(date).getMonth() + 1).padStart(2, "0");
  const day = String(new Date(date).getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
export default function EditProfile() {
  const { loginData } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const { showToast, updateToast } = useCustomToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logindataString = localStorage.getItem("logindata");
  const logindata = JSON.parse(logindataString);
  const dobString = logindata?.profile?.dateOfBirth || "";
  const dob = new Date(dobString);
  const finaldob = formatDate(dob);
  const [formData, setFormData] = useState({
    name: logindata?.name || "",
    dateOfBirth: finaldob,
    gender: logindata?.profile?.gender || "",
    contactNumber: logindata?.profile?.contactNumber || "",
    about: logindata?.profile?.about || "",
  });
  // console.log("dob is",formData.dateOfBirth);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeGender = (value) => {
    setFormData({
      ...formData,
      gender: value,
    });
  };

  const submitProfileForm = async (e) => {
    // const dispatch = useDispatch();
    e.preventDefault();
    try {
        console.log("the data from frontend is ",formData);
        dispatch(updateProfile(token, formData, showToast, updateToast));
        console.log("ho gya bro")
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message);
    }
  };


  return (
        <Box
        bg="gray.800"
        mx={"auto"}
        rounded="md"
        borderWidth="1px"
        borderColor="richblack.700"
        width={"100%"}
        maxW={"700px"}
        p={"4"}
        >
        <form onSubmit={submitProfileForm}>
        <HStack 
        justify={"space-between"}
        >
        <VStack
        height={"100%"}
        >
        <FormControl
          p={1}
          px={8}
          isRequired
        >
          <FormLabel htmlFor="name" color={"whitesmoke"}>
            Name
          </FormLabel>
          <Input
            color={"white"}
            type="text"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
            name="name"
          />
          {!formData.name && (
            <Text mt={1} fontSize="12px" color="yellow.100">
              Please enter your name.
            </Text>
          )}
        </FormControl>

        <FormControl
          p={1}
          px={8}
          isRequired
        >
          <FormLabel htmlFor="dateOfBirth" color={"whitesmoke"}>
            Date of Birth
          </FormLabel>
          <Input
            color={"white"}
            type="date"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            name="dateOfBirth"
          />
          {formData.dateOfBirth === "" && (
            <Text mt={1} fontSize="12px" color="yellow.100">
              PLease Enter a valid date of birth
            </Text>
          )}
        </FormControl>

        <FormControl
        p={1}
        px={8}
        isRequired
        >
      <FormLabel htmlFor="gender" color={"whitesmoke"}>
        Gender
      </FormLabel>
        <RadioGroup id="gender" value={formData.gender} onChange={handleChangeGender}
        color={"white"} >
            <Stack spacing={5} direction='row'>
            {genders.map((gender, index) => (
            <Radio key={index} value={gender}
            colorScheme='yellow'>
                <Text fontSize={"xs"}>{gender}</Text>
            </Radio>
            ))}
            </Stack>
        </RadioGroup>
        {formData.gender === "" && (
            <Text mt={1} fontSize="12px" color="yellow.100">
            Please select a gender.
            </Text>
        )}
      {/* </Box> */}
    </FormControl>
    </VStack>

        <VStack
        height={"100%"}
       >
        <FormControl
          p={2}
          px={8}
          isRequired
        >
          <FormLabel htmlFor="contactNumber" color={"whitesmoke"}>
            Contact Number
          </FormLabel>
          <Input
            color={"white"}
            type="tel"
            id="contactNumber"
            placeholder="Enter contact number"
            value={formData.contactNumber}
            onChange={handleChange}
            name="contactNumber"
          />
          {(formData.contactNumber.length != 10) && (
            <Text mt={1} fontSize="12px" color="yellow.100">
             Enter correct phone number
            </Text>
          )}
        </FormControl>

        <FormControl
        //   mt={10}
        //   rounded="md"
        //   borderWidth="1px"
        //   borderColor="richblack.700"
        //   bg="richblack.800"
          p={2}
          px={8}
        >
          <FormLabel htmlFor="about" color={"whitesmoke"}>
            About
          </FormLabel>
          <Input
            color={"white"}
            type="text"
            id="about"
            placeholder="Enter bio details"
            value={formData.about}
            onChange={handleChange}
            name="about"
          />
          {!formData.about && (
            <Text mt={1} fontSize="12px" color="yellow.100">
              Please enter something about yourself.
            </Text>
          )}
        </FormControl>
        <div>
          <Button
            onClick={() => {
              navigate("/dashboard/myprofile");
            }}
            variant="outline"
            rounded="md"
            bg="richblack.700"
            color="richblack.50"
            py={2}
            px={5}
            fontWeight="semibold"
            cursor="pointer"
            mt={4}
            mr={2}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="solid"
            rounded="md"
            bg="yellow.400"
            _hover={"yellow.700"}
            colorScheme="gray"
            py={2}
            px={5}
            fontWeight="semibold"
            cursor="pointer"
            mt={4}
          >
            Save
          </Button>
        </div>
        </VStack>
        </HStack>
        </form>
        </Box>
  );
}