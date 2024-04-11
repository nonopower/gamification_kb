import React from 'react'
import RankingItem from './RankingItem'

export default function Ranking() {
   return (
      <>
         <div className="ranking-container">
            <h2>冒險家排行榜</h2>
            <div className="ranking-list">
               <div className="ranking-scroll">
                  <RankingItem />
               </div>
            </div>
         </div>
      </>
   )
}
