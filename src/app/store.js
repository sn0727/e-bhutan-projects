import { configureStore } from '@reduxjs/toolkit'
import FlightSlice from './slice/FlightSlice'
import BusSlice from './slice/BusSlice'
export const store = configureStore({
  reducer: {
    flights: FlightSlice,
    buses: BusSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: { warnAfter: 128 },
    serializableCheck: { warnAfter: 128 },
  })
})