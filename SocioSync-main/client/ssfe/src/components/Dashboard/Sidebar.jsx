import React, { useEffect, useState } from "react";
import { Box, VStack, IconButton } from "@chakra-ui/react";
import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sidebarLinks } from "../../data/sidebar-links";
import { logout } from "../../services/operations/authAPI";
import { updateChat } from "../../services/operations/chatAPI";
import { clearChatSlices } from "../../redux/Slices/chatSlice";
import ConfirmationModal from "../common/ConfirmationModal";
import SidebarLink from "./SidebarLink";
import { socket } from "../../App"

export const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Get necessary states from redux
  const { loginData } = useSelector((state) => state.auth);
  const { messagesToBeUpdated } = useSelector((state) => state.chat);

  // Function to handle save messages and logout
  const handleSaveMessagesAndLogout = async (e) => {
    e.preventDefault();
    const roomNames = [];
    for (const friend of loginData.friends) {
      let room =
        loginData.userName < friend.userName
          ? loginData.userName + friend.userName
          : friend.userName + loginData.userName;
      roomNames.push(room);
    }
    socket.emit("handle_disconnect", { roomNames });

    try {
      if (messagesToBeUpdated && messagesToBeUpdated.length !== 0) {
        await dispatch(updateChat(messagesToBeUpdated));
        console.log("API called for DB update");
      }
    } catch (error) {
      console.error("Error during cleanup:", error);
    }

    // Clear chat slice states
    dispatch(clearChatSlices());

    // Perform logout
    dispatch(logout(navigate));
  };

  return (
    <>
      <Box
        top={"0"}
        borderRadius="md"
        d="flex"
        flexDirection="column"
        height={"100%"}
        minWidth="50px"
        borderRight="1px"
        borderRightColor={"gray.700"}
        backgroundColor="#131313"
      >
        <VStack height={"100%"} justify={"space-between"}>
          <VStack spacing={4}>
            {sidebarLinks.map((link) => (
              <SidebarLink
                key={link.id}
                link={link.path}
                iconName={link.icon}
              />
            ))}
          </VStack>
          <IconButton
            icon={<VscSignOut />}
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: handleSaveMessagesAndLogout,
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            background={"gray.700"}
            fontWeight={"medium"}
            color={"gray.400"}
            mb={2}
          />
        </VStack>
      </Box>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};
