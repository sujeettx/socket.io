import io from "socket.io-client";
import "./App.css";
import { useState, useEffect, } from "react";
function App() {
  const [message, setMessages] = useState("");
  const [chat, setChat] = useState([])
  const socket = io.connect("http://localhost:8000");
  const uername = "user" + Math.floor(Math.random() * 1000);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { message });
    setMessages("");
  };
  useEffect(() => {
    socket.on("message", (playload) => {
      setChat([...chat, playload]);
      console.log("what is playload", playload);
      console.log("what is chat", chat);
    })})
  
  return (
    <>
      <form onSubmit={sendMessage}>
        <h1>Welcome to the chat app</h1>
        <div className="chat">
          {chat.map((playload, index) => {
            return (
              <div key={index}>
                <h3>{playload.message} <span>{uername}</span></h3>
              </div>
            );
          })}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="type a message"
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
