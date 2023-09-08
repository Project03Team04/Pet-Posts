import React, {useState} from "react";
import {ImgData} from './imagesData';
const styles={
    width: '10rem',
    height: '10rem'
}
const HeaderImage=() =>{
    const imageIndex=Math.floor(Math.random() * ImgData.length);
    console.log(imageIndex);
    
    return (
        <>
        <img src={ImgData[imageIndex].path}  alt={ImgData[imageIndex].title}  style={styles}/> 
        </>

    )
}
export default HeaderImage;