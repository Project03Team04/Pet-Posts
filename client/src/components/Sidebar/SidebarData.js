import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData=[
    {
        title: 'Home',
        path: '../../assets/images/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'

    },
    {
        title: 'My Posts',
        path: '/me',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'

    },
    {
        title: 'Profile',
        path: '/Profile',
        icon: < FaIcons.FaUser />,
        cName: 'nav-text'

    },
    {
        title: 'Friends',
        path: '/friends',
        icon: <AiIcons.AiOutlineTeam />,
        cName: 'nav-text'

    }
   
]