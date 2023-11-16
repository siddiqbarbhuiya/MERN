import { Box, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetsWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uri } from "services/helpers";
import { setFriends } from "state";
const FriendListWidget = ({
  userId,
  toggleFriendList,
  setToggleFriendList,
}) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const getFriends = async () => {
    const response = await fetch(`${uri}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setFriends({ friends: data }));
  };
  useEffect(() => {
    getFriends();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <WidgetWrapper
      height={toggleFriendList ? "400px" : undefined}
      overflow={toggleFriendList ? "scroll" : undefined}>
      <FlexBetween>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}>
          Friend List
        </Typography>
        {toggleFriendList && (
          <Close onClick={() => setToggleFriendList(!toggleFriendList)} />
        )}
      </FlexBetween>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};
export default FriendListWidget;
