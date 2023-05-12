import React from "react";
import DonasiCart from './DonasiCart'

const DonasiList = ({data}) => {
    return(
        <>
        {
            data.map((item, index)=>(
                <DonasiCart item={item} key={index} />
            ))
        }
        </>
    );
};
export default DonasiList