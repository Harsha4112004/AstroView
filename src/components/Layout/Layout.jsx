import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

function Layout() {
  return (
    <div className="relative bg-gradient-to-b from-[#1c1629] via-[#271E37] to-black min-h-screen flex flex-col overflow-hidden">
      {/* Background Layer */}
      

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
