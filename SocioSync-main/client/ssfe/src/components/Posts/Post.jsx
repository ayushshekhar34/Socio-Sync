import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  VStack,
  keyframes,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { FaPlay } from "react-icons/fa";
import img from "../../assets/Dummy Image.jpg";
import vid from "../../assets/Dummy Video.mp4";
import { useRef, useState } from "react";
import { Emoji } from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import { likeStory, viewStory } from "../../services/operations/storyAPI";

export const Post = (props) => {
  const {
    id,
    content,
    created_at,
    FileUrl,
    description,
    user,
    userPic,
    views,
    likes,
  } = props;

  const { loginData } = useSelector((state) => state.auth);
  const [isLiked, setIsLiked] = useState(likes.includes(loginData._id));
  const [likeNumber, setLikeNumber] = useState(likes.length);
  const [animation, setAnimation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isViewed, setIsViewed] = useState(false);

  const dispatch = useDispatch();

  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const caption = description
    ? description.split("*").map((word, index) => {
        if (word.startsWith(":") && word.endsWith(":")) {
          const s = word.substring(1, word.length - 1);
          return <Emoji key={index} unified={s} size={20} />;
        } else {
          return <Text key={index}>{word} </Text>;
        }
      })
    : "No description provided";

  const likeAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.5); }
  100% { transform: scale(1); }
`;

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

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

  const time = created_at ? getTimeString(created_at) : "No time provided";
  const viewNumber = isViewed ? views.length + 1 : views.length;

  const handleLike = () => {
    dispatch(likeStory(id, loginData._id));
    if (isLiked) {
      setLikeNumber(likeNumber - 1);
    } else {
      setLikeNumber(likeNumber + 1);
    }
    setIsLiked(!isLiked);
    setAnimation(`${likeAnimation} 0.5s ease-in-out`);
  };

  const handleView = () => {
    setIsOpen(true);
    // console.log("loginData id is ", loginData._id);
    // console.log("post id is ", id);
    console.log("views before : ", views);
    const flag = views.includes(loginData._id) ? false : true;
    if (flag) {
      dispatch(viewStory(id, loginData._id));
      setIsViewed(true);
    }

    console.log("views after: ", views);
  };

  // console.log(FileUrl, content, user, time);

  return (
    <>
      {FileUrl && content && description && user ? (
        <>
          <Modal
            key={created_at}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size={"full"}
          >
            <ModalOverlay />
            <ModalContent
              bg={"transparent"}
              color={"gray.200"}
              h={"100%"}
              overflow={"hidden"}
              m={0}
              p={0}
            >
              <ModalHeader>
                <ModalCloseButton />
              </ModalHeader>
              <ModalBody h={"100%"} w={"80%"} ml={"auto"} mr={"auto"}>
                <Grid
                  templateColumns={{
                    sm: "repeat(1, 1fr)",
                    md: "repeat(2, 1fr)",
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(2, 1fr)",
                  }}
                  gap={2}
                  h={"100%"}
                  w={"100%"}
                  overflow={"auto"}
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "gray",
                      borderRadius: "4px",
                    },
                  }}
                  m={0}
                >
                  <GridItem
                    m={0}
                    h={{ sm: "100%", md: "90%" }}
                    w={"auto"}
                    maxH={{ sm: "50vh", md: "100%" }}
                    p={0}
                    gap={1}
                  >
                    <Box
                      bg={"gray.900"}
                      h={"100%"}
                      w={"fit-content"}
                      p={0}
                      alignContent={"center"}
                      ml={"auto"}
                      mr={"auto"}
                    >
                      {content === "Photo" ? (
                        <Image
                          src={FileUrl}
                          w="100%"
                          h="100%"
                          objectFit={"contain"}
                        />
                      ) : content === "Video" ? (
                        <Box
                          as="video"
                          src={FileUrl}
                          ref={videoRef}
                          verticalAlign={"middle"}
                          width="100%"
                          h={"auto"}
                          // controls
                          objectFit="contain"
                          m={0}
                          mt={"auto"}
                          mb={"auto"}
                          onPause={handlePause}
                          onPlay={handlePlay}
                          onEnded={handleEnded}
                          controls
                        />
                      ) : (
                        <></>
                      )}
                    </Box>
                  </GridItem>
                  <GridItem
                    m={0}
                    h={{ sm: "100%", md: "90%" }}
                    w={{ sm: "auto", md: "100%" }}
                    minH={"40vh"}
                    pos={"relative"}
                  >
                    <Box bg={"gray.900"} h={"100%"} w={"100%"}>
                      <VStack align={"flex-start"}>
                        <Box>
                          <HStack ml={3} mt={2}>
                            <Avatar size={"md"} src={userPic} />
                            <VStack align={"flex-start"} gap={0}>
                              <Text color={"gray.200"} fontSize={"small"}>
                                {user}
                              </Text>
                              <Text color={"gray.200"} fontSize={"x-small"}>
                                {time}
                              </Text>
                            </VStack>
                          </HStack>
                        </Box>
                      </VStack>
                      <Box w={"100%"} h={"1px"} bg={"gray.500"} mt={2} />
                      <Box
                        fontFamily={"cursive"}
                        p={2}
                        overflow={"auto"}
                        css={{
                          "&::-webkit-scrollbar": {
                            width: "8px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "gray",
                            borderRadius: "4px",
                          },
                        }}
                      >
                        <HStack>{caption}</HStack>
                      </Box>
                      <Box
                        pos={"absolute"}
                        bg={"gray.900"}
                        p={2}
                        alignItems={"center"}
                        justify={"space-between"}
                        bottom="0"
                        left="0"
                        right="0"
                        display="flex"
                        zIndex={1}
                        w={"auto"}
                      >
                        <HStack h={"90%"} p={2}>
                          <Icon
                            as={FaHeart}
                            bg={"transparent"}
                            color={isLiked ? "red.500" : "whiteAlpha.900"}
                            onClick={handleLike}
                            animation={animation}
                            onAnimationEnd={() => setAnimation("")}
                            _hover={{ cursor: "pointer" }}
                          />
                          <Text color={"gray.300"} fontSize={"small"}>
                            {likeNumber} likes
                          </Text>
                          <Icon
                            as={FiEye}
                            boxSize={5}
                            color={"whiteAlpha.900"}
                          />
                          <Text color={"gray.300"} fontSize={"small"}>
                            {viewNumber} views
                          </Text>
                        </HStack>
                      </Box>
                    </Box>
                  </GridItem>
                </Grid>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Card
            key={id}
            w="200px"
            h="250px"
            bg={"gray.800"}
            overflow="hidden"
            objectFit={"contain"}
            borderRadius={"20px"}
            p={0}
            mb={4}
            mr={1.5}
            // onClick={handleView}
          >
            <CardHeader m={0} p={0}>
              <Box
                bg={"transparent"}
                color="gray.300"
                p={0}
                display="flex"
                alignItems="center"
                zIndex={1}
                mt={2}
                ml={2}
                mb={2}
              >
                <Avatar size="sm" mr={2} src={userPic} />
                <VStack gap={0} align={"left"}>
                  <Text fontSize={"small"} fontWeight={"500"}>
                    {user ? user : "Creator Name"}
                  </Text>
                  <Text fontSize={"x-small"}>{time}</Text>
                </VStack>
              </Box>
            </CardHeader>
            <CardBody p={0} h={"60%"}>
              {content === "Photo" ? (
                <Image
                  src={FileUrl}
                  w="100%"
                  h="100%"
                  opacity={0.8}
                  borderRadius={"20px"}
                  _hover={{ opacity: 1, cursor: "pointer" }}
                  onClick={handleView}
                  objectFit={"contain"}
                />
              ) : content === "Video" ? (
                <Box
                  as="video"
                  src={FileUrl}
                  borderRadius={"20px"}
                  width="100%"
                  h={"fit-content"}
                  // controls
                  objectFit="contain"
                  m={0}
                  mt={"auto"}
                  mb={"auto"}
                  opacity={0.8}
                  _hover={{ opacity: 1, cursor: "pointer" }}
                  onClick={handleView}
                />
              ) : (
                <></>
              )}
            </CardBody>

            <CardFooter>
              <HStack
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg={"transparent"}
                color="white"
                p={3}
                display="flex"
                alignItems="center"
                zIndex={1}
                justify={"space-between"}
                w={"auto"}
              >
                <HStack>
                  <Icon
                    as={FaHeart}
                    boxSize={5}
                    color={isLiked ? "red.500" : "whiteAlpha.900"}
                    onClick={handleLike}
                    animation={animation}
                    onAnimationEnd={() => setAnimation("")}
                    _hover={{ cursor: "pointer" }}
                  />
                  <Text fontSize={"small"} fontFamily={"cursive"}>
                    {likeNumber} likes
                  </Text>
                </HStack>
                <Text fontSize={"small"} fontFamily={"cursive"}>
                  {viewNumber} Views
                </Text>
              </HStack>
            </CardFooter>
          </Card>
        </>
      ) : null}
    </>
  );
};