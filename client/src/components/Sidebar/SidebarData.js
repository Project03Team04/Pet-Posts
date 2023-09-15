import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData=[
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'

    },
    {
        title: 'Profile',
        path: '/me',
        icon: < FaIcons.FaUser />,
        cName: 'nav-text'

    },
    // {
    //     title: 'Friends',
    //     path: '/friends',
    //     icon: <AiIcons.AiOutlineTeam />,
    //     cName: 'nav-text'

    // },
    {
        title: 'About',
        path: '/about',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'

    }
   
]
