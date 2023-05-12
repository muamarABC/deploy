import React, { useState } from "react";
import CommonSection from "../componen/UI/CommonSection";
import Helmet from "../componen/Helmet/Helmet";
import { Container, Row, Col } from "reactstrap";
import '../stle/Donasi.css'
// import Donasi from '../assets/data/DataDonasi'
import DonasiList from "../componen/UI/DonasiList";
import { useNavigate } from 'react-router-dom';
import useGetData from "../custom-hooks/useGetData";

const donasi = () => {
    const navigate = useNavigate();
    const {data:Donasii} = useGetData("Donasi");
    const [Donasidata, setDonasiData] = useState(Donasii);
    // const DonasiLain = Donasii.filter(item=> item.category=="Kebakaran"||"Banjir"||"Gempa"||"Erupsi");


    const handleFilter = (e)=>{
        const filterValue = e.target.value;
        if(filterValue=="Kebakaran"){
            const filteredDonasi = Donasii.filter((item) => item.category == "Kebakaran");
            setDonasiData(filteredDonasi);
        };

        if(filterValue=="Banjir"){
            const filteredDonasi = Donasii.filter((item) => item.category == "Banjir");
            setDonasiData(filteredDonasi);
        };
 
        if(filterValue=="Gempa"){
            const filteredDonasi = Donasii.filter((item) => item.category == "Gempa");
            setDonasiData(filteredDonasi);
        };

        if(filterValue=="Erupsi"){
            const filteredDonasi = Donasii.filter((item) => item.category == "Erupsi");
            setDonasiData(filteredDonasi);
        };
};
    const hanldeSearch = e => {
        const seacrhTerm = e.target.value
        const seacrhDonasi = Donasii.filter(item => item.Title.toLowerCase().includes(seacrhTerm.toLowerCase()))
        setDonasiData(seacrhDonasi)
    }

    return (
        <Helmet title='Donasi'>
            <CommonSection title='Donasi'/>
            <section>
                <Container>
                    <Row>
                        <Col lg='3' md='3'>
                            <div className="filter_widget">
                                <select onChange={handleFilter}>
                                    
                                <option onClick={() => navigate('/donasi')}> Berdasarkan Kategori</option>
                                    <option value="Kebakaran">Kebakaran</option>
                                    <option value="Banjir">Banjir</option>
                                    <option value="Gempa">Gempa</option>
                                    <option value="Erupsi">Gunung Meletus</option>
                                </select>
                                
                            </div>
                        </Col>
                        <Col lg='6' md='6'>
                            <div className="seacrh_box">
                                <input 
                                type="text" 
                                placeholder="Cari..."
                                onChange={hanldeSearch}
                                />
                                <span><i className="ri-search-eye-line"></i></span> 
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <Row>
                        {Donasii.length == 0 ? <h1>Tidak Ada Donasi</h1> : <DonasiList data={Donasidata}/>
                        }
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default donasi