import React, { useEffect } from "react";
import { Avatar, Box, Card, HStack, Text, VStack } from "@chakra-ui/react";
import { HamburgerIcon, PhoneIcon, Search2Icon } from "@chakra-ui/icons";
import { MediaDrawer } from "./MediaDrawer";
import { useSelector, useDispatch } from "react-redux";
import { setRoom } from "../../redux/Slices/onlineSlice";
import { socket } from "../../App";
export const Nav = () => {
  const { currentRoom } = useSelector((state) => state.online);
  const { loginData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const img = currentRoom.imgurl
    ? currentRoom.imgurl
    : `https://api.dicebear.com/5.x/initials/svg?seed=${currentRoom.name}`;

  // handling the logic when a user is typing...
  // useEffect(() => {
  //   const sender = loginData.userName;
  //   const receiver = currentRoom.userName;
  //   const roomName = sender < receiver ? sender + receiver : receiver + sender;

  //   const handleTypingState = (data) => {
  //     if (data !== roomName) return;
  //     dispatch(
  //       setRoom({
  //         userName: currentRoom.userName,
  //         name: currentRoom.name,
  //         isTyping: true,
  //         imgurl: currentRoom.imgurl,
  //       })
  //     );
  //   };

  //   const handleNotTypingState = (data) => {
  //     if (data !== roomName) return;
  //     dispatch(
  //       setRoom({
  //         userName: currentRoom.userName,
  //         name: currentRoom.name,
  //         isTyping: false,
  //         imgurl: currentRoom.imgurl,
  //       })
  //     );
  //   };

  //   socket.on("user_is_typing", handleTypingState);
  //   socket.on("user_is_not_typing", handleNotTypingState);

  //   return () => {
  //     //  when component unmounts
  //     socket.off("user_is_typing", handleTypingState);
  //     socket.off("user_is_typing", handleNotTypingState);
  //   };
  // }, [dispatch]);

  return (
    <Card
      bg={"inherit"}
      direction={"row"}
      w={"100%"}
      justify={"space-between"}
      pr={4}
      borderRadius={0}
      shadow={0}
      mt={2}
    >
      <Card bg={"inherit"} color={"#b7b8bc"} shadow={0} h={"100%"}>
        <HStack ml={2}>
          <Avatar size={"md"} src={img} />
          <VStack align={"left"} ml={2} gap={0}>
            <Text>{currentRoom.name}</Text>
            {!currentRoom.isTyping && (
              <Text fontSize={"smaller"}>{currentRoom.userName}</Text>
            )}
            {currentRoom.isTyping && (
              <Text fontSize={"smaller"}>typing...</Text>
            )}
          </VStack>
        </HStack>
      </Card>
      <Card bg={"inherit"} borderRadius={0} shadow={0}>
        <HStack gap={6}>
          <Search2Icon color={"#b7b8bc"} />
          <PhoneIcon color={"#b7b8bc"} />
          {/* <HamburgerIcon color={"#b7b8bc"}/> */}
          <MediaDrawer />
        </HStack>
      </Card>
    </Card>
  );
};
