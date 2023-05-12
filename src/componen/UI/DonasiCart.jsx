import React from "react";
import productImg from '../../assets/images/arm-chair-01.jpg'
import ProgressBar from 'react-bootstrap/ProgressBar';
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import '../../stle/donasiCart.css'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartAction } from "../../Redux/Slice/cartSlice";
import { toast } from "react-toastify";



const DonasiCart = ({item}) => {

    const dispatch = useDispatch();
    const now = ((item.DonasiAwal/item.JlhDonasi)*100);

    const addToCart = () =>{
        dispatch(
        cartAction,addItem({
            id: item.id,
            Title:item.Title,
            JlhDonasi: item.JlhDonasi,
            image: item.imgUrl,
            DonasiAwal: item.DonasiAwal,
        })
    );
    
    toast.success('Product Added')
    };
    return(
        <Col lg='3' md='4'>
            <div className="Donasi_item">
            <div className="donasi_img">
                <motion.img whileHover={{scale: 0.9}} src={item.imgUrl} alt="" className="" />
            </div>
            <div className="p-2 Donasi_info">
                <h3 className="Donasi_name"><Link to={`/donasi/${item.id}`}>{item.Title}</Link></h3>
                <span>Rp.{item.DonasiAwal}</span>
                <ProgressBar className="text-black" now={now} label= {`${now}%`}  />
                <div className="donasi_card-bottom d-flex align-items-center justify-content-between">
                    <span className="dana">Terkumpul Dari Rp.{item.JlhDonasi}</span>
                    <motion.span whileTap={{scale:1.2}} onClick={addToCart}>
                        {/* <i className="ri-add-line"></i> */}
                    </motion.span>
                </div>
            </div>
        </div>
        </Col>
    )
}
export default DonasiCart