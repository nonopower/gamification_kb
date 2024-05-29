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
import { useSelector, useDispatch } from 'react-redux'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import Common from './Common'
import axios from 'axios'
import config from '../../config.json'
import url from '../../url.json'

ChartJS.register(RadialLinearScale, PointElement, LineElement, Tooltip)

var ONE_HOUR = 1000 * 60 * 60
var ONE_MIN = 1000 * 60
var ONE_SEC = 1000

const Badge = (type, message) => {
   const gold = '/game/gold-medal.png'
   const silver = '/game/silver-medal.png'

   return (
      <div className="badge-item">
         <img src={type === 'silver' ? silver : gold} alt={message} />
      </div>
   )
}

export default function User() {
   const [lv, setLv] = useState(1)
   const name = localStorage.getItem('name')
   const userid = localStorage.getItem('userId')
   const role = localStorage.getItem('role') + '1.png'
   const gold = '/game/gold-medal.png'
   const silver = '/game/silver-medal.png'

   // 想法
   const [idea, setIdea] = useState()
   const [reply, setReply] = useState()
   const [info, setInfo] = useState()
   const [ask, setAsk] = useState()
   const [record, setRecord] = useState()
   const [experiment, setExperiment] = useState()

   // point
   const point = useSelector((state) => state.point)
   // read
   const read = useSelector((state) => state.read)

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
      plugins: {
         legend: {
            display: false,
         },
      },
   }

   const getRadar = async () => {
      try {
         await axios
            .get(`${url.backendHost}api/radar/${userid}`)
            .then((response) => {
               console.log(response)
               setIdea(+response.data.idea)
               setInfo(+response.data.info)
               setReply(+response.data.reply)
               setAsk(+response.data.ask)
               setRecord(+response.data.record)
               setExperiment(+response.data.experiment)
               setDataModel((prevModel) => ({
                  ...prevModel,
                  datasets: prevModel.datasets.map((dataset) =>
                     dataset === prevModel.datasets[0]
                        ? {
                             ...dataset,
                             data: [
                                +response.data.idea,
                                +response.data.reply,
                                +response.data.ask,
                                +response.data.record,
                                +response.data.experiment,
                                +response.data.info,
                             ],
                          }
                        : dataset,
                  ),
               }))
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getRadar()
   }, [])

   const [dataModel, setDataModel] = useState({
      labels: ['想法產生', '多元想法', '想法改進', '闡述', '貢獻', '資訊提供'],
      datasets: [
         {
            data: [],
            backgroundColor: '#ffd12a',
            borderColor: '#ffd12a',
            borderWidth: 2,
         },
      ],
   })

   useEffect(() => {
      console.log(dataModel)
   }, [idea, reply, ask, record, experiment, info])

   const expBar = useRef(null)
   const totalBar = useRef(null)

   // 經驗值寬度計算
   const getExpWidth = useCallback(async () => {
      const totalWidth = window.getComputedStyle(totalBar.current).width

      const newLv = point === 0 ? 1 : Math.ceil(point / 50)
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

   const checkOnline = () => {
      const nowTime = new Date().getTime()
      const login = localStorage.getItem('login')
      checkMin(nowTime - login)
   }

   const checkMin = (onlineDuration) => {
      let leave1 = onlineDuration % (24 * 3600 * 1000)
      let hours = Math.floor(leave1 / (3600 * 1000))
      let leave2 = leave1 % (3600 * 1000)
      let minutes = Math.floor(leave2 / (60 * 1000))

      if (minutes >= 30) localStorage.setItem('silver30', 1)
      if (hours >= 1) localStorage.setItem('goldhour', hours)

      console.log(leave1, hours, leave2, minutes)
   }

   useEffect(() => {
      checkOnline()
   }, [])

   const [open, setOpen] = React.useState(false)
   const [message, setMessage] = useState()

   const clickBadge = useCallback((msg) => {
      setOpen(true)
      setMessage(msg)
   }, [])

   const checkBadge = () => {
      let returnDOM = []

      if (read >= 5 && read < 10) {
         returnDOM.push(
            <div
               className="badge-item"
               key="silver-badge"
               onClick={() => clickBadge('閱讀5則')}
            >
               <img src={silver} alt="閱讀5則" />
            </div>,
         )
      }

      if (read >= 10) {
         returnDOM.push(
            <div
               className="badge-item"
               key="silver-badge"
               onClick={() => clickBadge('閱讀5則')}
            >
               <img src={silver} title="閱讀5則" />
            </div>,
         )

         for (let i = 10; i <= read; i++) {
            if (i % 10 === 0)
               returnDOM.push(
                  <div
                     className="badge-item"
                     key={`gold-badge-${i}`}
                     onClick={() => clickBadge(`閱讀${i}則`)}
                  >
                     <img src={gold} title={`閱讀${i}則`} />
                  </div>,
               )
         }
      }

      if (reply >= 5 && reply < 10) {
         returnDOM.push(
            <div
               className="badge-item"
               key="silver-reply-badge"
               onClick={() => clickBadge('回覆5則')}
            >
               <img src={silver} title="回覆5則" />
            </div>,
         )
      }

      if (reply >= 10) {
         returnDOM.push(
            <div
               className="badge-item"
               key="silver-reply-badge"
               onClick={() => clickBadge('回覆5則')}
            >
               <img src={silver} title="回覆5則" />
            </div>,
         )

         for (let i = 10; i <= reply; i++) {
            if (i % 10 === 0)
               returnDOM.push(
                  <div
                     className="badge-item"
                     key={`gold-reply-badge-${i}`}
                     onClick={() => clickBadge(`回覆${i}則`)}
                  >
                     <img src={gold} title={`回覆${i}則`} />
                  </div>,
               )
         }
      }

      if (localStorage.getItem('silver30')) {
         returnDOM.push(
            <div
               className="badge-item"
               key="silver30-badge"
               onClick={() => clickBadge('上線30分鐘')}
            >
               <img src={silver} title="上線30分鐘" />
            </div>,
         )
      }

      const oneHour = +localStorage.getItem('goldhour')

      if (oneHour) {
         for (let i = 1; i <= oneHour; i++) {
            returnDOM.push(
               <div
                  className="badge-item"
                  key={`goldhour-badge-${i}`}
                  onClick={() => clickBadge(`上線${i}小時`)}
               >
                  <img src={gold} title={`上線${i}小時`} />
               </div>,
            )
         }
      }

      return returnDOM
   }

   return (
      <>
         <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={() => setOpen(false)}
            message={message}
            autoHideDuration={1500}
            key={'snack'}
         />
         <div className="user-container">
            <div className="info-container">
               <Common />
               <div className="left-container">
                  {/* <a href="" className="back" onClick={back}>
                     <img src="/game/house.png" alt="" />
                     <p>返回</p>
                  </a> */}
                  <div className="text-container">
                     <h3 className="username">
                        <span>冒險家</span>
                        {name}
                     </h3>
                     <h4>
                        （排行榜第 {localStorage.getItem('rankingNumber')} 名）
                     </h4>
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
                     <div className="badge-area">{checkBadge()}</div>
                  </div>
                  <div className="skill-container">
                     <h3>角色能力</h3>
                     <div className="chart-rader">
                        <Radar data={dataModel} options={options} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}
