import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/Footer.css'

const Footer = props => (
    <footer className="Footer text-center text-lg-start bg-dark text-muted">
        <div className="text-center p-4">
            © 2021 Copyright:
            <NavLink end to="/" className="text-reset fw-bold">
                Henrique Buzin
            </NavLink>
        </div>
    </footer>
)

export default Footer
