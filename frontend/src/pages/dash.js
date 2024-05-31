import React, { useEffect, useState } from 'react'
import eventBus from '../utils/EventBus'
import { Stack, Box, Button } from '@mui/material'
import axios from 'axios'
import url from '../url.json'
import './dashboard.scss'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useNavigate } from 'react-router-dom'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Dash() {
   const [activeList, setActiveList] = useState()
   const navigate = useNavigate()
   const [active, setActive] = useState('')

   const options = {
      responsive: true,
      scales: {
         x: {
            stacked: true,
         },
         y: {
            stacked: true,
         },
      },
   }

   const [data, setData] = useState({
      labels: [],
      datasets: [],
   })

   const handleChange = (event) => {
      setActive(event.target.value)
   }

   const getActiveList = async () => {
      try {
         await axios
            .get(`${url.backendHost}api/activities/allActivity`)
            .then((response) => {
               setActiveList(response.data)
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getActiveList()
   }, [])

   useEffect(() => {
      if (activeList && activeList.length > 0) setActive(activeList[0].id)
   }, [activeList])

   const [activeData, setActiveData] = useState()

   const getActiveData = async () => {
      try {
         await axios
            .post(`${url.backendHost}api/dashboard/getUserNodesummary`, {
               activityId: +active,
            })
            .then((response) => {
               console.log(response.data)
               setActiveData(response.data)
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      if (active) getActiveData()
   }, [active])

   const updData = async () => {
      if (activeData) {
         const ideaData = {
            label: '想法',
            data: activeData.map((item) => item.idea),
            backgroundColor: '#6aa8e4',
         }
         const askData = {
            label: '提問',
            data: activeData.map((item) => item.question),
            backgroundColor: '#f8b360',
         }
         const infoData = {
            label: '資訊',
            data: activeData.map((item) => item.information),
            backgroundColor: '#3cbbbd',
         }
         const experimentData = {
            label: '實驗',
            data: activeData.map((item) => item.experiment),
            backgroundColor: '#a569ee',
         }
         const recordData = {
            label: '紀錄',
            data: activeData.map((item) => item.record),
            backgroundColor: '#ff82a5',
         }

         setData((prevData) => ({
            labels: activeData.map((item) => item.author),
            datasets: [recordData, experimentData, infoData, askData, ideaData],
         }))
      }
   }

   useEffect(() => {
      updData()
   }, [activeData])

   useEffect(() => {
      // console.log(data)
   }, [data])

   return (
      <div className="dashboard-container">
         <Box>
            <Box mb={2}>
               <Button
                  size="large"
                  sx={{ fontSize: '40px' }}
                  onClick={() => navigate(-1)}
               >
                  返回
               </Button>
            </Box>
            <Box>
               <FormControl sx={{ width: '300px' }}>
                  <Select value={active} onChange={handleChange}>
                     {activeList && activeList.length > 0 ? (
                        activeList.map((item) => (
                           <MenuItem key={item.id} value={item.id}>
                              {item.title}
                           </MenuItem>
                        ))
                     ) : (
                        <MenuItem disabled>無資料</MenuItem>
                     )}
                  </Select>
               </FormControl>
            </Box>
            <Box sx={{ width: '70%', marginTop: '20px' }}>
               {data.datasets.length > 0 && data.labels.length > 0 && (
                  <Bar options={options} data={data} />
               )}
            </Box>
         </Box>
      </div>
   )
}
