import React, {useState, useEffect, lazy, Suspense} from 'react';
import './App.css';
//react router dom
import {BrowserRouter, NavLink, Routes, Route} from 'react-router-dom'
//pages
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const WashingMachines = lazy(() => import('./pages/WashingMachines'));

function App() {
  // const [backEndData, setBackEndData] = useState();
  const [unavilableMachs, setUnavilableMachs] = useState([])

  // useEffect(() => {
  //   fetch("/api/get")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const getData = data.Result;
  //       setBackEndData(getData);
  //       if(getData.filter(item=> item.status == 'unavailable')) {
  //         setUnavilableMachs(getData.filter(item=> item.status == 'unavailable'))
  //       }
  //     });
  // }, []);

  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/washing-machines" element={<WashingMachines />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
