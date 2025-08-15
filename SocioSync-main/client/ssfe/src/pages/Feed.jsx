import { Card, Grid, GridItem, Text } from "@chakra-ui/react";
import { Post } from "../components/Posts/Post";
import { Search } from "../components/Dashboard/Search";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllStories } from "../services/operations/storyAPI";

export const Feed = () => {
  const { allPosts } = useSelector((state) => state.story);
  const { query } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStories());
    console.log("allPosts value is ", allPosts);
  }, []);

  const filterPost = (postList, query) => {
    const regex = new RegExp(query, "i");

    return postList.filter((post) => regex.test(post.user));
  };

  const [filteredPosts, setFilteredPosts] = useState(null);

  useEffect(() => {
    const trimedString = query ? query.trim() : "";
    if (trimedString === "") {
      setFilteredPosts(null);
    } else {
      setFilteredPosts(filterPost(allPosts, query));
    }
  }, [query]);

  const displayFilteredPosts = filteredPosts
    ? filteredPosts.map((post) => (
        <GridItem key={post._id}>
          <Post
            id={post._id}
            user={post.user}
            content={post.content}
            FileUrl={post.FileUrl}
            description={post.description}
            likes={post.likes}
            views={post.views}
            created_at={post.created_at}
            userPic={post.userPic}
          />
        </GridItem>
      ))
    : null;

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
        <Text fontWeight={"800"} fontSize={"x-large"} color={"gray.300"}>
          Search Posts
        </Text>
        <Search />
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap={1}
          mt={2}
          ml={0}
          mr={0}
          mb={0}
          alignContent={"center"}
        >
          {allPosts && !query
            ? allPosts.map((post) => (
                <GridItem key={post._id}>
                  <Post
                    id={post._id}
                    user={post.user}
                    content={post.content}
                    FileUrl={post.FileUrl}
                    description={post.description}
                    likes={post.likes}
                    views={post.views}
                    created_at={post.created_at}
                    userPic={post.userPic}
                  />
                </GridItem>
              ))
            : null}
          {query && displayFilteredPosts}
        </Grid>
      </Card>
    </>
  );
};