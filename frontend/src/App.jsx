import Background from './components/Background/Background.jsx';
import Portfolio from './components/Portfolio/Portfolio.jsx';
import React, { useEffect } from 'react';
import './i18n/i18n.jsx';
import './App.css';

function App() {
  useEffect(() => {
    document.title = "Buzin Solutions";
  }, []);

  return (
    <div className="App">
      <Background />
      <Portfolio />
    </div>
  );
}

export default App;
