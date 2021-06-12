import React from 'react';
import TelloProvider from './providers/TelloProvider';
import TelloVideo from './components/TelloVideo';
import './App.css';


function App() {
  return (
    <div className="App">
      <TelloProvider>
        <TelloVideo />
      </TelloProvider>
    </div>
  );
}

export default App;
