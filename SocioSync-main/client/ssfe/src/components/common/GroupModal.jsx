import { Box, Button, Text } from '@chakra-ui/react';
import IconBtn from "./IconBtn";

export default function groupModal({modalData}) {
    // accepts an array of friends
    console.log("modal data is",modalData)
  return (
    <Box
      pos="fixed"
      inset="0"
      zIndex="1000"
      mt="0"
      display="grid"
      placeItems="center"
      overflow="auto"
      bgColor="rgba(255, 255, 255, 0.1)"
      backdropFilter="blur(4px)"
    >
      <Box
        w="11/12"
        maxW="350px"
        rounded="lg"
        borderWidth="1px"
        borderColor="richblack.400"
        bgColor="richblack.800"
        p={6}
      >
        <Text fontSize="2xl" fontWeight="semibold" color="richblack.5">
          {modalData?.text1}
        </Text>
        <Text mt={3} mb={5} lineHeight="6" color="richblack.200">
          {modalData?.text2}
        </Text>
        <Box display="flex" alignItems="center" gap={4}>
          <IconBtn onClick={modalData?.btn1Handler} text={modalData?.btn1Text} />
          <Button
            cursor="pointer"
            rounded="md"
            bgColor="richblack.200"
            py="8px"
            px="20px"
            fontWeight="semibold"
            color="richblack.900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
