import React from 'react';
import './Background.css';
import Header from '../Header/Header.jsx';
import Main from '../Main/Main.jsx';
import background from './universe.gif';

const Background = () => (
    <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
        <div className="stripe-overlay">
            <Header />
            <Main />
        </div>
    </div>
);

export default Background;
