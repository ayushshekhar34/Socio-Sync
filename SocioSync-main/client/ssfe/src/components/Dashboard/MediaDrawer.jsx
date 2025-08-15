import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Box,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  HStack,
  Divider,
  Image,
  Grid,
  GridItem,
  VStack,
  Card,
  Icon,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TabIndicator,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

import { BsFiletypePdf } from "react-icons/bs";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const MediaDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = React.useRef();
  const { loginData } = useSelector((state) => state.auth);
  const { allMedia } = useSelector((state) => state.chat);
  const { currentRoom } = useSelector((state) => state.online);
  const dispatch = useDispatch();

  // Handling Logic for Photos & Videos

  const sender = loginData.userName;
  const receiver = currentRoom.userName;
  console.log("allMedia in media drawer is ", allMedia[0]);
  const imgs = allMedia[0]
    ? allMedia[0].filter(
        (file) =>
          file.mediaType === "Photos" &&
          ((file.sender === sender && file.receiver === receiver) ||
            (file.receiver === sender && file.sender === receiver))
      )
    : null;
  const videos = allMedia[0]
    ? allMedia[0].filter(
        (file) =>
          file.mediaType === "Videos" &&
          ((file.sender === sender && file.receiver === receiver) ||
            (file.receiver === sender && file.sender === receiver))
      )
    : null;
  const audio = allMedia[0]
    ? allMedia[0].filter(
        (file) =>
          file.mediaType === "Audio" &&
          ((file.sender === sender && file.receiver === receiver) ||
            (file.receiver === sender && file.sender === receiver))
      )
    : null;
  const [showAllPics, setShowAllPics] = useState(true);
  const [showAllVids, setShowAllVids] = useState(false);
  const [showAllAudio, setShowAllAudio] = useState(false);
  const [preview, setPreview] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleModalPreview = (e) => {
    setPreview(e.target.key);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setPreview(null);
  };

  var limitedPicsSize = 3;
  if (imgs.length <= 3) {
    limitedPicsSize = imgs.length;
  }

  var limitedVidSize = 1;
  if (videos.length <= 1) {
    limitedVidSize = videos.length;
  }

  var limitedAudSize = 1;
  if (audio.length <= 1) {
    limitedAudSize = audio.length;
  }

  const limitedPics = imgs.slice(0, limitedPicsSize);
  const limitedVid = videos.slice(0, limitedVidSize);
  const limitedAud = audio.slice(0, limitedAudSize);

  const displayPics =
    // showAllPics === false
    //   ? limitedPics.map((item) => (
    //       <GridItem key={item.FileUrl} gap={5} w={"100%"}>
    //         <Image src={item.FileUrl} h={"100px"} borderRadius={"xl"} p={1} />
    //       </GridItem>
    //     ))
    //   :
    imgs.map((item) => (
      <GridItem
        key={item.FileUrl}
        gap={5}
        w={"100%"}
        _hover={{ cursor: "pointer" }}
        onClick={() => {
          setPreview(item.FileUrl);
          setOpenModal(true);
        }}
      >
        <Image src={item.FileUrl} h={"100px"} borderRadius={"xl"} p={1} />
      </GridItem>
    ));

  const displayVideos =
    // showAllVids === false
    //   ? limitedVid.map((item) => (
    //       <GridItem key={item.FileUrl} gap={5} w={"100%"} padding={2}>
    //         <video src={item.FileUrl} height={"150px"} controls />
    //       </GridItem>
    //     ))
    //   :
    videos.map((item) => (
      <GridItem key={item.FileUrl} gap={5} w={"100%"}>
        <video src={item.FileUrl} height={"150px"} controls />
      </GridItem>
    ));

  const displayAudio =
    // showAllAudio === false
    //   ? limitedAud.map((item) => (
    //       <GridItem w={"fit-content"} key={item.FileUrl}>
    //         <audio src={item.FileUrl} controls style={{ maxWidth: "100%" }} />
    //       </GridItem>
    //     ))
    //   :
    audio.map((item) => (
      <GridItem key={item.FileUrl}>
        <audio src={item.FileUrl} controls style={{ maxWidth: "100%" }} />
      </GridItem>
    ));

  // const picTxt = showAllPics === false ? "see all" : "hide";
  // const visTxt = showAllVids === false ? "see all" : "hide";
  // const audTxt = showAllAudio === false ? "see all" : "hide";
  const handlePicClick = () => {
    setShowAllAudio(false);
    setShowAllVids(false);
    setShowAllPics(true);
  };

  const handleVidClick = () => {
    setShowAllAudio(false);
    setShowAllVids(true);
    setShowAllPics(false);
  };

  const handleAudioClick = () => {
    setShowAllAudio(true);
    setShowAllVids(false);
    setShowAllPics(false);
  };

  // Handling Logic for Sahred Files (Basically png files)
  return (
    <>
      <Modal isOpen={openModal} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent bg={"gray.700"} color={"gray.300"}>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"400px"} borderRadius={"md"}>
              <Image
                src={preview}
                h={"inherit"}
                w={"auto"}
                borderRadius={"medium"}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <IconButton
        icon={<HamburgerIcon />}
        ref={btnRef}
        onClick={onOpen}
        bg={"inherit"}
        size={"md"}
        color={"gray.300"}
        _hover={{ bg: "gray.600" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme="gray"
      >
        <DrawerOverlay />
        <DrawerContent
          bg={"gray.700"}
          color={useColorModeValue("black", "white")}
          textColor={"gray.300"}
        >
          <DrawerCloseButton />
          <DrawerHeader>Chat Details</DrawerHeader>
          <DrawerBody
            css={{
              "&::-webkit-scrollbar": {
                width: "10px",
              },
            }}
          >
            <Tabs position="relative" variant="unstyled" mb={4}>
              <TabList>
                <Tab onClick={handlePicClick}>Photos</Tab>
                <Tab onClick={handleVidClick}>Videos</Tab>
                <Tab onClick={handleAudioClick}>Audio</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="blue.500"
                borderRadius="1px"
              />
            </Tabs>
            {showAllPics && (
              <Box mb={4}>
                {/* <HStack justify={"space-between"}>
                <HStack>
                  <Text fontSize={"md"}>Photos</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    {imgs.length}
                  </Text>
                </HStack>
                {imgs.length > 3 && (
                  <Text
                    fontSize={"sm"}
                    color={"gray.400"}
                    _hover={{ cursor: "pointer" }}
                    onClick={handlePicClick}
                  >
                    {picTxt}
                  </Text>
                )}
              </HStack> */}
                <Grid templateColumns="repeat(3, 1fr)">{displayPics}</Grid>
              </Box>
            )}
            {/* <Divider /> */}
            {showAllVids && (
              <Box mb={4}>
                {/* <HStack justify={"space-between"} mb={3}>
                <HStack>
                  <Text fontSize={"md"}>Videos</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    {videos.length}
                  </Text>
                </HStack>
                {videos.length > 1 && (
                  <Text
                    fontSize={"sm"}
                    color={"gray.400"}
                    _hover={{ cursor: "pointer" }}
                    onClick={handleVidClick}
                  >
                    {visTxt}
                  </Text>
                )}
              </HStack> */}
                <Grid templateColumns="repeat(1, 1fr)" mt={2}>
                  {displayVideos}
                </Grid>
              </Box>
            )}
            {/* <Divider /> */}
            {showAllAudio && (
              <Box mb={4}>
                {/* <HStack justify={"space-between"} mb={3}>
                <HStack>
                  <Text fontSize={"md"}>Audio</Text>
                  <Text fontSize={"sm"} color={"gray.400"}>
                    {videos.length}
                  </Text>
                </HStack>
                {audio.length > 1 && (
                  <Text
                    fontSize={"sm"}
                    color={"gray.400"}
                    _hover={{ cursor: "pointer" }}
                    onClick={handleAudioClick}
                  >
                    {audTxt}
                  </Text>
                )}
              </HStack> */}
                <Grid templateColumns="repeat(1, 1fr)" mt={2} gap={3}>
                  {displayAudio}
                </Grid>
              </Box>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
