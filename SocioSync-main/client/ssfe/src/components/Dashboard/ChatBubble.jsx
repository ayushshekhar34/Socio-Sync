/* eslint-disable react/prop-types */
import {
  Card,
  VStack,
  Text,
  HStack,
  Box,
  Image,
  Center,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
// import PDFReader from "../PDFReader";
import { FaFilePdf } from "react-icons/fa6";

export const ChatBubble = (props) => {
  const {
    sender,
    message,
    time = "No time provided",
    file = null,
    mediaType = "Text",
  } = props;
  const { loginData } = useSelector((state) => state.auth);

  const getTimeString = (time) => {
    const date = new Date(time);
    const currentTime = new Date();
    const timeDiff = currentTime - date;
    const diffInHours = timeDiff / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    } else {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
  };
  const formatDate = getTimeString(time);

  const renderData = file ? (
    mediaType === "Photos" ? (
      <Box mr={0} ml={0}>
        <Center>
          <Image src={file} p={2} h={"auto"} w={"100%"} mr={0} ml={0} />
        </Center>
      </Box>
    ) : mediaType === "Videos" ? (
      <>
        <Box p={2} mr={0} ml={0}>
          <Center>
            <video src={file} height={"350px"} width={"100%"} controls />
          </Center>
        </Box>
      </>
    ) : (
      <Box p={2} bg={"transparent"} w={"fit-content"}>
        <audio src={file} controls style={{ maxWidth: "100%" }} />
      </Box>
    )
  ) : (
    <></>
  );
  // "linear(to-br, #ff965d , #fe4057 )"
  //         : "linear(to-br, #fe9c5d , #8725c5 )"
  const user = loginData.userName;
  return (
    <Card
      key={time}
      bg={mediaType === "Audio" ? "gray.600" : "purple.500"}
      bgGradient={
        mediaType === "Audio"
          ? ""
          : sender !== user
          ? "purple.400"
          : "purple.600"
      }
      mt={"2px"}
      mb={"4px"}
      w={"fit-content"}
      minW={"140px"}
      h={"auto"}
      maxW={"50%"}
      ml={sender === user ? "auto" : "25%"}
      left={sender === user ? "" : sender === user ? "25%" : "-25%"}
    >
      <VStack align={"flex-start"} gap={0}>
        <Text
          color={sender !== user ? "pink.100" : "gray.100"}
          fontSize={"sm"}
          pl={1}
          pr={2}
          mb={0}
        >
          {sender === user ? "You" : sender}
        </Text>
        {renderData}
        <Text color={"gray.200"} pl={1} pr={2} w={"fit-content"}>
          {message}
        </Text>
        <Text
          color={"gray.300"}
          fontSize={"x-small"}
          w={"100%"}
          align={"right"}
          pr={2}
        >
          {formatDate}
        </Text>
      </VStack>
    </Card>
  );
};
