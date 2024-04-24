/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Ranking from './Ranking'
import EventList from './EventList'
import Avatar from './Avatar'
import './lobby.scss'

export default function Lobby() {
   const [seconds, setSeconds] = useState(0)
   const name = localStorage.getItem('name')

   // 上線計時器
   // let intervalId

   // useEffect(() => {
   //    if (name && name !== '') {
   //       intervalId = setInterval(() => {
   //          setSeconds((prevSeconds) => prevSeconds + 1)
   //       }, 1000)
   //    }

   //    return () => clearInterval(intervalId)
   // }, [])

   // useEffect(() => {
   //    console.log(seconds)
   // }, [seconds])

   return (
      <>
         <div className="lobby-container">
            <EventList />
            <Ranking />
            <Avatar />
         </div>
      </>
   )
}
