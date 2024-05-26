import React, { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { Stack, Box } from '@mui/material'
import './common.scss'
import { useSignOut } from 'react-auth-kit'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import url from '../../url.json'
import { styled } from '@mui/material/styles'
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'

export default function Common() {
   const navigate = useNavigate()
   const singOut = useSignOut()
   const location = useLocation()
   const pathname = location.pathname
   const userid = localStorage.getItem('userId')
   const [noticeList, setNoticeList] = useState()

   const StyledBox = styled(Box)(({ theme }) => ({
      position: 'relative',
      '&::before': {
         content:
            noticeList && noticeList.length ? `"${noticeList.length}"` : '""',
         position: 'absolute',
         display: noticeList && noticeList.length ? 'inline-block ' : 'none',
         bottom: '50%',
         right: 0,
         transform: 'translateY(80%)',
         borderRadius: '99px',
         padding: '0px 10px',
         color: '#fff',
         backgroundColor: '#a92525',
      },
   }))

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
      localStorage.removeItem('petNumber')
      localStorage.removeItem('read')
   }

   const getNotice = async () => {
      try {
         await axios
            .post(`${url.backendHost}api/notice/getUserNotice`, {
               userid,
            })
            .then((response) => {
               setNoticeList(response.data)
               setMessage(response.data.length)
            })
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getNotice()
   }, [])

   useEffect(() => {
      const intervalId = setInterval(getNotice, 3 * 60 * 1000)
      return () => clearInterval(intervalId)
   }, [])

   const [open, setOpen] = React.useState(false)
   const [message, setMessage] = useState()

   return (
      <>
         <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            onClose={() => setOpen(false)}
            message={`有${message}則新貼文`}
            autoHideDuration={1000}
            key={'snack'}
         />
         <div className="common-container">
            <Stack direction={'row'}>
               <div className="icon-item" onClick={() => setOpen(true)}>
                  <StyledBox>
                     <NotificationsIcon
                        sx={{
                           color:
                              pathname === '/game/user' ? '#ffffff' : '#311b1b',
                           fontSize: '50px',
                           margin: '20px 10px',
                        }}
                     />
                  </StyledBox>
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
