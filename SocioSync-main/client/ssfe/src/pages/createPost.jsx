import {
  Box,
  Button,
  Card,
  Center,
  FormLabel,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spinner,
  Text,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { FcGallery } from "react-icons/fc";
import { RiGalleryLine } from "react-icons/ri";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import EmojiPicker from "emoji-picker-react";
import { Emoji, EmojiStyle } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { createStory } from "../services/operations/storyAPI";

export const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const { loginData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile({
      file: file,
      contentType:
        file.type === "video/mp4" || file.type === "video/mov"
          ? "Video"
          : "Photo",
    });

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const updateEmojiMessage = (emojiData, event) => {
    setCaption((prevData) => prevData + "*:" + emojiData.unified + ":*");
  };

  const handleEmojiClick = () => {
    setIsEmojiOpen(!isEmojiOpen);
  };

  const toast = useToast();

  const handlePost = () => {
    // if (!file) {
    //   return;
    // }
    const data = {
      user: loginData.userName,
      userPic: loginData.profilePic,
      content: file.contentType,
      description: caption,
    };
    console.log("Data sent for creating post", data);

    const result = dispatch(createStory(data, file.file));
    // if (result) {
    //   toast({
    //     title: "Post Created Successfully",
    //     status: "success",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // } else {
    //   toast({
    //     title: "Failed to create post",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }

    setCaption("");
    setFile(null);
    setPreview(null);
  };

  return (
    <>
      <Card
        variant={"none"}
        bg={"inherit"}
        color={"gray.400"}
        borderColor={"gray.600"}
        mt={8}
        ml={4}
        mr={4}
        h={"auto"}
        w={["90%", "80%", "80%", "70%", "70%"]}
        mx={"auto"}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "0.4em",
          },
          "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.00)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            outline: "0px solid gray",
          },
        }}
      >
        <HStack>
          <Icon as={FcGallery} boxSize={"30px"} />
          <Text fontStyle={"italic"} fontWeight={"700"} fontSize={"xx-large"}>
            Create Post
          </Text>
        </HStack>
        <Text fontWeight={"600"} mb={2}>
          Add Photo/Video
        </Text>
        <Box
          bg={preview ? "transparent" : "gray.700"}
          minH={"200px"}
          borderRadius={"10px"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          alignContent={"center"}
        >
          {!preview ? (
            <>
              <Icon
                as={RiGalleryLine}
                boxSize={"50px"}
                _hover={{ cursor: "pointer" }}
                onClick={() => document.getElementById("file-input").click()}
              />
              <FormLabel
                htmlFor="file-input"
                color={"gray.300"}
                _hover={{ cursor: "pointer" }}
                fontSize={"small"}
              >
                Select Your files from here...
              </FormLabel>
              <Input
                id="file-input"
                type="file"
                accept="image/png, image/jpeg, image/jpeg, video/mp4, image/gif, video/mov"
                style={{ display: "none", cursor: "pointer" }}
                onChange={handleFileChange}
              />
            </>
          ) : file.contentType === "Photo" ? (
            <Image
              src={preview}
              borderRadius={"10px"}
              maxH={"350px"}
              w={"100%"}
              objectFit={"contain"}
            />
          ) : (
            <video
              src={preview}
              controls
              autoPlay={false}
              loop={false}
              style={{
                borderRadius: "10px",
                maxHeight: "350px",
                width: "auto",
              }}
            />
          )}
        </Box>
        <InputGroup>
          <InputLeftElement h={"100%"} p={1}>
            <Popover isOpen={isEmojiOpen} placement="top">
              <PopoverTrigger>
                <IconButton
                  color={"gray.400"}
                  bg={"inherit"}
                  _hover={{ bg: "gray.800", cursor: "pointer" }}
                  icon={<HiOutlineFaceSmile />}
                  onClick={handleEmojiClick}
                  ml={1}
                />
              </PopoverTrigger>
              <PopoverContent
                bg={"gray.700"}
                color="gray.300"
                border={"none"}
                w={"fit-content"}
                h={"fit-content"}
                p={0}
              >
                <PopoverHeader border={0} m={0} p={1}>
                  Choose Emoji
                </PopoverHeader>
                <PopoverCloseButton onClick={handleEmojiClick} />
                <PopoverBody>
                  <EmojiPicker
                    searchDisabled="true"
                    theme="dark"
                    height={"200px"}
                    width={"250px"}
                    onEmojiClick={updateEmojiMessage}
                    previewConfig={{
                      showPreview: false,
                    }}
                  />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </InputLeftElement>
          <Input
            variant={"outline"}
            focusBorderColor="purple.500"
            placeholder={"Add a caption here..."}
            onChange={handleCaptionChange}
            value={caption}
            mt={4}
            mb={4}
            size={"lg"}
            fontFamily={"cursive"}
          />
        </InputGroup>
        <Text fontFamily={"cursive"} fontStyle={"oblique"}>
          Preview
        </Text>
        <HStack>
          {caption.split("*").map((word, index) => {
            if (word.startsWith(":") && word.endsWith(":")) {
              const s = word.substring(1, word.length - 1);
              return <Emoji key={index} unified={s} size={20} />;
            } else if (word.length === 0) {
              return;
            } else {
              return (
                <Text key={index} fontFamily={"cursive"}>
                  {word}{" "}
                </Text>
              );
            }
          })}
        </HStack>
        <HStack justifyContent={"right"}>
          <Button
            colorScheme={"purple"}
            variant={"solid"}
            mt={4}
            boxSize={"fit-content"}
            pb={1}
            pt={1}
            onClick={() => {
              setCaption("");
              setFile(null);
              setPreview(null);
            }}
          >
            Clear
          </Button>
          <Button
            colorScheme={"purple"}
            variant={"solid"}
            mt={4}
            boxSize={"fit-content"}
            pb={1}
            pt={1}
            onClick={handlePost}
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </HStack>
      </Card>
    </>
  );
};