import React, { useCallback, useEffect, useRef, useState } from 'react'
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
   const point = useSelector((state) => state.point)
   const [nowMonsterTotalBlood, setNowMonsterTotalBlood] = useState(0)
   const [nowMonsterImg, setNowMonsterImg] = useState('')

   // 設定目前在打的怪
   // 要從 API 獲取
   useEffect(() => {
      try {
         dispatch(
            setOtherMonster({
               name: monsterArr[0].name,
               blood: monsterArr[0].blood,
               mode: 'normal',
            }),
         )
      } finally {
         setNowMonsterTotalBlood(monsterArr[0].blood)
         setNowMonsterImg(monsterArr[0].img + '1.png')
         getBloodWidth()
      }
   }, [])

   // 顯示下一隻怪
   const setNextMonster = () => {
      try {
         const next =
            monsterArr.findIndex((item) => item.name === monster.name) + 1
         if (next > monsterArr.length) return false

         setNowMonsterImg(monsterArr[next].img)
         setNowMonsterTotalBlood(monsterArr[next].blood)

         dispatch(
            setOtherMonster({
               name: monsterArr[next].name,
               blood: monsterArr[next].blood,
               mode: 'normal',
            }),
         )
      } finally {
         getBloodWidth()
      }
   }

   // 倒數回血計時器，5 分鐘開始回血
   const [seconds, setSeconds] = useState(0)
   // 回血計時器，一分鐘 + 1 血
   const [addBloodSec, setAddBloodSec] = useState(0)

   const addBlood = () => {
      try {
         const newBlood = monster.blood++
         dispatch(
            setBlood({
               ...monster,
               blood: newBlood,
            }),
         )
      } finally {
         getBloodWidth()
      }
   }
   const subtractBlood = () => {
      try {
         const newBlood = monster.blood--
         dispatch(
            setBlood({
               ...monster,
               blood: newBlood,
            }),
         )
      } finally {
         getBloodWidth()
      }
   }

   // 監聽點數
   useEffect(() => {
      console.log('point:' + point)
      if (monster.blood && monster.blood > 0 && point / 5 === 0) {
         console.log(1)
         subtractBlood()
      }
   }, [point])

   let addBloodIntervalIdRef = useRef(null)
   const addBloodInterval = useCallback(() => {
      addBloodIntervalIdRef.current = setInterval(() => {
         setAddBloodSec((prevSeconds) => {
            if (prevSeconds === 3) {
               addBlood()
               return 0
            }
            if (monster.blood === nowMonsterTotalBlood) {
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

   // 監聽怪物模式，觸發對應操作
   useEffect(() => {
      if (
         monster.blood &&
         monster.mode === 'normal' &&
         monster.blood < nowMonsterTotalBlood
      ) {
         // 計時五分鐘
         fiveminsInterval().then(() => {
            // 開始加血
            addBloodInterval()
         })
      } else {
         clearInterval(fiveminsIntervalIdRef.current)
         clearInterval(addBloodIntervalIdRef.current)
         setSeconds(0)
         setAddBloodSec(0)
      }
   }, [monster.mode])

   useEffect(() => {
      if (monster.mode === 'normal') {
         setNowMonsterImg(monsterArr[0].img + '1.png')
      } else {
         setNowMonsterImg(monsterArr[0].img + '2.gif')
      }
   }, [monster.mode])

   const bloodBar = useRef(null)
   const totalBar = useRef(null)

   // 血條寬度計算
   const getBloodWidth = useCallback(() => {
      const totalWidth = window.getComputedStyle(totalBar.current).width

      const prop = monster.blood / nowMonsterTotalBlood
      if (monster.blood === nowMonsterTotalBlood) {
         bloodBar.current.style.width = totalWidth + 'px'
      }
      bloodBar.current.style.width = totalWidth.slice(0, -2) * prop + 'px'
   }, [])

   useEffect(() => {
      console.log('blood:' + monster.blood)
      if (monster.blood && monster.blood === 0) setNextMonster()
      getBloodWidth()
   }, [monster.blood])

   return (
      <>
         <div className="battle-right-info">
            <div className="icon-button">
               <CompareArrowsSharpIcon
                  sx={{ color: '#ffffff' }}
                  fontSize={'large'}
               />
            </div>
            <div className="monster-container">
               <img src={nowMonsterImg} alt={monster.name} />
            </div>
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
