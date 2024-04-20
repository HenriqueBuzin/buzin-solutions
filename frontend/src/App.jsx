import React, { useEffect } from 'react';
import Background from './components/Background/Background.jsx';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "Buzin Solutions";
  }, []);

  return (
    <div className="App">
      <Background />
    </div>
  );
}

export default App;
