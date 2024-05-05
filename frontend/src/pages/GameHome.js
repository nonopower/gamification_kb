import React from 'react'
import '../assets/game/layout.scss'
import { Outlet } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function GameHome() {
   const location = useLocation()

   const compareOnlineDuration = async () => {
      const loginTime = localStorage.getItem('login')
      const now = new Date().getTime()

      let onlineDuration = now - loginTime

      localStorage.setItem('online', onlineDuration)
   }

   useEffect(() => {
      compareOnlineDuration()
   }, [location])

   return (
      <div className="gamehome-container">
         <Outlet />
      </div>
   )
}
