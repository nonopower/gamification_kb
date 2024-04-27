import React, { useCallback, useEffect, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import CompareArrowsSharpIcon from '@mui/icons-material/CompareArrowsSharp'
import { useDispatch, useSelector } from 'react-redux'
import {
   setBlood,
   monsterArr,
   setOtherMonster,
} from './../../redux/counterSlice'

export default function BattleRightInfo() {
   const dispatch = useDispatch()
   const monster = useSelector((state) => state.monster)
   const [nowMonsterTotalBlood, setNowMonsterTotalBlood] = useState(
      monsterArr.find((item) => item.name === monster.name).blood,
   )

   // 即時更新目前怪獸的總血
   useEffect(() => {
      const blood = monsterArr.find((item) => item.name === monster.name).blood
      setNowMonsterTotalBlood(blood)
   }, [monster])

   // 倒數回血計時器，5 分鐘開始回血
   const [seconds, setSeconds] = useState(0)
   // 回血計時器，一分鐘 + 1 血
   const [addBloodSec, setAddBloodSec] = useState(0)

   const addBlood = () => {
      const newBlood = monster.blood++
      dispatch(
         setBlood({
            ...monster,
            blood: newBlood,
         }),
      )
   }

   let addBloodIntervalIdRef = useRef(null)
   const addBloodInterval = useCallback(() => {
      addBloodIntervalIdRef.current = setInterval(() => {
         setAddBloodSec((prevSeconds) => {
            // 要修改成 60
            if (prevSeconds >= 3) {
               addBlood()
               return 0
            }
            if (monster.bool === nowMonsterTotalBlood) {
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
            // 要修改成 300
            if (prevSeconds >= 10) {
               clearInterval(fiveminsIntervalIdRef.current)
            }
            return prevSeconds + 1
         })
      }, 1000)

      return () => clearInterval(fiveminsIntervalIdRef.current)
   }, [])

   // 監聽怪物模式，觸發對應操作
   useEffect(() => {
      if (monster.mode === 'normal') {
         const clearTimer = fiveminsInterval().then(() => {
            addBloodInterval()
         })
         return () => clearTimer()
      } else {
         clearInterval(fiveminsIntervalIdRef.current)
         clearInterval(addBloodIntervalIdRef.current)
         setSeconds(0)
         setAddBloodSec(0)
      }
   }, [monster.mode])

   useEffect(() => {
      if (monster.blood === nowMonsterTotalBlood && monster.mode === 'normal') {
         clearInterval(fiveminsIntervalIdRef.current)
         clearInterval(addBloodIntervalIdRef.current)
         setSeconds(0)
         setAddBloodSec(0)
      }
   }, [monster.blood, nowMonsterTotalBlood])

   const bloodBar = useRef(null)
   const totalBar = useRef(null)

   // 血條寬度計算
   const getBloodWidth = useCallback(() => {
      const totalWidth = window.getComputedStyle(totalBar.current).width

      const nowMonsterTotalBlood = monsterArr.find(
         (item) => item.name === monster.name,
      ).blood
      const prop = monster.blood / nowMonsterTotalBlood
      if (monster.blood === nowMonsterTotalBlood) {
         bloodBar.current.style.width = totalWidth + 'px'
      }
      bloodBar.current.style.width = totalWidth.slice(0, -2) * prop + 'px'
   }, [monster.blood, monster.name])

   useEffect(() => {
      dispatch(
         setOtherMonster({
            name: 'LV.1',
            blood: 15,
            mode: 'normal',
         }),
      )
   }, [])

   useEffect(() => {
      getBloodWidth()
   }, [monster, getBloodWidth])

   // useEffect(() => {
   //    console.log('blood:' + monster.blood)
   // }, [monster])

   return (
      <>
         <div className="battle-right-info">
            <div className="icon-button">
               <AddIcon sx={{ color: '#ffffff' }} fontSize={'large'} />
               <CompareArrowsSharpIcon
                  sx={{ color: '#ffffff' }}
                  fontSize={'large'}
               />
            </div>
            <img src="/game/title.png" alt="" />
            <div className="bar-container">
               <h4>{monster.name}</h4>
               <div className="bar-outer" ref={totalBar}>
                  <div className="bar" ref={bloodBar} />
               </div>
            </div>
         </div>
      </>
   )
}
