// flightSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buses: [], // Your initial Bus data here
  filteredBuses: [], // filterd data of Bus 
  TraceId: '',
  busDetails: null,
  selectedSeat: [],
  AllPassenger:[],
};

const busSlice = createSlice({
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
          state.filteredBuses = [...state.buses].sort((a, b) => a?.BusPrice?.PublishedFare - b?.BusPrice?.PublishedFare);
          break;
        case 'Duration':
          state.filteredBuses = [...state.buses].sort((a, b) => {
            const arrivalTimeA = new Date(a.ArrivalTime);
            const departureTimeA = new Date(a.DepartureTime);
            const arrivalTimeB = new Date(b.ArrivalTime);
            const departureTimeB = new Date(b.DepartureTime);
            const durationMsA = arrivalTimeA.getTime() - departureTimeA.getTime();
            const durationMsB = arrivalTimeB.getTime() - departureTimeB.getTime();
            return durationMsA - durationMsB
          });
          break;
        case 'Timings':
          state.filteredBuses = [...state.buses].sort((a, b) => new Date(a?.DepartureTime) - new Date(b?.DepartureTime));
          // Implement filtering/sorting by timings as needed
          break;
        default:
          state.filteredBuses = [...state.buses]; // Reset to default
          break;
      }
    },
    setBusDetails(state, action) {
      state.busDetails = action.payload
    },
    setTraceId(state, action) {
      state.TraceId = action.payload
    },
    setSelectedSeat(state, action) {
      const data = [...state.selectedSeat].filter((item) => item.SeatName !== action.payload.SeatName)
      console.log(data, action.payload, state.selectedSeat);
      if (data.length === state.selectedSeat.length) {
        state.selectedSeat = [...data, action.payload]
      } else {
        state.selectedSeat = [...data]
      }
    },
    resetSelectedSeat(state, action) {
      state.selectedSeat = []
    },
    setAllPassenger(state, action) {
      state.AllPassenger = action?.payload
    },
  }
});

export const {
  setBuses,
  setBusesFilter,
  setBusDetails,
  setTraceId,
  setSelectedSeat,
  resetSelectedSeat,
  setAllPassenger,
} = busSlice.actions;
export default busSlice.reducer;