import React, { useEffect, useState } from 'react'
import './create-role.scss'
import SwipeableViews from 'react-swipeable-views'
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
import { useSignIn } from 'react-auth-kit'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

const images = [
   {
      label: 'bird',
      imgPath: '/game/role/bird_1.png',
   },
   {
      label: '2swords',
      imgPath: '/game/role/m_2swords_1.png',
   },
   {
      label: 'blue',
      imgPath: '/game/role/m_blue_1.png',
   },
   {
      label: 'ninja',
      imgPath: '/game/role/m_ninja_1.png',
   },
   {
      label: 'mouse',
      imgPath: '/game/role/mouse_1.png',
   },
   {
      label: 'green',
      imgPath: '/game/role/w_green_1.png',
   },
   {
      label: 'leather',
      imgPath: '/game/role/w_leather_1.png',
   },
   {
      label: 'ponytail',
      imgPath: '/game/role/w_ponytail_1.png',
   },
]

export default function CreateRole() {
   const navigate = useNavigate()
   const login = useSignIn()
   const theme = useTheme()
   const [activeStep, setActiveStep] = useState(0)
   const maxSteps = images.length

   const [data, setData] = useState({
      name: '',
      email: '',
      password: '',
      school: '',
      city: '',
   })

   const loginMethod = async () => {
      const userData = {
         email: data.email,
         password: data.password,
      }

      await axios
         .post(url.backendHost + config[1].loginUrl, userData)
         .then((response) => {
            login({
               token: response.data.token,
               expiresIn: 3600,
               tokenType: 'Bearer',
               authState: { email: response.data.email },
            })

            localStorage.setItem('userId', response.data.id)
            localStorage.setItem('name', response.data.name)
            localStorage.setItem('email', response.data.email)
            localStorage.setItem('role', response.data.imageContent)

            console.log('res: ', response.data)
         })
         .then(() => {
            setTimeout(() => {
               navigate('/game/lobby')
            }, 1000)
         })
         .catch((error) => {
            console.error(error)
         })
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      const userData = {
         name: data.name,
         email: data.email,
         password: data.password,
         passwordConf: data.password,
         school: data.school,
         city: data.school,
         imageContent: images[activeStep].imgPath.slice(0, -5),
      }
      await axios
         .post(url.backendHost + config[0].registerUrl, userData)
         .then(() => {
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
         .then(() => {
            loginMethod()
         })
         .catch((error) => {
            console.error(error)
         })
   }

   const handleChange = (e) => {
      e.preventDefault()

      const value = e.target.value

      setData({
         ...data,
         [e.target.name]: value,
      })
   }

   const handleStepChange = (step) => {
      setActiveStep(step)
   }
   const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
   }

   const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1)
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
                           navigate('/game/login')
                        }}
                     >
                        登入
                     </Button>
                  </Stack>
               </div>
               <div className="right-container">
                  <div className="title">{data.name}</div>

                  <Box width="50%">
                     <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                     >
                        {images.map((step, index) => (
                           <Box
                              key={index}
                              sx={{
                                 display: 'flex',
                                 justifyContent: 'center',
                                 alignItems: 'center',
                              }}
                           >
                              {Math.abs(activeStep - index) <= 2 ? (
                                 <Box
                                    component="img"
                                    sx={{
                                       height: 255,
                                       display: 'flex',
                                       justifyContent: 'center',
                                       alignItems: 'center',
                                       overflow: 'hidden',
                                       width: 'auto',
                                    }}
                                    src={step.imgPath}
                                    alt={step.label}
                                 />
                              ) : null}
                           </Box>
                        ))}
                     </SwipeableViews>
                     <MobileStepper
                        sx={{ backgroundColor: 'transparent' }}
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                           <Button
                              size="small"
                              onClick={handleNext}
                              sx={{ color: '#ffffff', fontSize: '30px' }}
                              disabled={activeStep === maxSteps - 1}
                           >
                              Next
                              {theme.direction === 'rtl' ? (
                                 <KeyboardArrowLeft />
                              ) : (
                                 <KeyboardArrowRight />
                              )}
                           </Button>
                        }
                        backButton={
                           <Button
                              size="large"
                              onClick={handleBack}
                              disabled={activeStep === 0}
                              sx={{
                                 color: '#ffffff',
                                 fontSize: '30px',
                              }}
                           >
                              {theme.direction === 'rtl' ? (
                                 <KeyboardArrowRight />
                              ) : (
                                 <KeyboardArrowLeft />
                              )}
                              Back
                           </Button>
                        }
                     />
                  </Box>
                  <Box className="play">
                     <a href="/" onClick={handleSubmit}>
                        <img src="/game/play.png" alt="" />
                        <img src="/game/play2.png" alt="" />
                     </a>
                  </Box>
               </div>
            </div>
         </div>
      </>
   )
}
