import { Box, Avatar, Typography } from "@mui/material";

const ChatHeader = ({ client, freelancer }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const other = user.role === "client" ? freelancer : client;

  console.log(user, other);

  return (
    <Box
      sx={{
        p: 2,
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Avatar src={other?.profile?.profilePic}>{other?.name?.[0]}</Avatar>
      <Typography fontWeight={600}>{other?.name}</Typography>
    </Box>
  );
};

export default ChatHeader;
