import React, { useState } from "react";
//images
import insertCoinPic from "../images/insert-coins-logo.jpg";
import qrLine from '../images/QR_Line_Group.JPG'
//icons
import { ImCross } from "react-icons/im";

function InsertCoinPopup({
  showPopUp,
  setshowPopUp,
  isStart,
  setIsStart,
  indexThisMach,
  setTimeCounter
}) {
  const [insertCoin, setInsertCoin] = useState(0);

  const addCoin = () => {
    if (insertCoin < 20) {
      setInsertCoin(insertCoin + 10);
    } else if (insertCoin === 20) {
      alert("You already inserted coin!");
    }
  };

  const handleStart = () => {
    fetch("/api/update", {
      method: 'PUT',
      body: JSON.stringify({
        "id": indexThisMach,
        "status": "unavailable"
      }),
      headers: {'Content-Type': 'application/json'}
    });
    if (insertCoin < 20) {
      alert("Please insert coin!");
    } else {
      console.log("Start!");
      setIsStart(true);
      setTimeCounter(70);
      setshowPopUp(false)
    }
  };


  return (
    <main className="absolute flex justify-center z-50 top-0 left-0 bg-black bg-opacity-50 w-screen h-screen">
      <ImCross
        className="fill-white w-8 h-8 translate-x-[32rem] translate-y-[5rem] cursor-pointer"
        onClick={() => setshowPopUp(false)}
      />
      <section className="font-barlow flex flex-col items-center justify-center lg:w-[30rem] lg:h-[30rem] mt-32 bg-white h-96 rounded-xl overflow-hidden drop-shadow-2xl">
        <h1>Scan QR code to recieve notification!</h1>
        <img src={qrLine} alt="" className="sm:w-3/12 md:w-1/4 lg:w-1/2" />
        <p className="font-bold font-barlow">Please insert 20฿ to start!</p>
        <div className="flex justify-center w-full">
          <h3 className="self-center text-center w-28 bg-sky-500 p-10 text-4xl text-white rounded-xl drop-shadow-xl">
            {insertCoin}
          </h3>
          <div className="flex flex-col ml-5">
            <button
              className={`bg-amber-400 hover:bg-amber-500 text-white rounded-lg my-2 py-3 px-10 shadow-lg ${
                insertCoin === 20 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
              onClick={addCoin}
            >
              Add 10฿
            </button>
            <button
              className={`text-white rounded-lg my-2 py-3 px-10 shadow-lg ${
                insertCoin === 20
                  ? "bg-sky-700 cursor-pointer"
                  : "bg-sky-300 hover:cursor-not-allowed"
              }`}
              onClick={handleStart}
            >
              Start
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default InsertCoinPopup;
