import React,{useState, useEffect} from 'react'
//axios
import axios from 'axios'
//images
import machPic from '../../images/washing-machine-svgrepo-com.svg'
//components
import InsertCoinPopUp from '../InsertCoinPopup'
import Timer  from '../Timer.js' 
import Loading from '../Loading'

function Mach5() {
    //this mach
    const indexThisMach = 4;
    //get data
    const [getNewData, setGetNewData] = useState(undefined);
    //status
    const [isPending, setIsPending] = useState(false)
    //popup handle
    const [showPopUp, setshowPopUp] = useState(false);
    //time counter
    const [timeCounter, setTimeCounter] = useState(undefined);

    const handlePopUp = (event) => {
      if (getNewData[indexThisMach].status === 'unavailable') {
        alert('This Mach is not available!')
      }else if(getNewData[indexThisMach].status !== 'unavailable') {
        setshowPopUp(true);
      }
      };

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
      }, [isPending])
      


  return (
    <main className='self-center'>
      <article
            className="flex items-stretch justify-around m-1 bg-sky-100 rounded-lg"
            >
            <img src={machPic} alt="" className="w-48 h-48" />
            <div className="self-center">
              <p className="text-xl font-bold py-3">
                Washing No#<span>{indexThisMach+1}</span>
              </p>
              <div className="flex justify-center items-center text-xl font-bold py-3">
                Status:
                {getNewData === undefined ? <Loading /> : 
                <span
                className={`rounded-md p-2 ${
                  getNewData[indexThisMach].status === 'unavailable' ? "bg-red-600" : "bg-green-400"
                }`}
              >
                {getNewData[indexThisMach].status}
              </span>
                }
              </div>
              <p
                className={`text-xl font-bold py-3 ${isPending ? 'visible' : 'invisible'}`}
              >
                <Timer
                timeCounter={timeCounter}
                setTimeCounter={setTimeCounter}
                indexThisMach={indexThisMach}
                setIsPending={setIsPending}
                />
              </p>
            </div>
            {getNewData === undefined ? <Loading /> :
              <button
              className={`self-center bg-sky-400 hover:bg-sky-300 rounded-lg h-1/4 w-1/5 py-3 text-xl font-semibold shadow-lg ${getNewData[indexThisMach].status === 'unavailable' ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={(event) => handlePopUp(event)}
            >
              Insert Coin!
            </button>
            }
            {showPopUp && (
              <InsertCoinPopUp
                showPopUp={showPopUp}
                setshowPopUp={setshowPopUp}
                setTimeCounter={setTimeCounter}
                indexThisMach={indexThisMach}
              />
            )}
        </article>        
    </main>
  )
}

export default Mach5