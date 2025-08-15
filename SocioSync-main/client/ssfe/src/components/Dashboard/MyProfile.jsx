import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Image, Text, VStack, HStack } from "@chakra-ui/react";
import IconBtn from "../common/IconBtn";
import { formattedDate } from "../../utils/dateFormatter";
export default function MyProfile() {
  const { loginData } = useSelector((state) => state.auth);
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const user = loginData;

  return (
    <>
      <Box
      h={"100%"}
      css={{
        '&::-webkit-scrollbar': {
          width: "1px",
        },
      }}
      overflow={"auto"}
      >
      <Text mb={8} mt={8} fontSize="3xl" fontWeight="medium" color="white">
        My Profile
      </Text>
      <Flex
        align="center"
        justifyContent="space-between"
        rounded="md"
        borderWidth="1px"
        borderColor="white"
        mx={"auto"}
        bg="gray.800"
        p={8}
        px={8}
        width={"70%"}
      >
        <HStack spacing={4}>
          <Image
            src={user.profilePic ? user.profilePic : `https://api.dicebear.com/5.x/initials/svg?seed=${loginData.name}`}
            alt={`profile-${loginData?.name}`}
            boxSize="78px"
            rounded="full"
            objectFit="cover"
          />
          <VStack align="start" spacing={1}>
            <Text fontSize="lg" fontWeight="semibold" color="white">
              {user?.name}
            </Text>
            <Text fontSize="sm" color="gray.300">
              {user?.email}
            </Text>
          </VStack>
        </HStack>
        <IconBtn
          text="Edit"
          onClick={() => {
            console.log("token is", token);
            navigate("/dashboard/profilesettings");
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
      </Flex>
      <Box my={10}
        bg="gray.800"
        rounded="md"
        borderWidth="1px"
        borderColor="white"
        width={"70%"}
        mx={"auto"}
        >
      <VStack>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          bg="gray.800"
          py={8}
          width={"80%"}
        >
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Personal Details
          </Text>
          <IconBtn
            text="Edit"
            onClick={() => {
              navigate("/dashboard/profilesettings");
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </Flex>

            <Flex
            mt={2}
            justify="space-between"
            p={2}
            // px={4}
            // mx={"auto"}
            width={"80%"}
            >
            <VStack align="flex-start">
                {/* <Box> */}
                <Text fontSize="sm" color="gray.600">
                    Name
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white" mb={5}>
                    {user?.name}
                </Text>
                {/* </Box> */}
                {/* <Box> */}
                <Text fontSize="sm" color="gray.600">
                    Email
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white" mb={5}>
                  {user?.email ? user.email : "N/A"}
                </Text>
                {/* </Box> */}
                {/* <Box> */}
                <Text fontSize="sm" color="gray.600">
                    Gender
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white" mb={5}>
                {user?.profile?.gender ? user.profile.gender : "N/A"}
                </Text>
                {/* </Box> */}
            </VStack>
            <VStack align="flex-start">
                {/* <Box> */}
                <Text fontSize="sm" color="gray.600">
                    Username
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white" mb ={5}>
                {user?.userName ? user.userName : "N/A"}
                </Text>
                {/* </Box> */}
                {/* <Box> */}
                <Text fontSize="sm" color="gray.600">
                    Phone Number
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white" mb ={5}>
                {user?.profile?.contactNumber ? user.profile.contactNumber : "N/A"}
                </Text>
                {/* </Box> */}
                {/* <Box> */}
                <Text fontSize="sm" color="gray.600">
                    Date of Birth
                </Text>
                <Text fontSize="sm" fontWeight="medium" color="white" mb ={5}>
                    {formattedDate(user?.profile?.dateOfBirth) ||
                    "Add Date Of Birth"}
                </Text>
                {/* </Box> */}
            </VStack>
            </Flex>
      </VStack>
      </Box>
      </Box>
      
    </>
  );
}
