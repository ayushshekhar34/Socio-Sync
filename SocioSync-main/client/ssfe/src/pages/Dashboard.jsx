import { Card, Divider, HStack, VStack, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Nav } from "../components/Dashboard/Nav";
import { Sidebar } from "../components/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../App";
import {
  addMessage,
  addMessagesToBeUpdated,
  clearChatSlices,
  populateHistory,
} from "../redux/Slices/chatSlice";
import { getHistory, updateChat } from "../services/operations/chatAPI";
import { getMedia } from "../services/operations/mediaAPI";
import { setLoginData } from "../redux/Slices/authSlice";
import {
  setExplore,
  setFriends,
  setInvites,
  setRequests,
} from "../redux/Slices/profileSlice";
import { getAllUsers } from "../services/operations/profileAPI";

export const Dashboard = () => {
  // deals with unload of data, updation of chat before exit
  // storing the messages in their respective slices on receiving them
  const { loginData } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.profile);
  const { allMessages } = useSelector((state) => state.chat);
  const { messagesToBeUpdated } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  // dispatch(setExplore(explore));
  // handling the logic when tab closes
  useEffect(() => {
    const roomNames = [];
    for (const friend in loginData.friends) {
      let room =
        loginData.userName < friend.userName
          ? loginData.userName + friend.userName
          : friend.userName + loginData.userName;
      roomNames.push(room);
    }
    socket.emit("handle_disconnect", { roomNames });
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ""; // Some browsers require this
      // Perform database call
      try {
        if (messagesToBeUpdated && messagesToBeUpdated.length !== 0) {
          dispatch(updateChat(messagesToBeUpdated));
          console.log("api called for db call");
        }
        dispatch(clearChatSlices());
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // dispatch(clearChatSlices());
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  });

  // handling received messages
  useEffect(() => {
    const handleReceivedMessages = (messageObj) => {
      console.log("checking for incoming msgs in online-online case");
      messageObj.owner = loginData.userName;
      dispatch(addMessage(messageObj));
      dispatch(addMessagesToBeUpdated(messageObj));
      console.log("message after storing it to allMessages ", messageObj);
    };

    // handling single connection messages
    const handleSingleConnecton = (messageObj) => {
      console.log("checking for incoming msgs in online-offline case");
      dispatch(addMessage(messageObj));
      // adds message to allmessages
      const query = [];
      query.push(messageObj);
      dispatch(updateChat(query));
      console.log(
        "message directly stored to db as only one socket was present."
      );
    };

    const reloadUsers = () => {
      console.log("signal received in frontend");
      dispatch(getAllUsers());
    };

    // Listen for incoming messages when both the users are online
    socket.on("receive_private_message", handleReceivedMessages);

    // Listen for the event when only one user is online
    socket.on("user_is_alone", handleSingleConnecton);

    // listen for the event whenever a user is added as friend
    socket.on("add_new_friend", reloadUsers);

    return () => {
      //  when component unmounts
      socket.off("receive_private_message", handleReceivedMessages);
      socket.off("user_is_alone", handleSingleConnecton);
      socket.off("add_new_friend", reloadUsers);
    };
  }, [dispatch]);

  // extracting history of chats from chat
  useEffect(() => {
    dispatch(getHistory(loginData.userName));
    dispatch(getMedia(loginData.userName));
    // dispatch(populateHistory());
  }, [dispatch]);

  return (
    <Card
      width={"100%"}
      height={"100vh"}
      bg={"#131313"}
      borderRadius={"0"}
      overflow={"auto"}
      pb={"10px"}
      css={{
        "&::-webkit-scrollbar": {
          width: "5px",
        },
      }}
      color={"gray.200"}
    >
      <HStack bg={"inherit"} h={"100%"} w={"100%"} p={0}>
        {/* sidebar */}
        <Sidebar />
        <Box
          w="100%"
          h={"100%"}
          borderRadius="lg"
          overflow={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          <Outlet />
        </Box>
        {/* </HStack> */}
      </HStack>
    </Card>
  );
};
