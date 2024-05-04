/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Ranking from './Ranking'
import EventList from './EventList'
import Avatar from './Avatar'
import './lobby.scss'
import axios from 'axios'
import url from '../../url.json'

export default function Lobby() {
   const getGroupRanking = async () => {
      const fetchData = async () => {
         axios.get(
            `${url.backendHost}api/nodes/all/ranking/${localStorage.getItem('groupId')}`,
            {
               headers: {
                  authorization: 'Bearer JWT Token',
               },
            },
         )
      }

      // await fetchData().then((res) => {
      //    console.log(fetchData)
      // })
   }

   useEffect(() => {
      getGroupRanking()
   }, [])

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
