import React, { useEffect, useState } from "react";

export default function ChatApp() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
    };
    socket.onmessage = (message) => {
      console.log("Recieved message: ", message.data);
      setMessages((m) => [...m, message.data]);
    };
    setSocket(socket);

    return () => {
      socket.close();
    };
  }, []);

  if (!socket) {
    return <div>Connecting to socket server...</div>;
  }

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          socket.send(inputValue);
        }}
      >
        Send
      </button>
      {messages.map((message) => (
        <div>{message}</div>
      ))}
    </>
  );
}
