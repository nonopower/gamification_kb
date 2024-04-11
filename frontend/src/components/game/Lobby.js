import React from 'react'
import Ranking from './Ranking'
import EventList from './EventList'
import Avatar from './Avatar'
import './lobby.scss'

export default function Lobby() {
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
