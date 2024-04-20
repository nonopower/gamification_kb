import React, { useRef, useState, useEffect } from 'react'
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

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip)

export default function User() {
   const [chartData, setChartData] = useState({ labels: [], datasets: [] })
   const navigate = useNavigate()

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
            data: [2, 2, 3, 4, 1, 6],
            backgroundColor: '#ffd12a',
            borderColor: '#ffd12a',
            borderWidth: 2,
         },
      ],
   }

   const back = (e) => {
      e.preventDefault()
      navigate('/game/battle-lobby')
   }

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
                        <span>冒險家</span> nono琪
                     </h3>
                     <h4>（排行榜第25名）</h4>
                  </div>
                  <div className="avatar">
                     <img src="/game/title.png" alt="" />
                  </div>
                  <div className="bar-container">
                     <h4>Lv.1</h4>
                     <div className="bar-outer">
                        <div className="bar" />
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
