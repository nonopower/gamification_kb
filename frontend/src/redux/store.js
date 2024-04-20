import { configureStore, combineReducers } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const persistConfig = {
   key: 'root',
   storage,
}

const reducer = combineReducers({
   counterReducer,
})
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
   reducer: persistedReducer,
})
export const persistor = persistStore(store)
