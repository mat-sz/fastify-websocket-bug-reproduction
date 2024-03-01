import React, { useState, useRef } from 'react';

export const App: React.FC = () => {
  const [connected, setConnected] = useState(false);
  const websocketRef = useRef<WebSocket>();

  const [sent, setSent] = useState(0);
  const [received, setReceived] = useState(0);

  return (
    <div>
      <div>{connected ? 'Connected' : 'Not connected'}</div>
      <button
        onClick={async () => {
          const current = websocketRef.current;
          if (current) {
            current.close();
            current.onclose = null;
            current.onopen = null;
          }

          const websocket = new WebSocket('ws://127.0.0.1:5001/test');
          websocket.onopen = () => setConnected(true);
          websocket.onclose = () => setConnected(false);
          websocket.onmessage = () => {
            setReceived(count => count + 1);
          };
          websocketRef.current = websocket;
        }}
        disabled={connected}
      >
        Connect
      </button>
      <button
        onClick={async () => {
          setSent(count => count + 1);
          websocketRef.current?.send('A'.repeat(8192));
        }}
        disabled={!connected}
      >
        Send payload
      </button>
      <div>Sent: {sent}</div>
      <div>Received: {received}</div>
    </div>
  );
};
