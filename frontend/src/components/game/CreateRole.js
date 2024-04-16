import { useState } from 'react'
import './create-role.scss'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockIcon from '@mui/icons-material/Lock'
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useNavigate } from 'react-router-dom'
import config from '../../config.json'
import url from '../../url.json'
import axios from 'axios'

export default function CreateRole() {
   const navigate = useNavigate()

   const [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      passwordConf: '',
      school: '',
      city: '',
   })

   const handleSubmit = (e) => {
      e.preventDefault()
      const userData = {
         name: data.name,
         email: data.email,
         password: data.password,
         passwordConf: data.passwordConf,
         school: data.school,
         city: data.city,
         imageContent: '01.png',
      }
      axios
         .post(url.backendHost + config[0].registerUrl, userData)
         .then((response) => {
            console.log(response)
            setData({
               name: '',
               email: '',
               password: '',
               passwordConf: '',
               school: '',
               city: '',
               imageContent: '',
            })
         })
         .catch((error) => {})
   }

   const handleChange = (e) => {
      e.preventDefault()

      const value = e.target.value

      setData({
         ...data,
         [e.target.name]: value,
      })
   }

   return (
      <>
         <div className="create-role-container">
            <div className="info-container">
               <div className="left-container">
                  <div className="title">
                     <img src="/game/title.png" alt="" />
                  </div>
                  <Stack
                     sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        mx: '20%',
                     }}
                  >
                     <form onSubmit={handleSubmit}>
                        <TextField
                           placeholder="暱稱"
                           type="text"
                           size="large"
                           margin="normal"
                           variant="outlined"
                           value={data.name}
                           name="name"
                           onChange={handleChange}
                           sx={{ width: '100%', backgroundColor: '#ffffffde' }}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <PersonIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                        <TextField
                           placeholder="信箱"
                           type="text"
                           size="large"
                           margin="normal"
                           variant="outlined"
                           value={data.email}
                           name="email"
                           onChange={handleChange}
                           sx={{ width: '100%', backgroundColor: '#ffffffde' }}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <MailOutlineIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                        <TextField
                           placeholder="密碼"
                           type="password"
                           size="large"
                           margin="normal"
                           value={data.password}
                           variant="outlined"
                           sx={{ width: '100%', backgroundColor: '#ffffffde' }}
                           name="password"
                           onChange={handleChange}
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <LockIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                        <TextField
                           placeholder="學校"
                           type="text"
                           margin="normal"
                           value={data.school}
                           size="large"
                           variant="outlined"
                           onChange={handleChange}
                           sx={{ width: '100%', backgroundColor: '#ffffffde' }}
                           name="school"
                           InputProps={{
                              startAdornment: (
                                 <InputAdornment position="start">
                                    <MenuBookIcon />
                                 </InputAdornment>
                              ),
                           }}
                        />
                     </form>
                  </Stack>
                  <Stack
                     sx={{
                        color: '#fff',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                     }}
                  >
                     <span>已經有帳號嗎？</span>
                     <Button
                        variant="text"
                        sx={{ color: '#ffd12a' }}
                        onClick={() => {
                           navigate('/login')
                        }}
                     >
                        登入
                     </Button>
                  </Stack>
               </div>
               <div className="right-container">
                  <div className="title">
                     <img src="/game/title.png" alt="" />
                  </div>
                  <a href="/" className="play" onClick={handleSubmit}>
                     <img src="/game/play.png" alt="" />
                     <img src="/game/play2.png" alt="" />
                  </a>
               </div>
            </div>
         </div>
      </>
   )
}
