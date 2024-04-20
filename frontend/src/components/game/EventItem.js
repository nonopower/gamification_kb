import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function EventItem({ activity }) {
   const navigate = useNavigate()

   const handleClick = (e) => {
      e.preventDefault()

      localStorage.setItem('activityId', activity.id)
      navigate('/game/battle-lobby')
   }

   return (
      <>
         <div className="eventitem-container">
            <p>{activity.title}</p>
            <a href="" className="play" onClick={handleClick}>
               <img src="/game/play.png" alt="" />
               <img src="/game/play2.png" alt="" />
            </a>
         </div>
      </>
   )
}
