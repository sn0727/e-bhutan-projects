import React, { useState, useRef, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import debounce from 'lodash/debounce'; // Importing lodash's debounce function
import { APIRequest, ApiUrl } from '../../../../utils/api';

const SearchCity = ({ setValue, Value, type }) => {
  const [options, setOptions] = useState([]);
  const previousController = useRef();



  // Debounce the API call using Lodash's debounce function
  const debouncedGetData = useRef(debounce((searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;
    let config = {
      method: 'post',
      url: ApiUrl?.flightGetAirportcode,
      body: {
        "CityName": searchTerm,
      },
    }
    APIRequest(
      config,
      res => {
        console.log(res, '====================== res booking dd')
        setOptions(res.data);
      },
      err => {
        console.log(err, '====================== err booking')
      }
    )
    // fetch("https://dummyjson.com/products/search?q=" + searchTerm, {
    //   signal,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   }
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (myJson) {
    //     console.log("search term: " + searchTerm + ", results: ", myJson.products);
    //     const updatedOptions = myJson.products.map((p) => {
    //       return { title: p.title };
    //     });
    //     setOptions(updatedOptions);
    //   });
  }, 500)); // 500 milliseconds debounce time

  const onInputChange = (event, value) => {
    debouncedGetData.current(value); // Call the debounced function with the input value
  };

  const getOptionLabel = (option) => {
    return `${option.CITYNAME} - ${option.AIRPORTCODE}`; // Concatenate CITYNAME and CITYCODE
  };

  return (
    <div style={{ width: '42%' }} className='searchcity'>
      {/* <p className={ type=== 'To' ? 'ticket-gray-text text-right' : 'ticket-gray-text'}>{type}</p> */}
      <p className={type === 'To' ? 'ticket-gray-bold-text text-right' : 'ticket-gray-bold-text'}>{Value?.CITYNAME}</p>
      {/* <p className='ticket-gray-text text-right'>{type}</p>
      <p className='ticket-gray-bold-text text-right'>{Value?.CITYNAME}</p> */}
      <Autocomplete
        {...data}
        id="clear-on-escape"
        clearOnEscape
        options={options}
        onInputChange={onInputChange}
        getOptionLabel={getOptionLabel}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => (
          <TextField {...params} label={type} variant="standard" />
        )}
      />
    </div>
  );
};

export default SearchCity;



const data = [
  {
    "id": 1094,
    "AIRPORTCODE": "ELS",
    "AIRPORTNAME": "East London",
    "CITYCODE": "ELS",
    "CITYNAME": "East London",
    "COUNTRYCODE": "ZA",
    "COUNTRYNAME": "South Africa"
  },
  {
    "id": 2163,
    "AIRPORTCODE": "LDY",
    "AIRPORTNAME": "Eglinton",
    "CITYCODE": "LDY",
    "CITYNAME": "Londonderry",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 2248,
    "AIRPORTCODE": "LHR",
    "AIRPORTNAME": "Heathrow",
    "CITYCODE": "LON",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 2249,
    "AIRPORTCODE": "LGW",
    "AIRPORTNAME": "Gatwick",
    "CITYCODE": "LON",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 2251,
    "AIRPORTCODE": "QQK",
    "AIRPORTNAME": "Kings Cross Railway Station Airport",
    "CITYCODE": "LON",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 2252,
    "AIRPORTCODE": "STN",
    "AIRPORTNAME": "Stansted",
    "CITYCODE": "LON",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 2254,
    "AIRPORTCODE": "LTN",
    "AIRPORTNAME": "Luton Airport",
    "CITYCODE": "LON",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 2255,
    "AIRPORTCODE": "LCY",
    "AIRPORTNAME": "London City Apt",
    "CITYCODE": "LON",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 3302,
    "AIRPORTCODE": "QQU",
    "AIRPORTNAME": null,
    "CITYCODE": "QQU",
    "CITYNAME": "London",
    "COUNTRYCODE": "GB",
    "COUNTRYNAME": "United Kingdom"
  },
  {
    "id": 4740,
    "AIRPORTCODE": "YXU",
    "AIRPORTNAME": "London",
    "CITYCODE": "YXU",
    "CITYNAME": "London",
    "COUNTRYCODE": "CA",
    "COUNTRYNAME": "Canada"
  }
]