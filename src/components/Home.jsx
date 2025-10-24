import React from 'react'
import { useNavigate } from 'react-router'
import Cards from './Asthetics/Cards'


function Home() {
    const navigate = useNavigate("/Apod")
    return (
        <div className="flex w-full min-h-screen items-center mt-2 text-white flex-col pl-4 pr-4">
            <div className='flex flex-row gap-80'>
                <div>
                    <h1 className='text-5xl font-bold'>AstroView</h1>
                    <p className='text-xl mt-1'>- The cosmos, decoded for you.</p>
                    <p className='w-150 mt-6 text-lg'>Discover the cosmos like never before. AstroView brings you NASA’s Astronomy Picture of the Day, real-time asteroid data, epic space weather alerts, and breathtaking images from the Mars rovers — all in one place.</p>
                    <button className="bg-[#9d85e6] font-bold text-black p-3 hover:bg-black hover:text-white rounded-4xl mt-6" onClick={()=>{navigate("/apod")}}>Explore!</button>
                </div>
                <div>
                    <img src='/Astronaut.jpg' alt="img" className='w-100 rounded-2xl' />
                </div>
            </div>
            <h1 className='mt-14 flex items-start h-fit w-full text-3xl ml-40'>Features</h1>
            <div className='flex flex-row ml-8 gap-4 mt-4 mb-4'>
                <Cards title={"Near-Earth Objects"} description={"Keep a eye on rocks flying close to planets. "} imageUrl={"https://d.newsweek.com/en/full/2292471/asteroid.webp?w=790&f=461c2a02efe3a443797557d60cc243bf"}/>
                <Cards title={"Space Weather"} description={"Stay infomed about CME, flares, storms ,etc."} imageUrl={"https://images.pexels.com/photos/87611/sun-fireball-solar-flare-sunlight-87611.jpeg"}/>
                <Cards title={"Mars Rover Feed"} description={"Explore the red planet through the eyes of NASA's rovers."} imageUrl={"https://cdn.britannica.com/93/93293-050-92D12F74/Artist-conception-Mars-Exploration-Rover.jpg"}/>
            </div>
            <div  className='w-full h-fit flex items-start flex-col mt-10'>
                <h1 className='text-3xl ml-15'>Your journey through the cosmos starts here</h1>
                <p className='ml-15 mb-4'>The universe isn't far away- it's just one click closer</p>
                <button className="bg-[#9d85e6] font-bold text-black p-3 hover:bg-black hover:text-white rounded-4xl mt-2 ml-15" onClick={()=>{navigate("/apod")}}>Begin your journey</button>
            </div>
        </div>
    )
}

export default Home
