import React from 'react'
import '../assets/game/layout.scss'
import { Outlet } from 'react-router-dom'

export default function Home() {
   return (
      <div className="home-container">
         <Outlet />
      </div>
   )
}
