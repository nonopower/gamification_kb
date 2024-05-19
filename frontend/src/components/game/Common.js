import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Stack } from '@mui/material'
import './common.scss'
import { useSignOut } from 'react-auth-kit'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import url from '../../url.json'

export default function Common() {
   const navigate = useNavigate()
   const singOut = useSignOut()
   const location = useLocation()
   const pathname = location.pathname
   const userid = localStorage.getItem('userId')

   const logout = () => {
      singOut()
      navigate('/game')
      localStorage.removeItem('userId')
      localStorage.removeItem('name')
      localStorage.removeItem('email')
      localStorage.removeItem('activityId')
      localStorage.removeItem('groupId')
      localStorage.removeItem('nodeId')
      localStorage.removeItem('nodeDataLength')

      localStorage.removeItem('role')
      localStorage.removeItem('rankingNumber')
      localStorage.removeItem('blood')
      localStorage.removeItem('activityName')
      localStorage.removeItem('mode')
      localStorage.removeItem('monster')
      localStorage.removeItem('login')
      localStorage.removeItem('totalBlood')
   }

   const getNotice = async () => {
      try {
         await axios
            .post(`${url.backendHost}api/notice/getUserNotice`, {
               userid,
            })
            .then((response) => {
               console.log(response)
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      // getNotice()
   }, [])

   //    onClick={() => navigate('/game/user')}

   return (
      <>
         <div className="common-container">
            <Stack direction={'row'}>
               <div className="icon-item">
                  <NotificationsIcon
                     sx={{
                        color:
                           pathname === '/game/user' ? '#ffffff' : '#311b1b',
                        fontSize: '50px',
                        margin: '20px 10px',
                     }}
                  />
               </div>
               <div className="icon-item">
                  <ArrowCircleLeftIcon
                     onClick={() => navigate(-1)}
                     sx={{
                        color:
                           pathname === '/game/user' ? '#ffffff' : '#311b1b',
                        fontSize: '50px',
                        margin: '20px 10px',
                     }}
                  />
               </div>
               <div className="icon-item">
                  <ExitToAppRoundedIcon
                     onClick={() => logout()}
                     sx={{
                        color:
                           pathname === '/game/user' ? '#ffffff' : '#311b1b',
                        fontSize: '50px',
                        margin: '20px 10px',
                     }}
                  />
               </div>
            </Stack>
         </div>
      </>
   )
}
