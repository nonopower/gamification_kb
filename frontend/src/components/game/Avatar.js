import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Avatar() {
   const navigate = useNavigate()
   const name = localStorage.getItem('name')
   const role = localStorage.getItem('role') + '1.png'

   return (
      <>
         <div
            className="avatar-container"
            onClick={() => navigate('/game/user')}
         >
            <img src={role} alt="" />
            <p>Lv.1</p>
            <p>{name}</p>
         </div>
      </>
   )
}
