import React from 'react';
import './style.css';
import Logo from '../../assets/Logo.png';
import { motion } from 'framer-motion';

const Header = () => (
    <motion.div className="header"
        initial={{opacity: 0}}
        animate={{ opacity: 1}}
        transition = {{ duration: 2}}
    >
        <div id="main-header" className="header__logo">
            <img src={Logo} alt=""></img>
        </div>
        <h1>Welcome to Arcfind</h1>
    </motion.div>
);
export default Header;