import { createServer, IncomingMessage, ServerResponse } from "node:http";

const PORT = 3000;

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200, {
        "content-type": "text/plain",
    });

    res.end("Streaming server is running");
});

server.listen(PORT, () => {
    console.log(`server running on PORT: ${PORT}`);
});