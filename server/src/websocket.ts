import { WebSocketServer } from "ws";
import type { Server } from "http";
import { createRoom, getRoom } from "./rooms.js";

type Message = {
    type: string;
    roomId?: string;
};

export function setupWebSocket(server: Server) {
    const wss = new WebSocketServer({ server });

    wss.on("connection", (socket) => {
        console.log("websocket client connected");

        socket.on("message", (data) => {
            try {
                const message: Message = JSON.parse(data.toString());
                if (message.type === "CREATE_ROOM") {
                    if (!message.roomId) {
                        socket.send(
                            JSON.stringify({ 
                                type: "ERROR",
                                message: "roomId is required",
                            }),
                        );
                        return;
                    }
                    createRoom(message.roomId, socket);

                    socket.send(
                        JSON.stringify({
                            type: "ROOM_CREATED",
                            roomId: message.roomId,
                        }),
                    );
                    console.log(`Room ${message.roomId} created`);
                    return;
                }

                if (message.type === "JOIN_ROOM") {
                    if (!message.roomId) {
                        socket.send(
                            JSON.stringify({
                                type: "ERROR",
                                message: "roomId is required",
                            }),
                        );
                        return;
                    }

                    const room = getRoom(message.roomId);

                    if (!room) {
                        socket.send(
                            JSON.stringify({
                                type: "ERROR",
                                message: "Room does not exist",
                            }),
                        );
                        return;
                    }

                    room.viewers.add(socket);

                    socket.send(
                        JSON.stringify({
                            type: "ROOM_JOINED",
                            roomId: message.roomId,
                        }),
                    );
                    if (room.host) {
                        room.host.send(
                            JSON.stringify({
                                type: "VIEWER_JOINED",
                            }),
                        );
                    }
                    console.log(`viewer joined room ${message.roomId}`);
                    return;
                }

                socket.send(
                    JSON.stringify({
                        type: "ERROR",
                        message: "Unknown message type",
                    }),
                );
            } catch {
                socket.send(
                    JSON.stringify({
                        type: "ERROR",
                        message: "invalid JSON",
                    }),
                );
            }
        })

        socket.on("close", () => {
            console.log("websocket client disconnected");
        });
    });

    console.log("websocket server attached");
}
