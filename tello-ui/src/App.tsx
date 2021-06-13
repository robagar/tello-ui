import React from 'react';
import TelloProvider from './providers/TelloProvider';
import TelloVideo from './components/TelloVideo';
import Tello from './components/Tello';
import './App.css';


function App() {
  return (
    <div className="App">
      <TelloProvider>
        <TelloVideo />
        <Tello />
      </TelloProvider>
    </div>
  );
}

export default App;
