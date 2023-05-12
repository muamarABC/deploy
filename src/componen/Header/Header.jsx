import React, { useEffect, useRef } from "react";
import {Container, Row} from "reactstrap";
import { NavLink, useNavigate, Link } from "react-router-dom";
import UserIcon from "../../assets/images/user-icon.png";
import './header.css';
import { signOut, updateCurrentUser } from "firebase/auth";
import useAuth from "../../custom-hooks/useAuth";
import { motion } from "framer-motion";
import { auth } from "../../../firebase.config";
import { toast } from "react-toastify";

const nav_link = [
    {
        path: 'home',
        display: 'Home'
    },
    {
        path: 'donasi',
        display: 'Donasi'
    },{
        path: 'dashboard/add-donasi',
        display: 'Galang Donasi'
    },
    {
        path: 'histori',
        display: 'History'
    }
]

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const {currentUser} = useAuth();
    const profileActionRef = useRef();

    const logout = () =>{
        signOut(auth).then(() => {
            toast.success("Berhasil LogOut")
            navigate('/home')
        }).catch(err => {
            toast.error(err.massage)
        })
    };

    const menuToggle = () => menuRef.current.classList.toggle("active_menu");

    const toogleProfileActions = () => profileActionRef.current.classList.toggle("show_profileActions")

    return (
    <header className="header" ref={headerRef}>
        <Container>
            <Row>
                <div className="nav_wrapper">
                    <div className="logo">
                        <div>
                            <h1>MariDonasi</h1>
                        </div>
                    </div>
                    <div className="navigation" ref={menuRef} onClick={menuToggle}>
                        <motion.ul className="menu">
                            {
                                nav_link.map((item, index)=>(
                                    <li className="nav_item" key={index}>
                                        <NavLink to={item.path} className={(navClasss)=>navClasss.isActive ? 'nav_active':''}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </motion.ul>
                    </div>
                    <div className="nav_icons">
                        <div className="profile"> 
                        <span>
                        <motion.img 
                        whileTap={{scale:1.2}} 
                        src={currentUser ? currentUser.photoURL: UserIcon} 
                        alt=""
                        onClick={toogleProfileActions}/>
                         <span onClick={logout}>Logout</span>
                        <div 
                        className="profile_actions" 
                        ref={profileActionRef} 
                        onClick={toogleProfileActions}>
                            {
                                currentUser ? (
                                <span onClick={logout}>Logout</span> ): (<div className="d-flex align-items-center justify-content-center flex-column">
                                    <Link to='/Regis'>Registrasi</Link>
                                    <Link to='/Login'> Login</Link>
                                    </div>)
                            }
                        </div>
                        </span>
                        <div className="mobile_menu">
                        <span onClick={menuToggle}>
                            <i className="ri-menu-line"></i></span>
                        </div>
                        </div>
                    </div>
                    
                    
                </div>
            </Row>
        </Container>
    </header>
    )
}

export default Header