import { Box } from "@mui/material";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useState } from "react";
import { useEffect } from "react";
import { getChatsByJob } from "../services/chatServices";
import { socket } from "../services/socket";

const ChatWindow = ({ jobId, client, freelancer }) => {
  const [messages, setMessages] = useState([]);
  console.log(jobId);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await getChatsByJob(jobId);
        console.log(res.data);
        setMessages(res.data.messages || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessages();
  }, [jobId]);

  useEffect(() => {
    if (!jobId) return;

    socket.emit("joinChat", jobId);

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
      console.log("RECEIVED:", message.text);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [jobId]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ChatHeader client={client} freelancer={freelancer} />
      <MessageList messages={messages} />
      <MessageInput
        jobId={jobId}
        onMessageSend={(msg) => setMessages((prev) => [...prev, msg])}
      />
    </Box>
  );
};

export default ChatWindow;
