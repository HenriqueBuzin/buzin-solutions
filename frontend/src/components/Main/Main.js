import React from 'react';
import './Main.css';
import logo from './logo.png';

const Main = () => (
  <div className="content">
    <img src={logo} alt="Logo" className="logo"/>
    <p className="tagline">O céu é o limite&nbsp;</p>
  </div>
);

export default Main;
