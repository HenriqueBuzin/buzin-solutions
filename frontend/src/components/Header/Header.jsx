import React from 'react';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li><a href="#portfolio">Portifólio</a></li>
                    <li><a href="#contact">Contato</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
