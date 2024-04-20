import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Avatar() {
   const navigate = useNavigate()

   return (
      <>
         <div
            className="avatar-container"
            onClick={() => navigate('/game/user')}
         >
            <img src="/game/gold-medal.png" alt="" />
            <p>Lv.1</p>
            <p>nono琪</p>
         </div>
      </>
   )
}
