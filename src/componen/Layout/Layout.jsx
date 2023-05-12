import React from "react";
import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import Routes from "../../Routers/Routers"
import UserNav from "../User/UserNav";
import { useLocation } from "react-router-dom";



const Layout = () => {
    const location = useLocation();
    return (
        <>
        {
            location.pathname.startsWith('/dashboard') ? <UserNav/> : <Header/>
        }
            <div>
                <Routes/>
            </div>
            <Footer/>
        </>
    )
}
export default Layout