import { FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Box, Button, Flex, Text } from "@chakra-ui/react"


export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try {
      dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <Flex my={3} flexDirection="row" gap={5} rounded="md" borderWidth="1px" borderColor="pink.700" bg="pink.900" p={4} px={12} 
    mx={"auto"}
    maxW={"700px"}
    width={"100%"}
    >
      <Flex alignItems="center" justifyContent="center" rounded="full" bg="pink.700" h="14" w="14">
        <FiTrash2 className="text-3xl text-pink-200" />
      </Flex>
      <Flex flexDir="column" spacing={2}>
        <Text as="h2" fontSize="lg" fontWeight="semibold" color="richblack.5">
          Delete Account
        </Text>
        <Box w="3/5" color="pink.25">
          <view>
          <Text>Would you like to delete account? {'\n\n'}</Text>
          <Text>
            All the details associated with this including
            profile, friends, photos, videos and other media will
            be deleted permanently and will be non-recoverable.
          </Text>
          </view>
        </Box>
        <Button
          type="button"
          variant="link"
          color="pink.300"
          onClick={handleDeleteAccount}
          cursor="pointer"
          fontStyle="italic"
        >
          I want to delete my account.
        </Button>
      </Flex>
    </Flex>
  )
}
