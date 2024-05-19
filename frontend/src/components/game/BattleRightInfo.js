import React, { useCallback, useEffect, useRef, useState } from 'react'
import CompareArrowsSharpIcon from '@mui/icons-material/CompareArrowsSharp'
import { useDispatch, useSelector } from 'react-redux'
import { monsterArr } from './../../redux/counterSlice'
import { setNextMonster } from '../../utils/monster'
import eventBus from '../../utils/EventBus'
import axios from 'axios'
import url from '../../url.json'

export default function BattleRightInfo() {
   const groupId = localStorage.getItem('groupId')
   const activityId = localStorage.getItem('activityId')
   const dispatch = useDispatch()
   const point = useSelector((state) => state.point)
   const [nowMonsterImg, setNowMonsterImg] = useState('')
   const role = localStorage.getItem('role') + '2.gif'

   // 設定第一隻 or 在打的怪
   useEffect(() => {
      try {
         if (localStorage.getItem('monster')) {
            const nowMonster = localStorage.getItem('monster')
            const nowIndex = monsterArr.findIndex(
               (item) => item.name === nowMonster,
            )
            localStorage.setItem('totalBlood', monsterArr[nowIndex].blood)
            setNowMonsterImg(monsterArr[nowIndex].img + '1.png')
            getBloodWidth()
         }
         if (!localStorage.getItem('monster')) {
            try {
               localStorage.setItem('monster', monsterArr[0].name)
               localStorage.setItem('blood', monsterArr[0].blood)
               localStorage.setItem('totalBlood', monsterArr[0].blood)
               localStorage.setItem('mode', 'normal')
            } finally {
               setNowMonsterImg(monsterArr[0].img + '1.png')
               getBloodWidth()
            }
         }
      } finally {
         eventBus.emit('loading', false)
      }
   }, [])

   // 倒數回血計時器，5 分鐘開始回血
   const [seconds, setSeconds] = useState(0)
   // 回血計時器，一分鐘 + 1 血
   const [addBloodSec, setAddBloodSec] = useState(0)

   const addBlood = () => {
      const nowBlood = +localStorage.getItem('blood')
      const totalBlood = +localStorage.getItem('totalBlood')
      try {
         if (nowBlood + 1 <= totalBlood) {
            localStorage.setItem('blood', nowBlood + 1)
         } else {
            return false
         }
      } finally {
         getBloodWidth()
      }
   }

   let addBloodIntervalIdRef = useRef(null)
   const addBloodInterval = useCallback(() => {
      const blood = +localStorage.getItem('blood')
      const totalBlood = +localStorage.getItem('totalBlood')
      addBloodIntervalIdRef.current = setInterval(() => {
         setAddBloodSec((prevSeconds) => {
            if (prevSeconds === 3) {
               addBlood()
               return 0
            }
            if (blood === totalBlood) {
               clearInterval(addBloodIntervalIdRef.current)
            }
            return prevSeconds + 1
         })
      }, 1000)
   }, [])

   let fiveminsIntervalIdRef = useRef(null)
   const fiveminsInterval = useCallback(async () => {
      fiveminsIntervalIdRef.current = setInterval(() => {
         setSeconds((prevSeconds) => {
            if (prevSeconds === 5) {
               clearInterval(fiveminsIntervalIdRef.current)
               return
            }
            return prevSeconds + 1
         })
      }, 1000)
   }, [])

   // 監聽怪物模式，觸發換圖、回血
   useEffect(() => {
      fiveminsInterval().then(() => {
         addBloodInterval()
      })

      eventBus.on('monster-mode', (mode) => {
         const nowMonster = localStorage.getItem('monster')
         const nowIndex = monsterArr.findIndex(
            (item) => item.name === nowMonster,
         )
         if (mode === 'normal') {
            setNowMonsterImg(monsterArr[nowIndex].img + '1.png')
            fiveminsInterval().then(() => {
               addBloodInterval()
            })
         } else {
            setNowMonsterImg(monsterArr[nowIndex].img + '2.gif')
            clearInterval(fiveminsIntervalIdRef.current)
            clearInterval(addBloodIntervalIdRef.current)
            setSeconds(0)
            setAddBloodSec(0)
         }
      })
   }, [])

   const bloodBar = useRef(null)
   const totalBar = useRef(null)

   // 血條寬度計算
   const getBloodWidth = useCallback(() => {
      const totalWidth = window.getComputedStyle(totalBar.current).width

      const nowBlood = +localStorage.getItem('blood')
      const totalBlood = +localStorage.getItem('totalBlood')
      const prop = nowBlood / totalBlood

      if (nowBlood === totalBlood) {
         bloodBar.current.style.width = totalWidth + 'px'
      }

      bloodBar.current.style.width = totalWidth.slice(0, -2) * prop + 'px'
   }, [])

   // 監聽怪物血量，觸發血條長度變化
   useEffect(() => {
      eventBus.on('monster-blood', () => {
         const blood = +localStorage.getItem('blood')
         if (blood === 0) setNextMonster()
         getBloodWidth()
      })
   }, [])

   /**
    *
    *
    * 新邏輯
    *
    *
    */

   const [pet, setPet] = useState()

   const getPet = async () => {
      try {
         const response = await axios
            .post(`${url.backendHost}api/pet/getCurrentPet`, {
               groupId,
               activityId,
            })
            .then((response) => {
               console.log(response)
               setPet(response.data.petNumber)
            })
      } catch (error) {
         console.error(error)
      }
   }

   const onClickBag = (e) => {
      e.preventDefault()
      eventBus.emit('bag-status', true)
   }

   useEffect(() => {
      getPet()
   }, [])

   return (
      <>
         <div className="battle-right-info">
            <div className="icon-button">
               <CompareArrowsSharpIcon
                  sx={{ color: '#ffffff' }}
                  fontSize={'large'}
               />
            </div>
            <div className="img-container">
               <div className="team">
                  <div className="other">
                     <div className="people">
                        <img src="/game/role/m_blue_2.gif" alt="" />
                     </div>
                     <div className="people">
                        <img src="/game/role/bird_2.gif" alt="" />
                     </div>
                     <div className="people">
                        <img src="/game/role/w_leather_2.gif" alt="" />
                     </div>
                  </div>
                  <div className="user">
                     <img src={role} alt="" />
                  </div>
               </div>
               <div className="monster">
                  <img src={`/game/new_monster/${pet}`} />
               </div>
            </div>
            <div className="bar-container">
               {/* <h4>{localStorage.getItem('monster')}</h4> */}
               <div className="bar-outer" ref={totalBar}>
                  <div className="bar" ref={bloodBar} />
               </div>
            </div>
         </div>
         <a href="/" className="bag-button" onClick={onClickBag}>
            <img src="/game/backpack.png" alt="" />
         </a>
      </>
   )
}
