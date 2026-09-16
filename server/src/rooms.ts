import type { WebSocket } from "ws";

type Room = {
    host: WebSocket | null;
    viewers: Set<WebSocket>;
};

const rooms = new Map<string, Room>();

export function createRoom(roomId: string, host: WebSocket) {
    if (rooms.has(roomId)) {
        throw new Error("room already exists");
    }

    rooms.set(roomId, {
        host,
        viewers: new Set(),
    });
}

export function getRoom(roomId: string) {
    return rooms.get(roomId);
}

export function deleteRoom(roomId: string) {
    rooms.delete(roomId);
}