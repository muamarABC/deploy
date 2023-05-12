import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../Page/Home"
import Donasi from "../Page/Donasi";
import DonasiDetail from "../Page/DonasiDetail"
import Login from "../Page/Login"
import Regis from "../Page/Regis"
import Protected from "./Protected";
import AddDonasi from "../componen/User/AddDonasi";
import AllDonasi from "../componen/User/AllDonasi";
import DataHistory from "../Page/DataHistory"


const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to='/home'/>}/>
            <Route path='home' element={<Home/>}/>
            <Route path="donasi" element={<Donasi/>}/>
            <Route path="donasi/:id" element={<DonasiDetail/>}/>
            <Route path="histori" element={<DataHistory/>}/>

            <Route path="/*" element={<Protected/>}>
                <Route path="dashboard/all-donasi" element={<AllDonasi/>}></Route>
                <Route path="dashboard/add-donasi" element={<AddDonasi/>}></Route>
            </Route>

            {/* <Route 
                path="galangDonasi" 
                element={
                    <Protected>
                        <Checkout/>
                    </Protected>
                }/> */}
            <Route path="regis" element={<Regis/>}/>
            <Route path="login" element={<Login/>}/>
        </Routes>
    )
}
export default Routers