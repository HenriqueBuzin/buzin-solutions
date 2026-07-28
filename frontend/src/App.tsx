import { useEffect } from 'react';
import Background from './components/Background/Background';
import Portfolio from './components/Portfolio/Portfolio';
import './i18n/i18n';
import './App.css';

function App(): React.JSX.Element {
  useEffect(() => {
    document.title = 'Buzin Solutions';
  }, []);

  return (
    <div className="App">
      <Background />
      <Portfolio />
    </div>
  );
}

export default App;
