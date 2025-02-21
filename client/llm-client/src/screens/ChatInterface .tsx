import { useState, useRef, useEffect, FormEvent } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";

type MessageRole = "assistant" | "user";

interface Message {
  role: MessageRole;
  content: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "¡Hola! ¿En qué puedo ayudarte hoy?" },
  ]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const assistantMessage: Message = {
        role: "assistant",
        content:
          "Esta es una respuesta de ejemplo. Aquí deberías conectar con tu modelo LLM.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        bgcolor: "background.default",
        overflow: "hidden", // Evita el scroll en el contenedor principal
      }}
    >
      {/* Messages Area */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            maxWidth: "800px",
            mx: "auto",
            px: 2,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor:
                  message.role === "assistant"
                    ? "background.paper"
                    : "transparent",
                py: 4,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor:
                      message.role === "assistant"
                        ? "primary.main"
                        : "grey.700",
                  }}
                >
                  {message.role === "assistant" ? (
                    <SmartToyIcon />
                  ) : (
                    <PersonIcon />
                  )}
                </Avatar>
                <Typography
                  sx={{
                    flex: 1,
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    color: "text.primary",
                  }}
                >
                  {message.content}
                </Typography>
              </Box>
            </Box>
          ))}
          {isLoading && (
            <Box
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                py: 4,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  <SmartToyIcon />
                </Avatar>
                <CircularProgress size={20} />
              </Box>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
          width: "100%",
        }}
      >
        <Box
          sx={{
            maxWidth: "800px",
            mx: "auto",
            p: 2,
            width: "100%",
          }}
        >
          <Paper
            component="form"
            onSubmit={handleSubmit}
            elevation={1}
            sx={{
              p: 1,
              display: "flex",
              gap: 1,
              width: "100%",
              bgcolor: "background.paper",
              border: 1,
              borderColor: "grey.800",
              "&:hover": {
                borderColor: "grey.700",
              },
            }}
          >
            <TextField
              fullWidth
              multiline
              maxRows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              disabled={isLoading}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  p: 1,
                  color: "text.primary",
                  "& ::placeholder": {
                    color: "text.secondary",
                    opacity: 1,
                  },
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !input.trim()}
              sx={{
                minWidth: "40px",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
              }}
            >
              <SendIcon />
            </Button>
          </Paper>
          <Typography
            variant="caption"
            align="center"
            sx={{
              display: "block",
              mt: 1,
              color: "text.secondary",
            }}
          >
            El modelo puede producir información incorrecta.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatInterface;
