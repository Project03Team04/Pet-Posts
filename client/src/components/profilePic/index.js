import React, {useState} from "react";
//import {ImgData} from './ImgData';
const picData={
    title: "paws",
    link: "assets/images/dog-paw.png",
    cName: "profile-img-default"
}
const ProfilePic=() =>{
    
    
    return (
        <>
        <img src={picData.link}  alt={picData.title}  className={picData.cName}/> 
        </>

    )
}
export default ProfilePic;