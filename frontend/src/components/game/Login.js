import React from 'react'
import './login.scss'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import LockIcon from '@mui/icons-material/Lock'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { common } from '@mui/material/colors'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

export default function Login() {
   const navigate = useNavigate()
   return (
      <>
         <div className="login-container">
            <div className="info-container">
               <Stack>
                  <img className="title" src="/game/title.png" alt="" />
               </Stack>
               <Stack
                  sx={{
                     justifyContent: 'center',
                     alignItems: 'center',
                     width: '60%',
                  }}
               >
                  <TextField
                     placeholder="信箱"
                     type="text"
                     size="large"
                     margin="normal"
                     id="input-with-icon-textfield"
                     variant="outlined"
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
                     id="input-with-icon-textfield"
                     variant="outlined"
                     sx={{ width: '100%', backgroundColor: '#ffffffde' }}
                     InputProps={{
                        startAdornment: (
                           <InputAdornment position="start">
                              <LockIcon />
                           </InputAdornment>
                        ),
                     }}
                  />
               </Stack>
               <Stack
                  sx={{
                     mx: '20%',
                  }}
               >
                  <FormControl margin="normal">
                     <RadioGroup
                        row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                     >
                        <FormControlLabel
                           value="female"
                           control={
                              <Radio
                                 sx={{
                                    color: common.white,
                                    '&.Mui-checked': {
                                       color: common.white,
                                    },
                                 }}
                              />
                           }
                           sx={{ color: '#ffffff' }}
                           label="教師"
                        />
                        <FormControlLabel
                           value="male"
                           control={
                              <Radio
                                 sx={{
                                    color: common.white,
                                    '&.Mui-checked': {
                                       color: common.white,
                                    },
                                 }}
                              />
                           }
                           sx={{ color: '#ffffff' }}
                           label="學生"
                        />
                     </RadioGroup>
                  </FormControl>
               </Stack>
               <Stack
                  sx={{
                     height: '10%',
                     width: '100%',
                  }}
               >
                  <a href="/" className="play">
                     <img src="/game/play.png" alt="" />
                     <img src="/game/play2.png" alt="" />
                  </a>
               </Stack>
               <Stack
                  sx={{
                     color: '#fff',
                     flexDirection: 'row',
                     justifyContent: 'center',
                     alignItems: 'center',
                     width: '100%',
                     height: '15%',
                     fontSize: '24px',
                  }}
               >
                  <span>還沒有註冊嗎？</span>
                  <Button
                     variant="text"
                     sx={{ color: '#ffd12a' }}
                     onClick={() => {
                        navigate('/create-role')
                     }}
                  >
                     註冊
                  </Button>
               </Stack>
            </div>
         </div>
      </>
   )
}
