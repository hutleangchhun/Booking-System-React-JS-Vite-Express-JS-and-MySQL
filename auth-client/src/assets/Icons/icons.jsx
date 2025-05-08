import React from 'react';
import { FaBeer, FaHome, FaUser, FaCamera, FaEdit, FaAngleLeft, FaAngleRight, FaUserFriends, FaTaxi, FaTasks } from 'react-icons/fa';  // Import your icons here
import { IoPersonAdd, IoLogOut } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDelete, MdCancel, MdDashboard } from "react-icons/md";
import { RiBuilding2Fill } from "react-icons/ri";

// Mapping icons to their respective components
const iconMap = {
    beer: FaBeer,
    home: FaHome,
    user: FaUser,
    camera: FaCamera,
    add: IoPersonAdd,
    update: FaEdit,
    delete: MdDelete,
    pageLeft: FaAngleLeft,
    pageRight: FaAngleRight,
    checkMark: IoIosCheckmarkCircle,
    crossMark: MdCancel,
    dashboard: MdDashboard,
    userList: FaUserFriends,
    logout: IoLogOut,
    taxi: FaTaxi,
    booking: FaTasks,
    unit: RiBuilding2Fill,
};

const Icon = ({ name, className = '' }) => {
    const Icon = iconMap[name] || null;

    if (!Icon) {
        return null;
    }

    return (
        <Icon className={className} />
    );
};

export default Icon;
