import { Box, IconButton, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { sendMessage } from "../services/chatServices";
import { socket } from "../services/socket";

const MessageInput = ({ jobId, onMessageSend }) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    if (!text.trim()) return;

    try {
      const res = await sendMessage(jobId, text);
      onMessageSend(res.data);
      socket.emit("sendMessage", {
        jobId,
        message: res.data,
      });
      setText("");
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
