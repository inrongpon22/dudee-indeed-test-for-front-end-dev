import React, {useEffect, useState} from 'react'

function Timer({timeCounter, setTimeCounter, indexThisMach, setIsStart, setIsPending}) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    //progress
    const [isFinish, setIsFinish] = useState(false)
    
    useEffect(() => {
        const seconds = Math.floor(timeCounter % 60);
        const minutes = Math.floor((timeCounter / 60) % 60);

        if(timeCounter >= 0) {
          setTimeout(() => setTimeCounter(timeCounter - 1), 1000);
          setMinutes(minutes);
          setSeconds(seconds);
          setIsFinish(false)
          setIsPending(true)
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
          setIsPending(false)
        };
  },[timeCounter])

    return (
    <span>Time: <span className={`${isFinish ? 'animate-ping' : 'animate-none' }`}>{minutes}:{seconds}</span> </span>
  )
}

export default Timer