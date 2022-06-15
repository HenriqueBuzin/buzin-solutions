import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {

    return (
        <div className='Header'>
            <section className="banner">
                <div className='inner'>
                    <p>LABORATÓRIO VIRTUAL PARA SIMULAÇÃO DE FENÔMENOS FÍSICOS</p>
                </div>
            </section>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink end to="/" className="nav-link">
                                Início
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
