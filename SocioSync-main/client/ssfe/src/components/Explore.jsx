/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../services/operations/profileAPI";
import { UserCard } from "./ExploreFriends/UserCard";
import {
  Card,
  Box,
  Tabs,
  TabList,
  Tab,
  Divider,
  CardBody,
  HStack,
  Grid,
  GridItem,
  Text,
  Menu,
  MenuButton,
  Button,
  Icon,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import useCustomToast from "../utils/useCustomToast";
import {
  setFriends,
  setRequests,
  setInvites,
} from "../redux/Slices/profileSlice";
import { socket } from "../App";
import { Search } from "./Dashboard/Search";

export const Explore = () => {
  const dispatch = useDispatch();
  const { requests, invites } = useSelector((state) => state.profile);
  const [explore, setExplore] = useState(true);
  const [invite, setInvite] = useState(false);
  const [request, setRequest] = useState(false);

  const [exploredata, setexploredata] = useState([]);
  const {showToast, updateToast} = useCustomToast();
  const { allUsers } = useSelector((state) => state.profile);
  const { loginData } = useSelector((state) => state.auth);
  // const { friends, requests, invites } = useSelector((state) => state.profile);
  const handleExploreClick = () => {
    setExplore(true);
    setInvite(false);
    setRequest(false);
  };

  const handleInviteClick = () => {
    setExplore(false);
    setInvite(true);
    setRequest(false);
  };

  const handleRequestClick = () => {
    setExplore(false);
    setInvite(false);
    setRequest(true);
  };

  useEffect(() => {
    const User = allUsers.find((user) => user.userName === loginData.userName);
    let friends = User ? (User.friends ? User.friends : []) : [];
    let requests = User ? (User.requests ? User.requests : []) : [];
    let invites = User ? (User.invites ? User.invites : []) : [];
    dispatch(setFriends(friends));
    dispatch(setRequests(requests));
    dispatch(setInvites(invites));
    const friendUserNames = friends
      ? friends.map((friend) => friend.userName)
      : null;
    const requestsUserNames = requests
      ? requests.map((request) => request.userName)
      : null;
    const invitesUserNames = invites
      ? invites.map((invite) => invite.userName)
      : null;
    setexploredata(
      allUsers.filter(
        (user) =>
          friendUserNames &&
          !friendUserNames.includes(user.userName) &&
          requestsUserNames &&
          !requestsUserNames.includes(user.userName) &&
          invitesUserNames &&
          !invitesUserNames.includes(user.userName) &&
          user.userName !== User.userName
      )
    );

    const reloadUsers = () => {
      dispatch(getAllUsers());
      setexploredata(
        allUsers.filter(
          (user) =>
            friendUserNames &&
            !friendUserNames.includes(user.userName) &&
            requestsUserNames &&
            !requestsUserNames.includes(user.userName) &&
            invitesUserNames &&
            !invitesUserNames.includes(user.userName) &&
            user.userName !== User.userName
        )
      );

      requests = User ? (User.requests ? User.requests : []) : [];
      invites = User ? (User.invites ? User.invites : []) : [];

      setInvites(invites);
      setRequest(requests);
    };

    socket.on("add_new_friend", reloadUsers);
    // console.log("explore is ", exploredata);
  }, [allUsers, loginData]);

  const displayExplore = exploredata ? (
    exploredata.length > 0 ? (
      exploredata.map((item) => (
        <GridItem>
          <UserCard
            key={item.userName}
            name={item.name}
            userName={item.userName}
            friends={item.friends.length}
            description={item.description}
            imgurl={item.profilePic}
          />
        </GridItem>
      ))
    ) : (
      <></>
    )
  ) : (
    <></>
  );

  const displayInvites = invites ? (
    invites.length > 0 ? (
      invites.map((item) => (
        <GridItem>
          <UserCard
            key={item.userName}
            name={item.name}
            userName={item.userName}
            friends={item.friends.length}
            description={item.description}
            imgurl={item.profilePic}
            cardType="invites"
          />
        </GridItem>
      ))
    ) : (
      <></>
    )
  ) : (
    <></>
  );

  const displayRequests = requests ? (
    requests.length > 0 ? (
      requests.map((item) => (
        <GridItem>
          <UserCard
            key={item.userName}
            name={item.name}
            userName={item.userName}
            friends={item.friends.length}
            description={item.description}
            imgurl={item.profilePic}
            cardType="requests"
          />
        </GridItem>
      ))
    ) : (
      <></>
    )
  ) : (
    <></>
  );

  const { query } = useSelector((state) => state.search);
  const filterUsers = (usersList, query) => {
    const regex = new RegExp(query, "i");

    return usersList.filter(
      (user) => regex.test(user.name) || regex.test(user.userName)
    );
  };

  const [filteredFriends, setfilteredFriends] = useState(null);
  useEffect(() => {
    const trimedString = query ? query.trim() : "";
    if (trimedString === "") {
      setfilteredFriends(null);
    } else {
      setfilteredFriends(filterUsers(allUsers, query));
    }
  }, [query]);

  const displayFilteredFriends = filteredFriends ? (
    filteredFriends.length > 0 ? (
      filteredFriends.map(
        (item) =>
          item && (
            <UserCard
              key={item.userName}
              name={item.name}
              userName={item.userName}
              friends={item.friends.length}
              description={item.description}
              imgurl={item.profilePic}
              cardType="none"
            />
          )
      )
    ) : (
      <></>
    )
  ) : (
    <></>
  );
  // console.log("explore is ", requests);

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
      >
        <Text ml={1} fontSize={"x-large"} fontWeight={700}>
          Search People
        </Text>
        <Search />
        <HStack justify={"space-between"}>
          <Text ml={1} fontSize={"larger"} fontWeight={600}>
            Explore
          </Text>
          <Menu>
            <MenuButton
              as={Button}
              ml={1}
              pl={3}
              pr={3}
              pt={1}
              pb={1}
              mb={0}
              boxSize={"fit-content"}
              bg={"gray.700"}
              _hover={{ bg: "gray.600" }}
              _active={{ bg: "gray.600" }}
              color={"gray.300"}
              rightIcon={<IoFilter />}
            >
              Filter
            </MenuButton>
            <MenuList bg={"gray.700"} border={0}>
              <MenuItem
                bg={"inherit"}
                _hover={{ bg: "gray.600" }}
                onClick={handleExploreClick}
              >
                All
              </MenuItem>
              <MenuItem
                bg={"inherit"}
                _hover={{ bg: "gray.600" }}
                onClick={handleInviteClick}
              >
                Invites
              </MenuItem>
              <MenuItem
                bg={"inherit"}
                _hover={{ bg: "gray.600" }}
                onClick={handleRequestClick}
              >
                Requests
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        {/* <Tabs
          position="relative"
          variant="unstyled"
          borderColor={"gray.600"}
          gap={3}
        >
          <TabList>
            <Tab
              w={"150px"}
              h={"fit-content"}
              mt={4}
              mb={2}
              _selected={{
                bgGradient: "linear(to-t, purple.400, purple.600)",
                color: "gray.800",
                borderRadius: "15px",
              }}
              onClick={handleExploreClick}
            >
              Explore
            </Tab>
            <Tab
              w={"150px"}
              h={"fit-content"}
              mt={4}
              mb={2}
              _selected={{
                bgGradient: "linear(to-t, purple.400, purple.600)",
                color: "gray.800",
                borderRadius: "15px",
              }}
              onClick={handleInviteClick}
            >
              Invites
            </Tab>
            <Tab
              w={"150px"}
              h={"fit-content"}
              mt={4}
              mb={2}
              _selected={{
                bgGradient: "linear(to-t, purple.400, purple.600)",
                color: "gray.800",
                borderRadius: "15px",
              }}
              onClick={handleRequestClick}
            >
              Requests
            </Tab>
          </TabList>
        </Tabs> */}
        {/* <Divider /> */}
        <CardBody>
          <Box h={"auto"} w={"90%"} ml={0} mr={0} p={0}>
            {explore && query === null && (
              <Grid
                templateColumns={[
                  { base: "repeat(3, 1fr)" },
                  { sm: "repeat(1, 1fr)" },
                  { md: "repeat(3, 1fr)" },
                  { lg: "repeat(3, 1fr)" },
                  { xl: "repeat(3, 1fr)" },
                ]}
                p={0}
                m={0}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayExplore}
              </Grid>
            )}
            {invite && query === null && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayInvites}
              </Grid>
            )}
            {request && query === null && explore !== true && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayRequests}
              </Grid>
            )}
            {query && (
              <Grid
                templateColumns={"repeat(3, 1fr)"}
                gap={3}
                overflowX={"auto"}
                overflowY={"auto"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0px",
                  },
                }}
              >
                {displayFilteredFriends}
              </Grid>
            )}
          </Box>
        </CardBody>
      </Card>
    </>
  );
};
