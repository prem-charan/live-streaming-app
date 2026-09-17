import { useEffect, useRef } from "react";


export function useWebSocket() {
    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:3000");
        socketRef.current = socket;
        socket.onopen = () => {
            console.log("websocket connected");
        };
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log("server: ", message);
        };
        socket.onclose = () => {
            console.log("websocket disconnected");
        };
        socket.onerror = (error) => {
            console.log("websocket error: ", error);
        };
        return () => {
            socket.close();
        };
    }, []);
    function send(message: object) {
        const socket = socketRef.current;
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error("websocket is not connected");
            return;
        }
        socket.send(JSON.stringify(message));
    }
    return { send };
}