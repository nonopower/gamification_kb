import React from 'react'
import SideMenu from './SideMenu'
import BattleRightInfo from './BattleRightInfo'
import './battle.scss'

export default function Battle() {
   return (
      <>
         <div className="battle-container">
            <SideMenu />
            <div className="center"></div>
            <BattleRightInfo />
         </div>
      </>
   )
}
