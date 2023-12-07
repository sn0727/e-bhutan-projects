import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const Another = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const handlerBack = () => {
    navigate('/testing', {
      state: { id: location?.state?.id + 1 }
    })
  }

  let parson = {
    id : '',
    name: 'mohd alam',
    age: 20,
    mobile: 123456789,
    address: 'noida'
  }

  let newDD = {...parson, id : 1}
  console.log(newDD)

  let code = '1A';
  function getSeats(seats, code) {
    let newValue = seats.find((sets) => sets?.Code === code);
    return newValue || null
  }

  let getOneObj = getSeats(Seats, code)

  function setArr (getOneObj, parson) {
    if (parson?.name === "mohd alam") {
      return {...parson, newArrValue : [getOneObj]}
    }
    return parson || null
  }

  let updateValue = setArr(getOneObj, parson)

  function checkTrue (){
    return false;
  }

  !checkTrue() ? console.log('1') : console.log('0')





  return (
    <div>Another


      <button type='button' onClick={handlerBack}>back button</button>
    </div>
  )
}


const Seats = [
  {
    "AirlineCode": "6E",
    "FlightNumber": "2505",
    "CraftType": "A320-186",
    "Origin": "DEL",
    "Destination": "BOM",
    "AvailablityType": 3,
    "Description": 2,
    "Code": "1A",
    "RowNo": "1",
    "SeatNo": "A",
    "SeatType": 1,
    "SeatWayType": 2,
    "Compartment": 1,
    "Deck": 1,
    "Currency": "INR",
    "Price": 1600
  },
  {
    "AirlineCode": "6E",
    "FlightNumber": "2505",
    "CraftType": "A320-186",
    "Origin": "DEL",
    "Destination": "BOM",
    "AvailablityType": 3,
    "Description": 2,
    "Code": "1B",
    "RowNo": "1",
    "SeatNo": "B",
    "SeatType": 3,
    "SeatWayType": 2,
    "Compartment": 1,
    "Deck": 1,
    "Currency": "INR",
    "Price": 1300
  },
  {
    "AirlineCode": "6E",
    "FlightNumber": "2505",
    "CraftType": "A320-186",
    "Origin": "DEL",
    "Destination": "BOM",
    "AvailablityType": 1,
    "Description": 2,
    "Code": "1C",
    "RowNo": "1",
    "SeatNo": "C",
    "SeatType": 2,
    "SeatWayType": 2,
    "Compartment": 1,
    "Deck": 1,
    "Currency": "INR",
    "Price": 1600
  },
  {
    "AirlineCode": "6E",
    "FlightNumber": "2505",
    "CraftType": "A320-186",
    "Origin": "DEL",
    "Destination": "BOM",
    "AvailablityType": 1,
    "Description": 2,
    "Code": "1D",
    "RowNo": "1",
    "SeatNo": "D",
    "SeatType": 2,
    "SeatWayType": 2,
    "Compartment": 1,
    "Deck": 1,
    "Currency": "INR",
    "Price": 1600
  },
  {
    "AirlineCode": "6E",
    "FlightNumber": "2505",
    "CraftType": "A320-186",
    "Origin": "DEL",
    "Destination": "BOM",
    "AvailablityType": 1,
    "Description": 2,
    "Code": "1E",
    "RowNo": "1",
    "SeatNo": "E",
    "SeatType": 3,
    "SeatWayType": 2,
    "Compartment": 1,
    "Deck": 1,
    "Currency": "INR",
    "Price": 1300
  },
  {
    "AirlineCode": "6E",
    "FlightNumber": "2505",
    "CraftType": "A320-186",
    "Origin": "DEL",
    "Destination": "BOM",
    "AvailablityType": 1,
    "Description": 2,
    "Code": "1F",
    "RowNo": "1",
    "SeatNo": "F",
    "SeatType": 1,
    "SeatWayType": 2,
    "Compartment": 1,
    "Deck": 1,
    "Currency": "INR",
    "Price": 1600
  }
]