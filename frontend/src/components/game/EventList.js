import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'
import axios from 'axios'
import config from '../../config.json'
import url from '../../url.json'

export default function EventList() {
   const name = localStorage.getItem('name')
   const [activities, setActivities] = useState([])
   const [ws, setWs] = useState(null)

   const initWebSocket = () => {
      ws.on('connect', () => {})

      ws.on('event02', (arg, callback) => {
         callback({
            status: 'event02 ok',
         })
      })
   }

   useEffect(() => {
      const getActivities = async () => {
         try {
            const fetchData = await axios.get(
               `${url.backendHost + config[4].myJoinedActivityList}/${localStorage.getItem('userId')}`,
               {
                  headers: {
                     authorization: 'Bearer JWT Token',
                  },
               },
            )
            setActivities(fetchData.data)
         } catch (err) {
            console.error(err)
         }
      }
      getActivities()

      if (ws) {
         initWebSocket()
      }
   }, [ws])

   return (
      <>
         <div className="eventlist-container">
            <h1>{name}的探究冒險</h1>
            <div className="list-container">
               <div className="list">
                  {activities.map((activity) => (
                     <EventItem
                        key={activity.id}
                        activity={activity.ActivityGroup.Activity}
                     />
                  ))}
               </div>
            </div>
         </div>
      </>
   )
}
