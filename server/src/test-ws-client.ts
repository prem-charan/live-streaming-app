import WebSocket from "ws";
import readline, { Interface } from "node:readline";

const socket = new WebSocket("ws://localhost:3000");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

socket.on("open", () => {
    console.log("Connected to WebSocket server");

    socket.send(
        JSON.stringify({
            type: "CREATE_ROOM",
            roomId: "1234567"
        }),
    );
});
socket.on("message", (message) => {
    console.log("recieved:", message.toString());
});
socket.on("close", () => {
    console.log("Disconnected");
});
rl.on("line", (input) => {
    const [command, targetClientId] = input.trim().split(" ");
    if (command === "offer" && targetClientId) {
        socket.send(
            JSON.stringify({
                type: "OFFER",
                targetClientId,
                sdp: "TEST_OFFER",
            }),
        );
        console.log(`OFFER sent to ${targetClientId}`);
    }
});