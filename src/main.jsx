import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import Layout from './components/Layout/Layout.jsx'
import Apod from './components/Apod.jsx'
import Home from './components/Home.jsx'
import Earth from './components/Earth.jsx'
import Curiosity from './components/Rovers/Curiosity.jsx'
import RoverLayout from './components/Rovers/RoverLayout.jsx'
import Rover from './components/Rovers/Rover.jsx'
import Opportunity from './components/Rovers/Opportunity.jsx'
import Spirit from './components/Rovers/Spirit.jsx'
import Asteroid from './components/Asteroid.jsx'
import SpaceWeather from './components/SpaceWeather.jsx'
import Error from './Error.jsx'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<Layout />}>
    <Route path='' element={<Home />} />
   // <Route path='apod' element={<Apod />} />
    <Route path='earth' element={<Earth />} />
    <Route path='mars_rover' element={<RoverLayout />}>
      <Route path='' element={<Rover />} />
      <Route path='curiosity' element={<Curiosity/>}/>
      <Route path='opportunity' element={<Opportunity />} />
      <Route path='spirit' element={<Spirit />} />
    </Route>
    <Route path='asteroid' element={<Asteroid/>}/>
    <Route path='space_weather' element={<SpaceWeather/>}/>
    <Route path='*' element={<Error/>} />
  </Route>
))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
