import React from 'react'
import './bag.scss'
import eventBus from '../../utils/EventBus'

export default function Bag() {
   const back = (e) => {
      e.preventDefault()
      eventBus.emit('bag-status', false)
   }
   return (
      <>
         <div className="mask-dark">
            <div className="bag-container">
               <h1>Backpack</h1>
               <div className="monster-area">
                  <div className="monster-item">
                     <img src="/game/new_monster/cat.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/corgi swim.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/dog jump.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/dog sleep.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/dog swim.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/duck.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/fox.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/lion.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/seal.gif" alt="" />
                  </div>
                  <div className="monster-item">
                     <img src="/game/new_monster/whale.gif" alt="" />
                  </div>
               </div>
            </div>
            <button onClick={back}>Back</button>
         </div>
      </>
   )
}
