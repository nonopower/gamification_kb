import { monsterArr } from './../redux/counterSlice'
import eventBus from './EventBus'

export const setNextMonster = async () => {
   const nowMonster = localStorage.getItem('monster')

   const next = monsterArr.findIndex((item) => item.name === nowMonster) + 1
   if (next > monsterArr.length) return false

   localStorage.setItem('monster', monsterArr[next].name)
   localStorage.setItem('blood', monsterArr[next].blood)
   eventBus.emit('monster-mode', 'normal')
   eventBus.emit('loading', true)
   window.location.reload(true)
}
