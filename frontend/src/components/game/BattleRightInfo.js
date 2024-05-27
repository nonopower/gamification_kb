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

   useEffect(() => {
      getPet()
   }, [])

   // 每一分鐘抓寶一次
   useEffect(() => {
      const intervalId = setInterval(getPet, 1 * 60 * 1000)
      return () => clearInterval(intervalId)
   }, [])

   // exp 寬度計算
   const bloodBar = useRef(null)
   const totalBar = useRef(null)

   const getExpWidth = (process) => {
      const totalWidthStr = window.getComputedStyle(totalBar.current).width
      if (!process) return
      if (totalWidthStr === '0px') return

      const totalWidth = parseFloat(totalWidthStr)
      const total = 100

      if (process === total) {
         bloodBar.current.style.width = totalWidth + 'px'
      }

      const prop = process / total
      bloodBar.current.style.width = totalWidth * prop + 'px'
   }

   useEffect(() => {
      const resizeObserver = new ResizeObserver(() => {
         if (
            totalBar.current &&
            totalBar.current.offsetWidth > 0 &&
            pet.process
         ) {
            const width = window.getComputedStyle(totalBar.current).width
            getExpWidth(pet.process)
         }
      })

      if (totalBar.current) {
         resizeObserver.observe(totalBar.current)
      }

      return () => {
         if (totalBar.current) {
            resizeObserver.unobserve(totalBar.current)
         }
      }
   }, [totalBar, pet])

   // useEffect(() => {
   //    getExpWidth(pet.process)
   // }, [pet])

   // useEffect(() => {
   //    const width = window.getComputedStyle(totalBar.current).width
   //    if (width !== '0px') getExpWidth(pet.process)
   // }, [totalBar.current])

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
