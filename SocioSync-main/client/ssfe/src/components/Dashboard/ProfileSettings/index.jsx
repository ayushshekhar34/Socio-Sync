import { VStack, Heading, Box, Flex } from "@chakra-ui/react";
import ChangeProfilePicture from "./ChangeProfilePicture";
import EditProfile from "./EditProfile";
import DeleteAccount from "./DeleteAccount";
import UpdatePassword from "./UpdatePassword";
export default function ProfileSettings() {
  return (
    <Flex
      direction="column"
      height="100%"
      justify="center"
      align="center"
      bg="richblack.800"
      color="white"
      overflow={"auto"}
      css={{
        '&::-webkit-scrollbar': {
          width: "10px",
        },
      }}
    >
      <VStack spacing={6} align="start" width="100%" h={"100%"} p={8} >
        <Heading fontSize="3xl" fontWeight="medium">
          Edit Profile
        </Heading>
        <ChangeProfilePicture />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </VStack>
    </Flex>
  );
}