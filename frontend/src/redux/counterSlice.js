import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
   name: 'counter',
   initialState: 10000,
   reducers: {
      setCounter: (state) => state + 1,
   },
})

export const ideaSlice = createSlice({
   name: 'idea',
   initialState: 0,
   reducers: {
      setIdea: (state) => state + 1,
   },
})
export const askSlice = createSlice({
   name: 'ask',
   initialState: 0,
   reducers: {
      setAsk: (state) => state + 1,
   },
})

export const infoSlice = createSlice({
   name: 'info',
   initialState: 0,
   reducers: {
      setInfo: (state) => state + 1,
   },
})

export const experimentSlice = createSlice({
   name: 'experiment',
   initialState: 0,
   reducers: {
      setExperiment: (state) => state + 1,
   },
})

export const recordSlice = createSlice({
   name: 'record',
   initialState: 0,
   reducers: {
      setRecord: (state) => state + 1,
   },
})

export const { setCounter } = counterSlice.actions
export const { setIdea } = ideaSlice.actions
export const { setInfo } = infoSlice.actions
export const { setAsk } = askSlice.actions
export const { setExperiment } = experimentSlice.actions
export const { setRecord } = recordSlice.actions
