import { createSlice } from '@reduxjs/toolkit'
import eventBus from '../utils/EventBus'

// monster array
export const monsterArr = [
   {
      name: 'LV.1',
      blood: 20,
      img: '/game/monster/monster_zombie_',
   },
   {
      name: 'LV.2',
      blood: 50,
      img: '/game/monster/monster_robot_',
   },
   {
      name: 'LV.3',
      blood: 100,
      img: '/game/monster/monster_bear_',
   },
   {
      name: 'LV.4',
      blood: 150,
      img: '/game/monster/monster_cloak_',
   },
   {
      name: 'LV.5',
      blood: 300,
      img: '/game/monster/monster_lion_',
   },
]

// point
export const pointSlice = createSlice({
   name: 'point',
   initialState: 0,
   reducers: {
      setPoint: (state, action) => {
         const point = state % 5
         const blood = +localStorage.getItem('blood')
         if (point + action.payload >= 5 && blood > 0) {
            localStorage.setItem('blood', blood - 1)
            eventBus.emit('monster-blood')
         }
         return state + action.payload
      },
   },
})

// 想法
export const ideaSlice = createSlice({
   name: 'idea',
   initialState: 0,
   reducers: {
      setIdea: (state, action) => state + action.payload,
   },
})

// 提問
export const askSlice = createSlice({
   name: 'ask',
   initialState: 0,
   reducers: {
      setAsk: (state, action) => state + action.payload,
   },
})

// 資訊
export const infoSlice = createSlice({
   name: 'info',
   initialState: 0,
   reducers: {
      setInfo: (state, action) => state + action.payload,
   },
})

// 實驗
export const experimentSlice = createSlice({
   name: 'experiment',
   initialState: 0,
   reducers: {
      setExperiment: (state, action) => state + action.payload,
   },
})

// 紀錄
export const recordSlice = createSlice({
   name: 'record',
   initialState: 0,
   reducers: {
      setRecord: (state, action) => state + action.payload,
   },
})

// 已閱讀
export const readSlice = createSlice({
   name: 'read',
   initialState: 0,
   reducers: {
      setRead: (state, action) => state + action.payload,
   },
})

// 已回覆
export const replySlice = createSlice({
   name: 'reply',
   initialState: 0,
   reducers: {
      setReply: (state, action) => state + action.payload,
   },
})

// 上線時間
export const onlineSlice = createSlice({
   name: 'online',
   initialState: 0,
   reducers: {
      setOnline: (state, action) => state + action.payload,
   },
})

// 正在打的怪
export const monsterSlice = createSlice({
   name: 'monster',
   initialState: { name: '', blood: 0, mode: 'normal' },
   reducers: {
      setBlood: (state, action) => {
         return {
            ...state,
            blood: action.payload.blood,
         }
      },
      setOtherMonster: (state, action) => action.payload,
      setMode: (state, action) => {
         return {
            ...state,
            mode: action.payload.mode,
         }
      },
   },
})

export const { setPoint } = pointSlice.actions
export const { setIdea } = ideaSlice.actions
export const { setInfo } = infoSlice.actions
export const { setAsk } = askSlice.actions
export const { setExperiment } = experimentSlice.actions
export const { setRecord } = recordSlice.actions
export const { setRead } = readSlice.actions
export const { setReply } = replySlice.actions
export const { setOnline } = onlineSlice.actions
export const { setBlood, setOtherMonster, setMode } = monsterSlice.actions
