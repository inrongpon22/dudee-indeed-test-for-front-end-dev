import React, { useState, useEffect } from "react";
//axios
import axios from "axios";
//router dom
import { Link } from "react-router-dom";
//react icon
import { GrFormNext } from "react-icons/gr";

//components
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
//all machines
import Mach1 from "../components/allMachines/Mach1";
import Mach2 from "../components/allMachines/Mach2";
import Mach3 from "../components/allMachines/Mach3";
import Mach4 from "../components/allMachines/Mach4";
import Mach5 from "../components/allMachines/Mach5";
import Mach6 from "../components/allMachines/Mach6";

function WashingMachines() {
  //get data
  const [getNewData, setGetNewData] = useState(undefined);
  //handle sidebar
  const [isSideBarActive, setisSideBarActive] = useState(false);

  const getData = async () => {
    try {
      const data = await axios.get("/api/get").then((res) => {
        const getData = res.data.Result;
        setGetNewData(getData);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = () => {
    console.log("clicked!");
    fetch("http://localhost:5000/api/send-notify", {
      method: "POST",
      form: {
        message: "test from click",
      },
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <main className="flex">
      <Sidebar
        isSideBarActive={isSideBarActive}
        setisSideBarActive={setisSideBarActive}
      />
      {getNewData === undefined ? (
        <Loading />
      ) : (
        <section
          className={`w-full font-barlow text-xl font-semibold flex flex-col bg-[#f9faf9] ${
            isSideBarActive
              ? "hidden ease-in-out duration-300"
              : "block ease-in-out duration-300"
          }`}
        >
          <h3 className="flex p-5">
            <Link to="/" className="text-gray-800 hover:text-gray-600">
              Laundry Management System
            </Link>
            <GrFormNext className="self-center" />
            <span className="hover:cursor-pointer" onClick={handleClick}>
              Washing Machines
            </span>
          </h3>
          <article className="grid lg:grid-cols-2">
            <Mach1 />
            <Mach2 />
            <Mach3 />
            <Mach4 />
            <Mach5 />
            <Mach6 />
          </article>
        </section>
      )}
    </main>
  );
}

export default WashingMachines;
