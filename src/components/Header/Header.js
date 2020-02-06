import React from 'react';
import './style.css';
import Logo from '../../assets/Logo.png';
const Header = () => (
    <div className="header">
        <div id="main-header" className="header__logo">
            <img src={Logo} alt=""></img>
        </div>
        <h1>Welcome to Arcfind</h1>
    </div>
);
export default Header;