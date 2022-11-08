import React,{useState} from 'react'
//components
import Sidebar from '../components/Sidebar'
//images
import homePic from '../images/dolphin-310567_1280.png'

function Home({backEndData}) {
  const [isSideBarActive, setisSideBarActive] = useState(false)


  return (
    <main className='flex'>
      <Sidebar 
      isSideBarActive={isSideBarActive}
      setisSideBarActive={setisSideBarActive}
      />
      <section className={`w-full font-barlow text-4xl font-semibold flex flex-col items-center justify-center bg-[#f9faf9] ${isSideBarActive ? 'hidden' : 'block'}`}>
        <h1>Dolphin</h1>
        <p>24hrs wash & dry</p>
        <img src={homePic} alt="" className='w-1/2' />
      </section>
    </main>
  )
}

export default Home