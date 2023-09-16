import React, {useState} from "react";
//import {ImgData} from './ImgData';
const picData={
    title: "paws",
    link: "assets/images/paws,png",
    cName: "profile-img-default"
}
const ProfilePic=() =>{
    
    
    return (
        <>
        <img src={ImgData[imageIndex].path}  alt={ImgData[imageIndex].title}  className={ImgData[imageIndex].cName}/> 
        </>

    )
}
export default ProfilePic;