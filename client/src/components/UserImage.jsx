import { Box } from "@mui/material";
import { uri } from "services/helpers";

const UserImage = ({ image, size = "60px" }) => {
  return (
    <Box height={size} width={size}>
      <img
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`${uri}/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
