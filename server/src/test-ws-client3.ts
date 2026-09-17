import WebSocket from "ws";

const socket = new WebSocket("ws://localhost:3000");

socket.on("open", () => {
    console.log("Connected to WebSocket server");

    socket.send(
        JSON.stringify({
            type: "JOIN_ROOM",
            roomId: "1234568",
        }),
    );
});

socket.on("message", (message) => {
    console.log("recieved:", message.toString());
});

socket.on("close", () => {
    console.log("Disconnected");
});
