import React from 'react'
import RankingItem from './RankingItem'

export default function Ranking({ allRanking, teamRanking }) {
   return (
      <>
         <div className="ranking-container">
            <div className="ranking-list">
               <div className="ranking-scroll">
                  <h2>冒險家排行榜</h2>
                  <RankingItem ranking={allRanking} />
                  <h2>小組排行榜</h2>
                  <RankingItem ranking={teamRanking} />
               </div>
            </div>
         </div>
      </>
   )
}
