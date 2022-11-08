import React,{useState} from "react";
//react router dom
import { NavLink, Link } from "react-router-dom";

//icon
import { AiOutlineHome, AiFillPieChart } from "react-icons/ai";
import { MdOutlineLocalLaundryService, MdNavigateNext } from "react-icons/md";
import { BsClipboardCheck } from "react-icons/bs";
import { GiDolphin, GiHamburgerMenu } from "react-icons/gi";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";
// import { FaBars, FaTimes } from "react-icons/fa";

function Sidebar({isSideBarActive, setisSideBarActive}) {

    const handleSidebar = () => setisSideBarActive(!isSideBarActive)


  return (
    <main>
      <aside className={`z-50 lg:w-64 h-[79.25rem] lg:h-screen ${isSideBarActive ? 'w-screen ease-in-out duration-300' : 'w-full ease-in-out duration-300'}`} aria-label="Sidebar">
        <div className="h-full py-4 px-3 bg-gray-50 dark:bg-gray-800">
          <Link to="/" className="flex items-center pl-2.5 mb-5">
            <GiDolphin className="fill-white mr-3 w-8 h-8 sm:h-7" />
            <span className={`self-center text-xl font-semibold whitespace-nowrap dark:text-white lg:block ${isSideBarActive ? '' : 'hidden'}`}>
              Dolphin
            </span>
          </Link>
          <div className={`absolute w-8 h-8 flex items-center justify-center bg-white rounded-full drop-shadow-xl lg:invisible ${isSideBarActive ? 'left-[38rem] md:left-[45rem] ease-in-out duration-300' : 'left-16 ease-in-out duration-300'}`} onClick={handleSidebar}>
            {isSideBarActive ? (<GrFormPrevious className="fill-white w-7 h-7" />) : (<GrFormNext className="fill-white w-7 h-7" />)}
          </div>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/"
                className={({isActive}) => isActive ? 'navlink-actve' : 'navlink'}
              >
                <AiOutlineHome
                  aria-hidden="true"
                  className="fill-white w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className={`ml-3 lg:block ${isSideBarActive ? 'block ease-in-out duration-300' : 'hidden ease-in-out duration-300'}`}>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({isActive}) => isActive ? 'navlink-actve' : 'navlink'}
              >
                <AiFillPieChart
                  aria-hidden="true"
                  className="fill-white w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className={`ml-3 lg:block ${isSideBarActive ? 'block ease-in-out duration-300' : 'hidden'}`}>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/washing-machines"
                className={({isActive}) => isActive ? 'navlink-actve' : 'navlink'}
              >
                <MdOutlineLocalLaundryService
                  aria-hidden="true"
                  className="fill-white w-8 h-8 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                />
                <span className={`ml-3 lg:block ${isSideBarActive ? 'block ease-in-out duration-300' : 'hidden'}`}>Washing Machine</span>
              </NavLink>
            </li>
            
          </ul>
        </div>
      </aside>
    </main>
  );
}

export default Sidebar;
