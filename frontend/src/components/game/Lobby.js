/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Ranking from './Ranking'
import EventList from './EventList'
import Avatar from './Avatar'
import './lobby.scss'
import axios from 'axios'
import url from '../../url.json'

export default function Lobby() {
   const [teamRanking, setTeamRanking] = useState()
   const [ranking, setRanking] = useState()

   const getGroupRanking = async () => {
      try {
         const response = await axios.get(
            `${url.backendHost}api/nodes/all/ranking/${localStorage.getItem('groupId')}`,
            {
               headers: {
                  authorization: 'Bearer JWT Token',
               },
            },
         )
         setTeamRanking(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   const getRanking = async () => {
      try {
         const response = await axios.get(`${url.backendHost}api/nodes`, {
            headers: {
               authorization: 'Bearer JWT Token',
            },
         })
         setRanking(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getGroupRanking()
      getRanking()
   }, [])

   useEffect(() => {
      if (ranking) {
         const name = localStorage.getItem('name')
         const myselfRank =
            ranking.findIndex((item) => item.author === name) + 1
         localStorage.setItem('rankingNumber', myselfRank)
      }
   }, [ranking])

   return (
      <>
         <div className="lobby-container">
            <EventList />
            {ranking && teamRanking && (
               <Ranking teamRanking={teamRanking} allRanking={ranking} />
            )}
            <Avatar />
         </div>
      </>
   )
}
