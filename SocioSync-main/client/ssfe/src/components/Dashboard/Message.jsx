import {
  Box,
  Button,
  Center,
  Collapse,
  Fade,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ScaleFade,
  Show,
  Spinner,
  Text,
  VStack,
  background,
  useDisclosure,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverHeader,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { FaFileAudio, FaFilePdf } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../App";
import EmojiPicker from "emoji-picker-react";
import {
  addMessage,
  addMessagesToBeUpdated,
} from "../../redux/Slices/chatSlice";
import { mediaUpload } from "../../services/operations/mediaAPI";
import { setLoading } from "../../redux/Slices/authSlice";

export const Message = () => {
  const { loginData, loading } = useSelector((state) => state.auth);
  const sender = loginData.userName;

  const { currentRoom } = useSelector((state) => state.online);
  const receiver = currentRoom.userName;

  var roomName = sender < receiver ? sender + receiver : receiver + sender;
  // console.log("roomName is ", roomName);

  const [txt, setTxt] = useState("");
  const dispatch = useDispatch();

  // const handleFocus = () => {
  //   socket.emit("user_is_typing", roomName);
  // };

  // const handleBlur = () => {
  //   socket.emit("user_is_not_typing", roomName);
  // };
  const handleChange = (e) => {
    setTxt(e.target.value);
  };

  const getTimeString = () => {
    const date = Date.now();
    return date;
  };

  const handleClick = () => {
    const messageObj = {
      sender: sender,
      receiver: receiver,
      owner: sender,
      chatType: "personal",
      groupId: null,
      time: getTimeString(),
      MediaType: "Text",
      message: txt,
    };
    setTxt("");

    socket.emit("private_message", { roomName, messageObj });
  };

  // handling media selection

  const [selectedFile, setselectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState(null);
  const [isOpen, setisOpen] = useState(false);
  const [emoji, setEmoji] = useState(false);

  const handleEmojiClick = () => {
    setEmoji(!emoji);
  };
  const fileInputRef = useRef(null);

  const handleMediaInputChange = (event) => {
    const file = event.target.files[0];
    setselectedFile({
      file: file,
      mediaType:
        event.target.id === "image-input"
          ? "Photos"
          : event.target.id === "video-input"
          ? "Videos"
          : "Audio",
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setisOpen(true);
  };

  const handleClearFile = () => {
    setselectedFile(null);
    setCaption(null);
    setisOpen(false);
    document.getElementById("image-input").value = null;
    document.getElementById("video-input").value = null;
    document.getElementById("audio-input").value = null;
  };

  const handleSendMedia = async () => {
    const file = selectedFile ? selectedFile.file : null;
    const data = {
      sender: sender,
      receiver: receiver,
      mediaType: selectedFile.mediaType,
      time: getTimeString(),
    };
    dispatch(setLoading(true));
    const result = await dispatch(mediaUpload(file, data));
    console.log("result is ", result);
    dispatch(setLoading(false));

    const messageObj = {
      sender: sender,
      receiver: receiver,
      owner: sender,
      chatType: "personal",
      groupId: null,
      time: getTimeString(),
      MediaType: selectedFile.mediaType,
      message: caption,
      media: result.mediaUrl,
    };

    socket.emit("private_message", { roomName, messageObj });

    setisOpen(false);
  };

  const updateEmojiMessage = (emojiData, event) => {
    setTxt((prevData) => prevData + emojiData.emoji);
  };

  return (
    <>
      <HStack 
        w={"100%"} 
        h={"auto"} 
        m={0} 
        p={0}
        borderRadius={"lg"}
        >
        <Popover isOpen={emoji} closeOnBlur>
          <PopoverTrigger>
            <IconButton
              color={"gray.400"}
              bg={"inherit"}
              _hover={{ bg: "gray.600", cursor: "pointer" }}
              icon={<HiOutlineFaceSmile />}
              mb={1}
              onClick={handleEmojiClick}
            />
          </PopoverTrigger>
          <PopoverContent
            bg={"gray.700"}
            color="gray.300"
            w={"fit-content"}
            h={"fit-content"}
          >
            <PopoverHeader>Emoji</PopoverHeader>
            <PopoverCloseButton onClick={handleEmojiClick} />
            <PopoverBody>
              <EmojiPicker theme="dark" onEmojiClick={updateEmojiMessage} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <Modal isOpen={isOpen} onClose={handleClearFile}>
          <ModalOverlay />
          <ModalContent bg={"gray.700"} color={"gray.300"}>
            <ModalHeader>Sending Your Media</ModalHeader>
            <ModalCloseButton />
            <ModalBody gap={2}>
              <Center>
                {selectedFile && selectedFile.mediaType === "Photos" && (
                  <Box h={"350px"}>
                    <Image src={preview} h={"inherit"} />
                  </Box>
                )}
                {selectedFile && selectedFile.mediaType === "Videos" && (
                  <Box h={"350px"}>
                    <video src={preview} height={"inherit"} />
                  </Box>
                )}
                {selectedFile && selectedFile.mediaType === "Audio" && (
                  <Box>
                    <VStack>
                      <Icon as={FaFileAudio} w={"250px"} h={"250px"} />
                      <Text>{selectedFile.file.name}</Text>
                    </VStack>
                  </Box>
                )}
              </Center>
              <Input
                mt={2}
                w={"100%"}
                placeholder="*Add Caption (optional)"
                onChange={(e) => {
                  setCaption(e.target.value);
                }}
              />
            </ModalBody>
            <ModalFooter>
              <HStack justify={"space-between"}>
                {!loading && (
                  <Button
                    color={"gray.800"}
                    bg={"yellow.400"}
                    _hover={{ bg: "yellow.600" }}
                    onClick={handleSendMedia}
                  >
                    Send
                  </Button>
                )}
                {loading && <Spinner />}
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <InputGroup mb={2}>
          <InputLeftElement
            borderRadius={"md"}
            _hover={{ cursor: "pointer", bg: "gray.700", transition: "0.5s" }}
          >
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<AttachmentIcon />}
                variant={"ghost"}
                color={"gray.400"}
                _hover={{ background: "gray.600" }}
                _active={{ background: "gray.600" }}
              />
              <MenuList
                bg={"gray.700"}
                borderColor={"gray.300"}
                boxShadow={"md"}
              >
                <FormControl>
                  <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                    <FormLabel
                      htmlFor="image-input"
                      color="gray.300"
                      _hover={{ cursor: "pointer" }}
                    >
                      Photos
                      <Input
                        id="image-input"
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/gif"
                        style={{ display: "none", cursor: "pointer" }}
                        onChange={handleMediaInputChange}
                      />
                    </FormLabel>
                  </MenuItem>
                  <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                    <FormLabel
                      htmlFor="video-input"
                      color={"gray.300"}
                      _hover={{ cursor: "pointer" }}
                    >
                      Videos
                    </FormLabel>
                    <Input
                      id="video-input"
                      type="file"
                      accept="video/mp4, video/mov, video/mkv"
                      style={{ display: "none", cursor: "pointer" }}
                      onChange={handleMediaInputChange}
                    />
                  </MenuItem>
                  <MenuItem bg={"gray.700"} _hover={{ background: "gray.500" }}>
                    <FormLabel
                      htmlFor="pdf-input"
                      color={"gray.300"}
                      _hover={{ cursor: "pointer" }}
                    >
                      Audio
                    </FormLabel>
                    <Input
                      id="pdf-input"
                      type="file"
                      accept=".mp3"
                      style={{ display: "none", cursor: "pointer" }}
                      onChange={handleMediaInputChange}
                    />
                  </MenuItem>
                </FormControl>
              </MenuList>
            </Menu>
          </InputLeftElement>
          <Input
            bg={"inherit"}
            _focus={{
              borderColor: "initial",
              outline: "none",
              boxShadow: "none",
            }}
            borderWidth={0}
            value={txt}
            placeholder="Your Message"
            // onFocus={handleFocus}
            // onBlur={handleBlur}
            onChange={handleChange}
          />
          <InputRightElement
            mr={2}
            borderRadius={"md"}
            _hover={{ cursor: "pointer", bg: "gray.700", transition: "0.5s" }}
            onClick={handleClick}
          >
            <IoMdSend />
          </InputRightElement>
        </InputGroup>
      </HStack>
    </>
  );
};
