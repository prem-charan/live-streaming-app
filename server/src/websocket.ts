import { WebSocket } from "ws";
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
    console.log("client connected");

    socket.on("message", (msg) => {
        console.log("received:", msg.toString());

        // msg broadcasting/ relaying
        wss.clients.forEach((client) => {
            if (client !== socket && client.readyState === client.OPEN) {
                client.send(msg);
            }
        });
    });

    socket.on("close", () => {
        console.log("client disconnected");
    });
});

console.log("websocket server running on port: 8080");