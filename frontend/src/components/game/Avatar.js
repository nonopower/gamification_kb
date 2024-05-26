import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
export default function Avatar() {
   const navigate = useNavigate()
   const name = localStorage.getItem('name')
   const role = localStorage.getItem('role') + '1.png'
   const [lv, setLv] = useState(1)
   const point = useSelector((state) => state.point)

   useEffect(() => {
      const newLv = point === 0 ? 1 : Math.ceil(point / 50)
      setLv(newLv)
   }, [])

   return (
      <>
         <div
            className="avatar-container"
            onClick={() => navigate('/game/user')}
         >
            <img src={role} alt="" />
            <p>Lv.{lv}</p>
            <p>{name}</p>
         </div>
      </>
   )
}
