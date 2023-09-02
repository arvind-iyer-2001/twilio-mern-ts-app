import './App.css';
import Lobby from "@Screens/LobbyScreen";
import VideoChatRoom from "@Screens/VideoChatRoomScreen";
import useTwilioVideoContext from "./Hooks/useTwilioVideoContext";

const App = () => {

  const { state } = useTwilioVideoContext();
  return (
    <div className="app">
      <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
          {state.room ? (< VideoChatRoom />) : (< Lobby />)}
      </main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by <a href="https://twitter.com/philnash">philnash</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
