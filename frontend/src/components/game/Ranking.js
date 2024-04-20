import React from 'react'
import RankingItem from './RankingItem'

export default function Ranking() {
   return (
      <>
         <div className="ranking-container">
            <div className="ranking-list">
               <div className="ranking-scroll">
                  <h2>冒險家排行榜</h2>
                  <RankingItem />
                  <h2>小組排行榜</h2>
                  <RankingItem />
               </div>
            </div>
         </div>
      </>
   )
}
