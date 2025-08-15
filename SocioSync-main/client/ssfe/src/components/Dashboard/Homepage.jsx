import { Card, CardBody, Divider, HStack, VStack, Box, Skeleton, 
  SkeletonCircle, SkeletonText, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Nav } from "../Dashboard/Nav";
import { Message } from "../Dashboard/Message";
import { ChatWindow } from "../Dashboard/ChatWindow";
import { Search } from "../Dashboard/Search";
import { UserContacts } from "../Dashboard/UserContacts";
import { useDispatch, useSelector } from "react-redux";
import { Logo } from "../../components/Logo";

const ContactCardSkeleton = () => (
  <Flex p="4" borderWidth="0px" borderRadius="lg" overflow="hidden"
      w = "100%" bgColor={"#2e333d"} mt={3}>
    <Box>
      <SkeletonCircle size="5" mr="4"/>
    </Box>
    <Flex flexDir="column" justifyContent="center" w={"100%"}>
      <Skeleton h={"14px"} mb="2" noOfLines={1} spacing="2" 
        startColor='#7f8187' endColor='#30333e'
        // isLoaded = {true}
        // fadeDuration={1}
        />
    </Flex>
  </Flex>
);

const ContactCardSkeletons = () => {
  const skeletons = Array.from({ length: 8 }, (_, index) => (
    <ContactCardSkeleton key={index} />
  ));

  return <>{skeletons}</>;
};

export const Homepage = () => {
  const dispatch = useDispatch();
  const { query } = useSelector((state) => state.search);
  const { allUsers } = useSelector((state) => state.profile);
  const { loginData } = useSelector((state) => state.auth);
  const { currentRoom } = useSelector((state) => state.online);

  const User = allUsers.find((item) => item.userName === loginData.userName);
  const [loading, setLoading] = useState(true);

  const filterUsers = (usersList, query) => {
    const regex = new RegExp(query, "i");
    return usersList.filter(
      (user) => regex.test(user.name) || regex.test(user.userName)
    );
  };

  const [displayFriends, setDisplayFriends] = useState([]);
  useEffect(() => {
    if (User) {
      const friends = User.friends.map(
        (item) =>
          item && (
            <UserContacts
              key={item.email}
              name={item.name}
              cardType={"friends"}
              userName={item.userName}
              imgurl={item.profilePic}
            />
          )
      );
      setDisplayFriends(friends);
      setLoading(false);
    }
  }, [allUsers]);

  const [filteredFriends, setfilteredFriends] = useState([]);
  useEffect(() => {
    const trimedString = query ? query.trim() : "";
    if (trimedString === "") {
      setfilteredFriends([]);
    } else {
      setfilteredFriends(filterUsers(User.friends, query));
    }
    setLoading(false);
  }, [query]);

  return (
    <Card
      width={"100%"}
      height={"100%"}
      bg={"#131313"}
      borderRadius={"0"}
      overflow={"hidden"}
      pt={"5px"}
      pb={"5px"}
      css={{
        "&::-webkit-scrollbar": {
          width: "10px",
        },
      }}
      color={"gray.200"}
    >
      <Card h={"100%"} bg={"inherit"} ml={0}>
        <HStack bg={"#202329"} h={"100%"} borderRadius={"2xl"}>
          <Card
            bg={"inherit"}
            color={"#b7b8bc"}
            shadow={0}
            w={"40%"}
            h={"100%"}
            p={0}
          >
            <Search />
            <VStack
              p={1}
              ml={1}
              h={"95%"}
              overflowY={"scroll"}
              w={"100%"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                },
              }}
            >
              {/* Render skeletons if loading */}
              {loading && <ContactCardSkeletons />}
              {/* Render user contacts when not loading */}
              {!loading &&
                (query
                  ? filteredFriends.map((friend) => friend)
                  : displayFriends.map((friend) => friend))}
            </VStack>
          </Card>

          <Divider orientation="vertical" />

          <Card
            bg={"inherit"}
            color={"#b7b8bc"}
            w={"100%"}
            h={"100%"}
            shadow={0}
            borderRadius={"2xl"}
          >
            <VStack h={"100%"}>
              {currentRoom && (
                <>
                  <Nav />
                  <ChatWindow />
                  <Message />
                </>
              )}
              {!currentRoom && (
                <Card
                  direction={"row"}
                  mt={"auto"}
                  mb={"auto"}
                  align={"center"}
                  width={"60%"}
                  mx={"auto"}
                  variant={"filled"}
                  borderRadius={"0px"}
                  bg={"transparent"}
                  shadow={"none"}
                  p={4}
                >
                  <CardBody bg={"transparent"} borderRadius={"xl"}>
                    <Box>
                      <Logo ht={130} wt={470} />
                    </Box>
                  </CardBody>
                </Card>
              )}
            </VStack>
          </Card>
        </HStack>
      </Card>
    </Card>
  );
};

export default Homepage;