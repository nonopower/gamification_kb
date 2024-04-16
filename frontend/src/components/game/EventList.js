import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'
import axios from 'axios'
import config from '../../config.json'
import url from '../../url.json'

export default function EventList() {
   const [activities, setActivities] = useState([])
   const [ws, setWs] = useState(null)

   const initWebSocket = () => {
      ws.on('connect', () => {
         // console.log(ws.id);
      })

      ws.on('event02', (arg, callback) => {
         // console.log(arg);
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
            // console.log(err);
         }
      }
      getActivities()

      if (ws) {
         initWebSocket()
      }
   }, [ws])

   useEffect(() => {
      console.log(activities)
   }, [activities])

   return (
      <>
         <div className="eventlist-container">
            <h1>我們的冒險主題</h1>
            <div className="list-container">
               <div className="list">
                  <EventItem />
                  <EventItem />
                  <EventItem />
                  <EventItem />
                  <EventItem />
                  <EventItem />
               </div>
            </div>
         </div>
      </>
   )
}
