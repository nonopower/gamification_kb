import React, { useEffect } from 'react'
import './bag.scss'
import eventBus from '../../utils/EventBus'
import axios from 'axios'
import url from '../../url.json'

export default function Bag() {
   const groupId = localStorage.getItem('groupId')
   const activityId = localStorage.getItem('activityId')

   const back = (e) => {
      e.preventDefault()
      eventBus.emit('bag-status', false)
   }

   const getGroupBackPack = async () => {
      try {
         const response = await axios
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
               console.log(response)
            })
      } catch (error) {
         console.error(error)
      }
   }

   // 要在別頁呼叫

   const upPetImg = async () => {
      try {
         const response = await axios
            .post(`${url.backendHost}api/pet/updPet`, {
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

   const addAttack = async () => {
      try {
         const response = await axios
            .post(`${url.backendHost}api/pet/updCurrentPet`, {
               groupId,
               activityId,
               petNumber: '',
               process: 0,
            })
            .then((response) => {
               console.log(response)
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      // getGroupBackPack()
   }, [])

   return (
      <>
         <div className="mask-dark">
            <div className="bag-container">
               <h1>Backpack</h1>
               <div className="monster-area">
                  <div className="monster-item">
                     <img src="/game/new_monster/cat.gif" alt="" />
                  </div>
               </div>
            </div>
            <button onClick={back}>Back</button>
         </div>
      </>
   )
}
