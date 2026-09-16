import { WebSocketServer } from "ws";
import type { Server } from "http";

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server });

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
            console.log("websocket client disconnected");
        });
    });

    console.log("websocket server attached");
}
