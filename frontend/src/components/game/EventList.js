import React from 'react'
import EventItem from './EventItem'

export default function EventList() {
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
