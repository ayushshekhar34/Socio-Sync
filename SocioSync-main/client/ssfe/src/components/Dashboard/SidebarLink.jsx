/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { NavLink, redirect, useLocation } from "react-router-dom";
import { BiSolidMessageRoundedDetail } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { BiPhotoAlbum } from "react-icons/bi";
import { IoMdCreate } from "react-icons/io";

export default function SidebarLink({ link, iconName }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const isActive = location.pathname === link;
  // console.log(iconName);
  //   const borderColor = useColorModeValue('gray.200', 'gray.700');
  const bgColor = isActive ? "purple.500" : "transparent";
  const textColor = isActive ? "gray.200" : "gray.300";
  const icon =
    iconName === "BiSolidMessageRoundedDetail"
      ? BiSolidMessageRoundedDetail
      : iconName === "MdAccountCircle"
      ? MdAccountCircle
      : iconName === "FaUserFriends"
      ? FaUserFriends
      : iconName === "BiPhotoAlbum"
      ? BiPhotoAlbum
      : iconName === "IoMdCreate"
      ? IoMdCreate
      : null;
  //   console.log("the name is", iconName)
  return (
    <NavLink to={link}>
      <Button
        left={0}
        top={15}
        h="full"
        w="3px"
        bg="inherit"
        size={"sm"}
        color={"gray.300"}
        bgColor={bgColor}
        textColor={textColor}
        _hover={{ bg: "purple.900" }}
        p={1}
      >
        <Flex align="center" gap={2}>
          {/* Icon Goes Here */}
          <Icon as={icon} boxSize={6} />
        </Flex>
      </Button>
    </NavLink>
  );
}
