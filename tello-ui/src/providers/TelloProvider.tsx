import { createContext, useContext, FC, useState, useRef } from 'react'

// export type VideoFrame = {
//   image: HTMLImageElement;
//   number: number;
// }

export interface TelloContextState {
  // sdk?: string;
  // battery?: number;
  websocket?: WebSocket;
  connect: (host:string) => void;
  // frame: VideoFrame
}

const defaults: TelloContextState = {
  connect: () => {},
  // frame: {
  //   image: new Image(),
  //   number: 0
  // }
};

const TelloContext = createContext<TelloContextState>(defaults);

const TelloProvider: FC = ({ children }) => {
  // const [sdk, setSdk] = useState<string|undefined>();
  const [websocket, setWebsocket] = useState<WebSocket|undefined>();

  // const frameRef = useRef<VideoFrame>(frame);

  const connect = (host:string) => {
    const _connect = () => {
      const url = `ws://${host}:22222`
      console.log(`[TelloProvider] CONNECT ${url}`)
      const ws = new WebSocket(url);
      setWebsocket(ws);
    
      ws.onopen = () => {
        console.log(`[TelloProvider] OPEN`)
      }
      
      ws.onclose = () => {
        console.log(`[TelloProvider] CLOSED`)
        // setTimeout(_connect, 1000)
      }
    }
    _connect();
  }

  return (
    <TelloContext.Provider
      value={{
        // sdk,
        websocket,
        connect,
      }}
    >
      {children}
    </TelloContext.Provider>
  );
};

export function useTello() {
  return useContext(TelloContext);
}

export default TelloProvider;