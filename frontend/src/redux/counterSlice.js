import { createSlice } from '@reduxjs/toolkit'

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
export const counterSlice = createSlice({
   name: 'counter',
   initialState: 0,
   reducers: {
      setCounter: (state, action) => state + action.payload,
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
      setMod: (state, action) => {
         return {
            ...state,
            mode: action.payload.mode,
         }
      },
   },
})

export const { setCounter } = counterSlice.actions
export const { setIdea } = ideaSlice.actions
export const { setInfo } = infoSlice.actions
export const { setAsk } = askSlice.actions
export const { setExperiment } = experimentSlice.actions
export const { setRecord } = recordSlice.actions
export const { setBlood, setOtherMonster, setMod } = monsterSlice.actions
