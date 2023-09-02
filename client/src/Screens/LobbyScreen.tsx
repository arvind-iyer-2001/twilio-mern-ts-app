// ./src/Lobby.js
import { useState, useCallback } from "react";
import useTwilioVideoContext from "@Hooks/useTwilioVideoContext";
import useConnectTwilioVideo from "@Hooks/useTwilioVideoServices";

const Lobby = () => {
    const [username, setUsername] = useState("");
    const [roomName, setRoomName] = useState("");
    
    const { state } = useTwilioVideoContext();
    const { connectToVideoRoom } = useConnectTwilioVideo();

    const handleUsernameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }, []);

    const handleRoomNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRoomName(event.target.value);
    }, []);

    const handleSubmit = useCallback(
        async (event : React.ChangeEvent<HTMLFormElement>) => {
            event.preventDefault();
            await connectToVideoRoom(username, roomName);
        }, [roomName, username]
    );

    return (
        <form onSubmit={handleSubmit}>
            <h2>Enter a room</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="field"
                    value={username}
                    onChange={handleUsernameChange}
                    readOnly={state.connecting}
                    required
                />
            </div>

            <div>
                <label htmlFor="room">Room name:</label>
                <input
                    type="text"
                    id="room"
                    value={roomName}
                    onChange={handleRoomNameChange}
                    readOnly={state.connecting}
                    required
                />
            </div>

            <button type="submit" disabled={state.connecting}>
                {state.connecting ? "Connecting" : "Join"}
            </button>
        </form>
    );
};

export default Lobby;
