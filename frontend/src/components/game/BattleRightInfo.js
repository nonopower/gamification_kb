import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import CompareArrowsSharpIcon from '@mui/icons-material/CompareArrowsSharp'

export default function BattleRightInfo() {
   return (
      <>
         <div className="battle-right-info">
            <div className="icon-button">
               <AddIcon sx={{ color: '#ffffff' }} fontSize={'large'} />
               <CompareArrowsSharpIcon
                  sx={{ color: '#ffffff' }}
                  fontSize={'large'}
               />
            </div>
            <img src="/game/title.png" alt="" />
            <div className="bar-container">
               <h4>Lv.1</h4>
               <div className="bar-outer">
                  <div className="bar" />
               </div>
            </div>
         </div>
      </>
   )
}
