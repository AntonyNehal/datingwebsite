import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import genderReducer from './user/genderSlice';
export const store = configureStore({
  reducer: {
    user:userReducer,
    gender: genderReducer,
  },
})
