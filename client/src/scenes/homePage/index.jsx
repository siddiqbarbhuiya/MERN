import React from "react";
import { Box } from "@mui/system";
import Navbar from "scenes/navbar";
import { toggleButtonClasses, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidgets";
import AdverWidget from "scenes/widgets/AdverWidget";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import { useState } from "react";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 800px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const [toggleUserWidget, setToggleUserWidget] = useState(false);

  return (
    // <div>HomePage</div>
    <Box>
      <Box position="fixed" top="0" left="0" right="0" zIndex="100">
        <Navbar
          picturePath={picturePath}
          toggleUserWidget={toggleUserWidget}
          setToggleUserWidget={setToggleUserWidget}
        />
      </Box>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between">
        <Box
          mt={isNonMobileScreen ? "4rem" : "4rem"}
          flexBasis={isNonMobileScreen ? "26%" : undefined}>
          {isNonMobileScreen ? (
            <UserWidget userId={_id} picturePath={picturePath} />
          ) : !isNonMobileScreen && toggleUserWidget ? (
            <UserWidget userId={_id} picturePath={picturePath} />
          ) : null}
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? "4rem" : "4rem"}>
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreen && (
          <Box mt={isNonMobileScreen ? "4rem" : "4rem"} flexBasis="26%">
            <AdverWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
