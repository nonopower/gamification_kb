/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Ranking from './Ranking'
import EventList from './EventList'
import Avatar from './Avatar'
import './lobby.scss'
import axios from 'axios'
import url from '../../url.json'
import Common from './Common'
import config from '../../config.json'
import {
   Button,
   TextField,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
} from '@mui/material'
import joinActivityImg from '../../assets/undraw_join_re_w1lh.svg'

export default function Lobby() {
   const userId = localStorage.getItem('userId')
   const [teamRanking, setTeamRanking] = useState()
   const [ranking, setRanking] = useState()

   const [data, setData] = useState({
      userId: userId,
      joinCode: '',
   })

   const getGroupRanking = async () => {
      try {
         const response = await axios.get(
            `${url.backendHost}api/nodes/all/ranking/group`,
            {
               headers: {
                  authorization: 'Bearer JWT Token',
               },
            },
         )
         setTeamRanking(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   const getRanking = async () => {
      try {
         const response = await axios.get(`${url.backendHost}api/nodes`, {
            headers: {
               authorization: 'Bearer JWT Token',
            },
         })
         setRanking(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      getGroupRanking()
      getRanking()
   }, [])

   useEffect(() => {
      if (ranking) {
         const name = localStorage.getItem('name')
         const myselfRank =
            ranking.findIndex((item) => item.author === name) + 1
         localStorage.setItem('rankingNumber', myselfRank)
      }
   }, [ranking])

   const [open, setOpen] = React.useState(false)

   const onClickAddActive = () => {
      setOpen(true)
   }

   const handleClose = () => {
      setOpen(false)
   }

   const handleChange = (e) => {
      const value = e.target.value
      setData({
         ...data,
         [e.target.name]: value,
      })
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      const activityData = {
         userId: data.userId,
      }
      axios
         .put(
            `${url.backendHost + config[5].joinActivity}/${data.joinCode}/join`,
            activityData,
         )
         .then((response) => {
            setOpen(false)
            setData({
               joinCode: '',
            })
            // console.log(response.status, response.data);
            window.location.reload(false)
         })
         .catch((error) => {
            if (error.response) {
               // console.log(error.response);
               // console.log("server responded");
            } else if (error.request) {
               // console.log("network error");
            } else {
               // console.log(error);
            }
         })
   }

   return (
      <>
         <div className="lobby-container">
            <Common />
            <Button
               onClick={onClickAddActive}
               variant="outlined"
               size="large"
               color="secondary"
               sx={{
                  border: '3px solid #000000',
                  color: '#000000',
                  position: 'absolute',
                  borderRadius: '90px',
                  height: '48px',
                  width: '160px',
                  right: '22%',
                  top: '20px',
                  '&:hover': {
                     border: '3px solid #000000',
                     color: '#000000',
                  },
               }}
            >
               加入活動
            </Button>
            <EventList />
            {ranking && teamRanking && (
               <Ranking teamRanking={teamRanking} allRanking={ranking} />
            )}
            <Avatar />

            <Dialog open={open} onClose={handleClose}>
               <div>
                  <img className="modal-image" src={joinActivityImg} />
               </div>
               <DialogTitle>加入探究活動</DialogTitle>
               <DialogContent>
                  <TextField
                     autoFocus
                     margin="dense"
                     id="title"
                     label={'請輸入小組邀請碼'}
                     type="text"
                     name="joinCode"
                     value={data.joinCode}
                     fullWidth
                     variant="standard"
                     onChange={handleChange}
                  />
               </DialogContent>
               <DialogActions>
                  <Button type="submit" onClick={handleSubmit}>
                     加入
                  </Button>
               </DialogActions>
            </Dialog>
         </div>
      </>
   )
}
