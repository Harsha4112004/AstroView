import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Apod from './components/Apod'


function App() {

  return (
    <div className='bg-black w-screen h-screen flex justify-center items-center text-stone-50 text-4xl flex-col'>
      <h1 className='mb-4'>Astronomy Picture Of The Day</h1>
      <Apod />
      
      
    </div>
  )
}

export default App
