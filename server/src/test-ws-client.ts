import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:8080");

socket.on("open", () => {
  console.log("Connected to WebSocket server");

  socket.send("Hello from WebSocket client!");
});

socket.on("message", (message) => {
  console.log("recieved:", message.toString());
});

socket.on("close", () => {
  console.log("Disconnected");
});
