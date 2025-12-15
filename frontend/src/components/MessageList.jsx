import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        bgcolor: "#f9f9f9",
      }}
    >
      {messages.length > 0 &&
        messages.map((msg) => {
          if (!msg?.sender) return null;

          const isMe = msg?.sender?._id?.toString() === user?.id?.toString();

          return (
            <Box
              key={msg._id}
              sx={{
                display: "flex",
                justifyContent: isMe ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: isMe ? "#1976d2" : "#e0e0e0",
                  color: isMe ? "white" : "black",
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{ opacity: 0.6, display: "block", mt: 0.5 }}
                >
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleString()
                    : "Sending..."}
                </Typography>
              </Box>
            </Box>
          );
        })}
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessageList;
