import React, {useEffect, useState} from 'react'

function Timer({timeCounter, setTimeCounter, indexThisMach, setIsPending}) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    //progress
    const [isFinish, setIsFinish] = useState(false)
    
    useEffect(() => {
      const data = window.localStorage.getItem(`SET_COUNT_TIME_${indexThisMach}`);
      if(data !== null) setTimeCounter(parseInt(data))
    }, [])
    

    useEffect(() => {
        const seconds = Math.floor(timeCounter % 60);
        const minutes = Math.floor((timeCounter / 60) % 60);

        if(timeCounter >= 0) {
          setTimeout(() => setTimeCounter(timeCounter - 1), 1000);
          setMinutes(minutes);
          setSeconds(seconds);
          setIsFinish(false)
          setIsPending(true)
          window.localStorage.setItem(`SET_COUNT_TIME_${indexThisMach}`, parseInt(timeCounter))
        }if(timeCounter === 60) {
          console.log('send notify')
          fetch("/api/send-notify", {
            method: 'POST'
          })
        }else if(timeCounter < 1){
          console.log('Finish from timer');
          setIsFinish(true);
          //Update status
          fetch("/api/update", {
            method: 'PUT',
            body: JSON.stringify({
              "id": indexThisMach,
              "status": "available"
            }),
            headers: {'Content-Type': 'application/json'}
          });
          window.localStorage.removeItem(`SET_COUNT_TIME_${indexThisMach}`);
          setTimeout(() => {
            setIsPending(false)
          }, 3000);
        };
  },[timeCounter])

    return (
    <span>Time: <span className={`${isFinish ? 'animate-ping' : 'animate-none' }`}>{minutes}:{seconds}</span> </span>
  )
}

export default Timer