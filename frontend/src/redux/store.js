import { configureStore, combineReducers, createSlice } from '@reduxjs/toolkit'
import {
   persistStore,
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
   pointSlice,
   ideaSlice,
   askSlice,
   recordSlice,
   experimentSlice,
   infoSlice,
   readSlice,
   replySlice,
   onlineSlice,
} from './counterSlice'

const persistConfig = {
   key: 'root',
   storage,
}

const rootReducer = combineReducers({
   point: pointSlice.reducer,
   idea: ideaSlice.reducer,
   ask: askSlice.reducer,
   record: recordSlice.reducer,
   experiment: experimentSlice.reducer,
   info: infoSlice.reducer,
   read: readSlice.reducer,
   reply: replySlice.reducer,
   online: onlineSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})

export const persistor = persistStore(store)
