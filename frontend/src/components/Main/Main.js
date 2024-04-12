import React from 'react';
import './Main.css'; // Make sure to import the CSS
import logo from './logo.png'; // Import the logo image directly
import background from './universe.gif'; // Import the background image

const Main = () => (
  <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
    <div className="stripe-overlay">
      <div className="content">
        <img src={logo} alt="Logo" className="logo"/>
        <p className="tagline">O céu é o limite </p>
      </div>
    </div>
  </div>
);

export default Main;
