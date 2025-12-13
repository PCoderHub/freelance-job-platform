import { Box, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
//import { getChatsByJob } from "../services/chatServices";

const MessageList = ({ messages }) => {
  const bottomRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));

  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const res = await getChatsByJob(jobId);
  //         console.log(res.data)
  //         setMessages(res.data.messages || []);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };

  //     fetchMessages();
  //   }, [jobId]);

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
          const isMe = msg.sender === user._id || msg.sender?._id === user._id;

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
                <Typography variant="body2">
                  {msg.sender?.name || user.name}:
                </Typography>
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
            </Box>
          );
        })}
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessageList;
