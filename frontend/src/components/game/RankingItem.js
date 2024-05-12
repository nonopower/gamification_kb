import React from 'react'

export default function RankingItem({ ranking }) {
   return (
      <>
         {ranking &&
            ranking.map((item, index) => {
               return (
                  <div className="rankingitem-container" key={index}>
                     <div className="rank">
                        {index <= 2 ? (
                           <img src="/game/gold-medal.png" alt="" />
                        ) : index > 2 && index <= 4 ? (
                           <img src="/game/silver-medal.png" alt="" />
                        ) : (
                           <h3>{index + 1}</h3>
                        )}
                     </div>
                     <div className="name">{item.author+(typeof item.title !== 'undefined' ? '-' + item.title : '')}</div>
                  </div>
               )
            })}
      </>
   )
}
