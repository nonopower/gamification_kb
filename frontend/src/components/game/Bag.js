import React, { useEffect, useState } from 'react'
import './bag.scss'
import eventBus from '../../utils/EventBus'
import axios from 'axios'
import url from '../../url.json'

export default function Bag() {
   const groupId = localStorage.getItem('groupId')
   const activityId = localStorage.getItem('activityId')

   const [monsterList, setMonsterList] = useState()

   const back = (e) => {
      e.preventDefault()
      eventBus.emit('bag-status', false)
   }

   const getGroupBackPack = async () => {
      try {
         await axios
            .get(`${url.backendHost}api/backPack/getGroupBackPack`, {
               headers: {
                  authorization: 'Bearer JWT Token',
               },
               body: {
                  groupId,
                  activityId,
               },
            })
            .then((response) => {
               setMonsterList(response)
            })
      } catch (error) {
         console.error(error)
      }
   }

   // 要在別頁呼叫

   const addGroupPet = async () => {
      try {
         const response = await axios
            .post(`${url.backendHost}api/pet/insertPet`, {
               groupId,
               activityId,
               petNumber: '',
            })
            .then((response) => {
               console.log(response)
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getGroupBackPack()
   }, [])

   return (
      <>
         <div className="mask-dark">
            <div className="bag-container">
               <h1>Backpack</h1>
               <div className="monster-area">
                  {monsterList &&
                     monsterList.map((item, index) => {
                        ;<div className="monster-item" key={index}>
                           <img src={`/game/new_monster/${item}`} alt="" />
                        </div>
                     })}
               </div>
            </div>
            <button onClick={back}>Back</button>
         </div>
      </>
   )
}
