import React, {useState} from "react";
import {ImgData} from './imagesData';

const HeaderImage=() =>{
    const imageIndex=Math.floor(Math.random() * ImgData.length);
    console.log(imageIndex);
    
    return (
        <>
        <img src={ImgData[imageIndex].path}  alt={ImgData[imageIndex].title}  className={ImgData[imageIndex].cName}/> 
        </>

    )
}
export default HeaderImage;