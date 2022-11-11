import React, { useState, useEffect } from "react";
//axios
import axios from "axios";
//router dom
import { Link } from "react-router-dom";
//react icon
import { GrFormNext } from "react-icons/gr";
import { VscGraphLine } from "react-icons/vsc";
import { GrMoney } from "react-icons/gr";
//components
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
//images
import machPic from "../images/washing-machine-svgrepo-com.svg";

function Dashboard() {
  //get data
  const [getNewData, setGetNewData] = useState(undefined);
  const [unavilableMachs, setUnavilableMachs] = useState(undefined);
  //handle sidebar
  const [isSideBarActive, setisSideBarActive] = useState(false);

  const getData = async () => {
    try {
      const data = await axios.get("/api/get").then((res) => {
        const getData = res.data.Result;
        setGetNewData(getData);
        if (getData.filter((item) => item.status === "unavailable")) {
          setUnavilableMachs(
            getData.filter((item) => item.status === "unavailable")
          );
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log();

  return (
    <div className="flex">
      <Sidebar
        isSideBarActive={isSideBarActive}
        setisSideBarActive={setisSideBarActive}
      />
      {getNewData === undefined ? (
        <Loading />
      ) : (
        <section
          className={`w-full font-barlow text-xl font-semibold flex flex-col bg-[#f9faf9] ${
            isSideBarActive ? "hidden" : "block"
          }`}
        >
          <h3 className="flex p-5">
            <Link to="/" className="text-gray-800 hover:text-gray-600">Laundry Management System</Link>
            <GrFormNext className="self-center" />
            <span>Dashboard</span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 text-white text-xl font-semibold">
            <article className="flex py-5 bg-green-400 m-5 items-center rounded-lg">
              <img src={machPic} alt="" className="h-28 w-28" />
              {getNewData === undefined ? (
                <Loading />
              ) : (
                <h2 className="text-3xl px-3">{getNewData.length}</h2>
              )}
              <p>Total Washing Machine</p>
            </article>
            <article className="flex py-5 bg-red-500 m-5 items-center rounded-lg">
              <img src={machPic} alt="" className="h-28 w-28" />
              {getNewData === undefined ? (
                <Loading />
              ) : (
                <h2 className="text-3xl px-3">{unavilableMachs.length}</h2>
              )}
              <p>Washing Machine Pending</p>
            </article>
            <article className="flex py-5 bg-sky-400 m-5 items-center rounded-lg">
              <VscGraphLine className="h-28 w-28 ml-5 fill-black" />
              <h2 className="text-3xl px-3">1234</h2>
              <p>Weekly Customer Used</p>
            </article>
            <article className="flex py-5 bg-violet-600 m-5 items-center rounded-lg">
              <GrMoney className="h-28 w-28 ml-5" />
              <h2 className="text-3xl px-3">123,456 ฿</h2>
              <p>Total Earning</p>
            </article>
          </div>
        </section>
      )}
    </div>
  );
}

export default Dashboard;
