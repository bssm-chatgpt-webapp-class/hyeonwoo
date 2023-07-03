import { useEffect, useState } from "react";
import { Header, Main, TextField } from "./components";
import "./reset.css";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

function App() {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    socket.on("chat", (data) => {
      setChatMessages((s) => [...s, { isMine: false, message: data }]);
    });
  }, []);

  const sendChat = (message) => {
    setChatMessages((s) => [...s, { isMine: true, message }]);
    socket.emit("chat", message);
  };

  return (
    <div className="App">
      <Header />
      <Main chatMessages={chatMessages} />
      <TextField sendChat={sendChat} />
    </div>
  );
}

export default App;
