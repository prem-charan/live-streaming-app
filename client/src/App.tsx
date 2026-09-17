import { useWebSocket } from "./hooks/useWebSocket"

function App() {
    const { send } = useWebSocket();
    function createRoom() {
        send({
            type: "CREATE_ROOM",
            roomId: "1234567",
        });
    }
    function joinRoom() {
        send({
            type: "JOIN_ROOM",
            roomId: "1234567",
        });
    }
    return (
        <div>
            <h1>Live streaming app</h1>
            <button onClick={createRoom}>
                Create Room
            </button>
            <button onClick={joinRoom}>
                Join Room
            </button>
        </div>
    );
}

export default App;
