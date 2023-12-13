import { configureStore } from '@reduxjs/toolkit'
import FlightSlice from './slice/FlightSlice'
export const store = configureStore({
  reducer: {
    flights: FlightSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
})