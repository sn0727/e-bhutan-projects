// flightSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buses: [], // Your initial Bus data here
  filteredBuses: [], // filterd data of Bus 
  TraceId: '',

};

const flightSlice = createSlice({
  name: 'buses',
  initialState,
  reducers: {
    setBuses(state, action) {
      state.buses = action.payload;
      state.filteredBuses = action.payload;
    },
    setBusesFilter(state, action) {
      const { filterOption } = action.payload;
      switch (filterOption) {
        case 'Cheapest':
          state.filteredBuses = [...state.buses].sort((a, b) => a?.Fare?.PublishedFare - b?.Fare?.PublishedFare);
          break;
        case 'Non-Stop':
          state.filteredBuses = state.buses.filter(flight => !flight.StopOver);
          break;
        case 'Duration':
          state.filteredBuses = [...state.buses].sort((a, b) => a.Segments[0][0]?.Duration - b.Segments[0][0]?.Duration);
          break;
        case 'Timings':
          state.filteredBuses = [...state.buses].sort((a, b) => new Date(a?.Segments[0][0]?.Origin?.DepTime) - new Date(b?.Segments[0][0]?.Origin?.DepTime));
          // Implement filtering/sorting by timings as needed
          break;
        default:
          state.filteredBuses = [...state.buses]; // Reset to default
          break;
      }
    },
  }
})