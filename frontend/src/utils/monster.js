import { monsterArr } from './../redux/counterSlice'
import eventBus from './EventBus'

export const setNextMonster = async () => {
   const nowMonster = localStorage.getItem('monster')
   if (nowMonster === monsterArr[monsterArr.length - 1].name) return false

   const next = monsterArr.findIndex((item) => item.name === nowMonster) + 1

   localStorage.setItem('monster', monsterArr[next].name)
   localStorage.setItem('blood', monsterArr[next].blood)
   eventBus.emit('monster-mode', 'normal')
   eventBus.emit('loading', true)
   window.location.reload(true)
}
