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
// import { faker } from 'faker'

export default function Dash() {
   const groupId = localStorage.getItem('groupId')

   const [activeList, setActiveList] = useState()
   const navigate = useNavigate()
   const [active, setActive] = useState('')

   const options = {
      plugins: {
         title: {
            display: true,
            text: 'Chart.js Bar Chart - Stacked',
         },
      },
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

   const labels = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
   ]

   const data = {
      labels,
      datasets: [
         // {
         //    label: 'Dataset 1',
         //    data: labels.map(() =>
         //       faker.datatype.number({ min: -1000, max: 1000 }),
         //    ),
         //    backgroundColor: 'rgb(255, 99, 132)',
         // },
         // {
         //    label: 'Dataset 2',
         //    data: labels.map(() =>
         //       faker.datatype.number({ min: -1000, max: 1000 }),
         //    ),
         //    backgroundColor: 'rgb(75, 192, 192)',
         // },
         // {
         //    label: 'Dataset 3',
         //    data: labels.map(() =>
         //       faker.datatype.number({ min: -1000, max: 1000 }),
         //    ),
         //    backgroundColor: 'rgb(53, 162, 235)',
         // },
      ],
   }

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

   const [activeData, setActiveData] = useState()

   const getActiveData = async () => {
      try {
         await axios
            .post(`${url.backendHost}api/dashboard/getUserNodesummary`, {
               activityId: +active,
            })
            .then((response) => {
               setActiveData(response.data)
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

   useEffect(() => {
      if (active) getActiveData()
   }, [active])

   useEffect(() => {
      console.log(activeData)
   }, [activeData])

   return (
      <div className="dashboard-container">
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
         <Box>
            <Bar options={options} data={data} />
         </Box>
      </div>
   )
}
