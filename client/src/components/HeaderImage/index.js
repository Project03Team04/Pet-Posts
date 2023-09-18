import React, {useState} from "react";
import {ImgData} from './ImgData';
import {motion} from 'framer-motion';

const HeaderImage=() =>{
    const imageIndex=Math.floor(Math.random() * ImgData.length);
    console.log(imageIndex);
    
    return (
        <div>
        <img src={ImgData[imageIndex].path}  alt={ImgData[imageIndex].title}  className={ImgData[imageIndex].cName}
        animate={{ x: [0,100, 200,100], scale:1}} initial={{scale:0}}
        transition={{duration:3}}/> 
        </div>

    )
}
export default HeaderImage;