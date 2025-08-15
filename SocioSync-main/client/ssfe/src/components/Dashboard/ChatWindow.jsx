import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { ChatBubble } from "../Dashboard/ChatBubble";
import { useSelector } from "react-redux";
import { Socket, io } from "socket.io-client";
import bg2 from "../../assets/bg2.jpg";
import bg1 from "../../assets/bg1.jpg";
import chatbg from "../../assets/chatbg.jpg";
import bg3 from "../../assets/bg3.webp";
import bg4 from "../../assets/bg4.jpg";
import bg5 from "../../assets/bg5.jpg";
import bg6 from "../../assets/bg6.jpg";


export const ChatWindow = () => {
  const { history } = useSelector((state) => state.chat);

  const { allMessages } = useSelector((state) => state.chat);

  // saare messages ko state se nikala aur fir usme se user ko nikal kar uske username ko sender set kar diya
  const { loginData } = useSelector((state) => state.auth);
  const sender = loginData.userName;

  // setting the current receiver
  const { currentRoom } = useSelector((state) => state.online);
  const receiver = currentRoom.userName;
  var roomName = sender < receiver ? sender + receiver : receiver + sender;

  // filtering the history
  const [filteredHistory, setFilteredHistory] = useState(
    history && history.length !== 0
      ? history.filter(
          (msg) =>
            (msg.receiver === receiver &&
              msg.sender === sender &&
              msg.owner === sender) ||
            msg.owner === roomName ||
            (msg.receiver === sender &&
              msg.sender === receiver &&
              msg.owner === sender) ||
            msg.owner === roomName
        )
      : null
  );

  useEffect(() => {
    const filtered =
      history && history.length !== 0
        ? history.filter(
            (msg) =>
              (msg.receiver === receiver &&
                msg.sender === sender &&
                msg.owner === sender) ||
              msg.owner === roomName ||
              (msg.receiver === sender &&
                msg.sender === receiver &&
                msg.owner === sender) ||
              msg.owner === roomName
          )
        : null;

    filtered && filtered.sort((a, b) => a.time - b.time);
    console.log("filtered history is ", filtered);
    setFilteredHistory(filtered);
  }, [sender, receiver, currentRoom]);

  // setting current messages
  const [messages, setMessages] = useState(
    allMessages.filter(
      (msg) => msg.sender === sender && msg.receiver === receiver
    )
  );

  useEffect(() => {
    setMessages(
      allMessages.filter(
        (msg) =>
          (msg.sender === sender && msg.receiver === receiver) ||
          (msg.sender === receiver && msg.receiver === sender)
      )
    );
  }, [allMessages, sender, receiver, currentRoom]);

  const renderHistory =
    filteredHistory !== null && filteredHistory.length !== 0
      ? filteredHistory.map((item) =>
          item ? (
            <ChatBubble
              key={item.time}
              sender={item.sender}
              message={item.message ? item.message : null}
              time={item.time}
              mediaType={item.MediaType}
              file={item.media ? item.media : null}
            />
          ) : null
        )
      : null;

  const renderMessages =
    messages !== null || messages.length !== 0
      ? messages.map((item) =>
          item ? (
            <ChatBubble
              key={item.time}
              sender={item.sender}
              message={item.message ? item.message : null}
              time={item.time}
              mediaType={item.MediaType}
              file={item.media ? item.media : null}
            />
          ) : null
        )
      : null;

  const scrollableDivRef = useRef(null);

  useEffect(() => {
    scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight;
  }, []);

  return (
    <Box
      ref={scrollableDivRef}
      h={"95%"}
      p={2}
      overflowY={"auto"}
      w={"100%"}
      bgImage={bg6}
      bgSize={"25%"}
      css={{
        "&::-webkit-scrollbar": {
          width: "10px",
        },
      }}
    >
      {renderHistory}
      {renderMessages}
    </Box>
  );
};
