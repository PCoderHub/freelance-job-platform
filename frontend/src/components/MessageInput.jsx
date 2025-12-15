import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { sendMessage } from "../services/chatServices";
import { socket } from "../services/socket";

const MessageInput = ({ jobId }) => {
  const [text, setText] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSend = async () => {
    if (!text.trim()) return;

    const message = {
      _id: Date.now(), // temp id
      text,
      sender: {
        _id: user.id,
        name: user.name,
      },
      createdAt: new Date().toISOString(),
    };

    socket.emit("sendMessage", {
      jobId,
      message,
    });

    setText("");

    try {
      await sendMessage(jobId, text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        p: 2,
        borderTop: "1px solid #eee",
        gap: 1,
      }}
    >
      <TextField
        fullWidth
        size="small"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      <IconButton color="primary" onClick={handleSend} disabled={!text.trim()}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInput;
