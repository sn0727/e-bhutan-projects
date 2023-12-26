// flightSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flightReturn: [], // Your initial flight data return
  flights: [], // Your initial flight data here
  filteredFlights: [], // filterd data of flight departure
  filteredFlightsReturn: [], // filterd data of flight return
  TraceId: '',
  ResultIndex: {
    departure: '',
    return: ''
  },
  FlightDetails: {
    departure: null,
    return: null
  },
  AllPassenger: [],

};

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setFlightReturn(state, action) {
      state.flightReturn = action.payload;
    },
    setFlights(state, action) {
      state.flights = action.payload;
      state.filteredFlights = action.payload;
    },
    setFilter(state, action) {
      const { filterOption } = action.payload;
      switch (filterOption) {
        case 'Cheapest':
          state.filteredFlights = [...state.flights].sort((a, b) => a?.Fare?.PublishedFare - b?.Fare?.PublishedFare);
          break;
        case 'Non-Stop':
          state.filteredFlights = state.flights.filter(flight => !flight.StopOver);
          break;
        case 'Duration':
          state.filteredFlights = [...state.flights].sort((a, b) => a.Segments[0][0]?.Duration - b.Segments[0][0]?.Duration);
          break;
        case 'Timings':
          state.filteredFlights = [...state.flights].sort((a, b) => new Date(a?.Segments[0][0]?.Origin?.DepTime) - new Date(b?.Segments[0][0]?.Origin?.DepTime));
          // Implement filtering/sorting by timings as needed
          break;
        default:
          state.filteredFlights = [...state.flights]; // Reset to default
          break;
      }
    },
    setFilterReturn(state, action) {
      const { filterOption } = action.payload;
      switch (filterOption) {
        case 'Cheapest':
          state.filteredFlightsReturn = [...state.flightReturn].sort((a, b) => a?.Fare?.PublishedFare - b?.Fare?.PublishedFare);
          break;
        case 'Non-Stop':
          state.filteredFlightsReturn = state.flightReturn.filter(flight => !flight.StopOver);
          break;
        case 'Duration':
          state.filteredFlightsReturn = [...state.flightReturn].sort((a, b) => a.Segments[0][0]?.Duration - b.Segments[0][0]?.Duration);
          break;
        case 'Timings':
          state.filteredFlightsReturn = [...state.flightReturn].sort((a, b) => new Date(a?.Segments[0][0]?.Origin?.DepTime) - new Date(b?.Segments[0][0]?.Origin?.DepTime));
          // Implement filtering/sorting by timings as needed
          break;
        default:
          state.filteredFlightsReturn = [...state.flightReturn]; // Reset to default
          break;
      }
    },
    setTraceId(state, action) {
      state.TraceId = action.payload;
    },
    setResultIndex(state, action) {
      const data = action.payload
      state.ResultIndex = { ...state.ResultIndex, ...data }
    },
    setFlightDetails(state, action) {
      const data = action.payload
      state.FlightDetails = { ...state.FlightDetails, ...data }
    },
    resetFlightDetails(state, action) {
      state.FlightDetails = initialState?.FlightDetails
    },
    setAllPassenger(state, action) {
      state.AllPassenger = action?.payload
    },
  },
});

export const {
  setFlightReturn,
  setFlights,
  setFilter,
  setFilterReturn,
  setTraceId,
  setResultIndex,
  setFlightDetails,
  resetFlightDetails,
  setAllPassenger
} = flightSlice.actions;
export default flightSlice.reducer;
