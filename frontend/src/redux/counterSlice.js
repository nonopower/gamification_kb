import { createSlice } from '@reduxjs/toolkit'
import eventBus from '../utils/EventBus'

// point
export const pointSlice = createSlice({
   name: 'point',
   initialState: 0,
   reducers: {
      setPoint: (state, action) => {
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

export const { setPoint } = pointSlice.actions
export const { setIdea } = ideaSlice.actions
export const { setInfo } = infoSlice.actions
export const { setAsk } = askSlice.actions
export const { setExperiment } = experimentSlice.actions
export const { setRecord } = recordSlice.actions
export const { setRead } = readSlice.actions
export const { setReply } = replySlice.actions
