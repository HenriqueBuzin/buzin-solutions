import Header from '../Header/Header';
import Main from '../Main/Main';
import background from './universe.gif';
import './Background.css';

function Background(): React.JSX.Element {
  return (
    <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="stripe-overlay">
        <Header />
        <Main />
      </div>
    </div>
  );
}

export default Background;
