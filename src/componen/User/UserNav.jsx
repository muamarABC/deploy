import React from 'react'
import { Container, Row, Col } from 'reactstrap'
// import useAuth from '../../custom-hooks/useAuth'
import { NavLink } from 'react-router-dom'
import "../../stle/DonasiNav.css"

const AdminNav = () => {

    // const {currentUser} = useAuth();
    const user_nav = [
        {
            display: 'Home'
            ,path:'/home'
        }
        ,{
            display: 'Add-Donasi'
            ,path:'dashboard/add-donasi'
        }
        ,{
            display: 'All-Donasi'
            ,path:'dashboard/all-donasi'
        }
    ]

  return (
    <>
   <header className='admin_header'>
    <div className="admin_nav-top">
        <Container>
            <div className="admin_nav-wrapper-top">
                <div className="logo">
                    <h2>MariDonasi</h2>
                </div>
                <div className="admin_navigation">
                <ul className="admin_menu-list" style={{paddingTop:20}}>
                    {
                        user_nav.map(item=>(
                            <li className="admin_menu_item">
                                <NavLink to={item.path} className={navClass => navClass.isActive ? 'active_admin-menu' : ''}>{item.display}</NavLink>
                            </li>
                        ))
                    }
                </ul>
            </div>
                <div className="admin_nav-top-right">
                </div>
            </div>
        </Container>
    </div>
   </header>
   </>
  )
}

export default AdminNav