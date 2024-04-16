import React from 'react'
import '../assets/game/layout.scss'
import { Outlet } from 'react-router-dom'

export default function GameHome() {
   return (
      <div className="gamehome-container">
         <Outlet />
      </div>
   )
}
