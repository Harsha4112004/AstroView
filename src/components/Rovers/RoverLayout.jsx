import React from 'react'
import { Outlet } from 'react-router-dom'


function RoverLayout() {
  return (
    <div className="relative bg-gradient-to-b from-[#1c1629] via-[#271E37] to-black min-h-screen flex flex-col overflow-hidden">
          <Outlet />
        
    </div>
  )
}

export default RoverLayout
