import React from 'react';
import './header.styles.scss'
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from "../../firebase/firebase.utils";

const links = ['shop',
                'contact'
                ]

const renderLinks = links => links.map(link => (
    <Link className='option' to={link.replace(/\s/g, "")}>{link.toUpperCase()}</Link>
))

const Header = ({ currentUser }) => {
    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
               <Logo classNmae='logo'/>
            </Link>
            <div className="options">
                {renderLinks(links)}
                {
                    currentUser ?
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link to='signin'>SIGN IN</Link>
                }
            </div>
        </div>
    );
};

export default Header;
