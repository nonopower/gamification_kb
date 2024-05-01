import React, { useRef, useState, useEffect, useCallback } from 'react'
import './user.scss'
import {
   Chart as ChartJS,
   RadialLinearScale,
   PointElement,
   LineElement,
   Tooltip,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip)

export default function User() {
   const [chartData, setChartData] = useState({ labels: [], datasets: [] })
   const [lv, setLv] = useState(1)
   const name = localStorage.getItem('name')
   const role = localStorage.getItem('role') + '1.png'
   const navigate = useNavigate()

   // 想法
   const idea = useSelector((state) => state.idea)
   // 資訊
   const info = useSelector((state) => state.info)
   // 回覆
   const reply = useSelector((state) => state.reply)
   // 提問
   const ask = useSelector((state) => state.ask)
   // 紀錄
   const record = useSelector((state) => state.record)
   // 實驗
   const experiment = useSelector((state) => state.experiment)
   // point
   const point = useSelector((state) => state.point)

   const options = {
      scales: {
         r: {
            fill: true,
            angleLines: {
               color: '#ffffff90',
            },
            grid: {
               color: '#ffffff90',
            },
            pointLabels: {
               color: '#ffffff',
               font: {
                  size: 20,
               },
            },
            ticks: {
               display: false,
            },
            suggestedMin: 0,
            suggestedMax: 10,
         },
      },
   }

   useEffect(() => {
      setChartData(() => dataMode2)
   }, [])

   const dataMode2 = {
      labels: ['想法', '回覆', '提問', '紀錄', '實驗', '資訊'],
      datasets: [
         {
            data: [idea, reply, ask, record, experiment, info],
            backgroundColor: '#ffd12a',
            borderColor: '#ffd12a',
            borderWidth: 2,
         },
      ],
   }

   const back = (e) => {
      e.preventDefault()
      navigate(-1)
   }

   const expBar = useRef(null)
   const totalBar = useRef(null)

   // 血條寬度計算
   const getExpWidth = useCallback(async () => {
      const totalWidth = window.getComputedStyle(totalBar.current).width

      const newLv = Math.ceil(point / 50)
      const prop = (point % 50) / 50

      if (prop === 0) {
         expBar.current.style.width = '0px'
      }
      expBar.current.style.width = totalWidth.slice(0, -2) * prop + 'px'
      await setLv(newLv)
   }, [])

   useEffect(() => {
      getExpWidth()
   }, [])

   return (
      <>
         <div className="user-container">
            <div className="info-container">
               <div className="left-container">
                  <a href="" className="back" onClick={back}>
                     <img src="/game/house.png" alt="" />
                     <p>返回</p>
                  </a>
                  <div className="text-container">
                     <h3 className="username">
                        <span>冒險家</span>
                        {name}
                     </h3>
                     <h4>（排行榜第25名）</h4>
                  </div>
                  <div className="avatar">
                     <img src={role} alt="" />
                  </div>
                  <div className="bar-container">
                     <h4>Lv.{lv}</h4>
                     <div className="bar-outer" ref={totalBar}>
                        <div className="bar" ref={expBar} />
                     </div>
                  </div>
               </div>
               <div className="right-container">
                  <div className="badge-container">
                     <h3>擁有的徽章</h3>
                     <div className="badge-area">
                        <div className="badge-item">
                           <img src="/game/gold-medal.png" alt="" />
                        </div>
                        <div className="badge-item">
                           <img src="/game/gold-medal.png" alt="" />
                        </div>
                        <div className="badge-item">
                           <img src="/game/gold-medal.png" alt="" />
                        </div>
                     </div>
                  </div>
                  <div className="skill-container">
                     <h3>角色能力</h3>
                     <Radar data={chartData} options={options} />
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
