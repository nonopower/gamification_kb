import React, { useCallback, useEffect, useRef, useState } from 'react'
import eventBus from '../../utils/EventBus'
import axios from 'axios'
import url from '../../url.json'
import config from '../../config.json'

export default function BattleRightInfo() {
   // eventBus.emit('loading', true)

   const groupId = localStorage.getItem('groupId')
   const activityId = localStorage.getItem('activityId')
   const userid = localStorage.getItem('userId')
   const process = localStorage.getItem('process')

   const role = localStorage.getItem('role') + '2.gif'
   const petNumber = localStorage.getItem('petNumber')

   // 取得目前抓的
   const [pet, setPet] = useState({})

   const getPet = async () => {
      try {
         const response = await axios
            .post(`${url.backendHost}api/pet/getCurrentPet`, {
               groupId,
               activityId,
            })
            .then((response) => {
               setPet(response.data)
               localStorage.setItem('petNumber', response.data.petNumber)
               localStorage.setItem('process', response.data.process)
            })
      } catch (error) {
         console.error(error)
      }
   }

   const getPetAndBar = async () => {
      await getPet().then(getExpWidth(pet.process))
   }

   useEffect(() => {
      getPetAndBar()
   }, [])

   // 每一分鐘抓寶一次
   useEffect(() => {
      const intervalId = setInterval(getPetAndBar, 1 * 60 * 1000)
      return () => clearInterval(intervalId)
   }, [])

   // exp 寬度計算
   const bloodBar = useRef(null)
   const totalBar = useRef(null)

   const getExpWidth = (process) => {
      console.log(bloodBar.current.style.width)
      const totalWidth = window.getComputedStyle(totalBar.current).width
      if (!process) return
      const total = 100
      const prop = process / total

      if (process === total) {
         bloodBar.current.style.width = totalWidth + 'px'
      }
      bloodBar.current.style.width = totalWidth.slice(0, -2) * prop + 'px'
   }

   // useEffect(() => {
   //    if (pet) getExpWidth(pet.process)
   // }, [pet])

   // useEffect(() => {
   //    console.log(pet)
   // }, [pet])

   const onClickBag = (e) => {
      e.preventDefault()
      eventBus.emit('bag-status', true)
   }

   const [team, setTeam] = useState()

   const getTeamMember = async () => {
      try {
         await axios.get(`${url.backendHost}api/users`).then((response) => {
            setTeam(response.data)
         })
      } catch (error) {
         console.error(error)
      }
   }
   const [groupData, setGroupData] = useState()

   const getGroups = async () => {
      try {
         const fetchData = await axios.get(
            url.backendHost +
               config[15].findAllGroup +
               localStorage.getItem('activityId'),
            {
               headers: {
                  authorization: 'Bearer JWT Token',
               },
            },
         )
         // console.log('GroupData: ', fetchData.data.Groups);
         setGroupData(fetchData.data.Groups)
      } catch (err) {
         // console.log(err);
      }
   }

   useEffect(() => {
      getGroups()
      getTeamMember()
   }, [])

   const [memberData, setMemberData] = useState()

   useEffect(() => {
      if (team && groupData) {
         const group = groupData.find((item) => item.id === +groupId)

         if (group && Array.isArray(group.userId)) {
            const teamMemberData = group.userId.map((id) => {
               return team.find((item) => +item.id === id)
            })

            setMemberData(teamMemberData)
         }
      }
   }, [team, groupData, groupId])

   console.log(memberData)

   return (
      <>
         <div className="battle-right-info">
            <div className="monster-container">
               <div className="img-container">
                  <div className="monster">
                     <img src={`/game/new_monster/${pet.petNumber}`} alt="" />
                  </div>
               </div>
               <div className="bar-container">
                  <div className="bar-outer" ref={totalBar}>
                     <div className="bar" ref={bloodBar} />
                  </div>
               </div>
            </div>
            <div className="bag-container">
               <a href="/" className="bag-button" onClick={onClickBag}>
                  <img src="/game/backpack.png" alt="" />
               </a>
            </div>
            <div className="team-container">
               {memberData &&
                  memberData.map((item, index) => (
                     <div className="user-item" key={index}>
                        <img
                           src={`${item.imageContent}1.png`}
                           key={index}
                           style={{
                              filter:
                                 item.state === '0'
                                    ? 'grayscale(100%)'
                                    : 'none',
                           }}
                           alt=""
                        />
                     </div>
                  ))}
            </div>
         </div>
      </>
   )
}
