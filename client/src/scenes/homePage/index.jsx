import React from "react";
import { Box } from "@mui/system";
import Navbar from "scenes/navbar";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "scenes/widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreen = useMediaQuery("(min-width: 800px)");
  const { _id, picturePath } = useSelector((state) => state.user);

  return (
    // <div>HomePage</div>
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between">
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}></Box>
        {isNonMobileScreen && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;
