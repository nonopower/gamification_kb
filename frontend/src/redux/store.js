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
   counterSlice,
   ideaSlice,
   askSlice,
   recordSlice,
   experimentSlice,
   infoSlice,
} from './counterSlice'

const persistConfig = {
   key: 'root',
   storage,
}

const rootReducer = combineReducers({
   counter: counterSlice.reducer,
   idea: ideaSlice.reducer,
   ask: askSlice.reducer,
   record: recordSlice.reducer,
   experiment: experimentSlice.reducer,
   info: infoSlice.reducer,
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
