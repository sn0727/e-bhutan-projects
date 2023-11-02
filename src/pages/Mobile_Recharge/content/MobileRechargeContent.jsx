import React, { useState, useEffect } from 'react';
import airtalImage from "../../../assets/operator/airtal.png"
import jioImage from "../../../assets/operator/jio.png"
import viImage from "../../../assets/operator/vi.png"
import "./../Style/Style.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ApiUrl } from '../../../utils/api';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// loading components
import Loading from "./../../../components/Feature/Loading"
import Loader from '../../../components/Feature/Loader';
import { toast } from 'react-toastify';
import BackButton from '../../../components/Button/BackButton';
import { Autocomplete, Box, TextField } from '@mui/material';

const MobileRechargeContent = () => {
  const location = useLocation();
  // const receivedData = location.state;
  const [receivedData, setreceivedData] = useState(location.state)
  const [operator, setOperator] = useState(receivedData?.operator ? receivedData?.operator?.id : '');
  const [state, setState] = useState('');
  const [ConsumerNumber, setConsumerNumber] = useState(receivedData?.returnNumber1 ? receivedData?.returnNumber1 : '');
  const [operatordata, setOperatorData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectOperator, setSelectedOperator] = useState(receivedData?.operator ? receivedData?.operator : {});
  const navigate = useNavigate();


  // Operator select list fun
  const handleChange = (event) => {
    setreceivedData({})
    setOperator(event.target.value);
    const result = operatordata.filter((item) => item.id === event.target.value);
    setSelectedOperator(result[0])
  };

  // state select list fun 
  const statehandleChange = (event, newValue) => {
    setreceivedData({})
    setState({ circle: newValue });
    // findState(newValue)
  };

  // get operator and circle auto fetch
  const GetOperatorAndCircle = async () => {
    setisLoading(true)
    let token = localStorage.getItem('token');
    try {
      const result = await axios.post(ApiUrl.rechargeCheckHLR,
        {
          number: ConsumerNumber,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      )
      setisLoading(false)
      const { operator, circle } = result?.data?.data?.info;
      findOperator(operator)
      findState(circle)
      // postOperator()
    } catch (error) {
      console.log(error)
      setisLoading(false)
    }

  }

  // FIND OPERATER
  const findOperator = (data) => {
    const result = operatordata.filter((item) => item.name === data);
    setSelectedOperator(result[0])
    setOperator(result[0]?.id)

  }

  const findState = (data) => {
    const result = stateData.filter((item) => data.includes(item.circle));
    setState(result[0])
  }

  // operator call api funcation 
  const getMobileRechargeOperator = async () => {
    try {
      const response = await axios.get(ApiUrl.rechargeGetOperatorList);
      const { data } = await response?.data;
      setOperatorData(data)
      setisLoading(false)
    } catch ({ message }) {
      alert(message)
    }
  }

  // state call api funcation
  const getStateData = async () => {
    try {
      const response = await axios.get(ApiUrl.rechargeGetCircle);
      const { data } = await response?.data;
      setStateData(data)
      setisLoading(false)
    } catch ({ message }) {
      alert(message)
    }
  }


  const postOperator1 = async () => {
    setisLoading(true)
    let token = localStorage.getItem('token');
    try {
      const result = await axios.post(ApiUrl.recharGetPlan,
        {
          circle: state?.circle,
          op: selectOperator.name
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      )
      setisLoading(false)
      navigate("/mobile-choice-plan", { state: { data: result?.data?.data, operator: selectOperator, circle: state, ConsumerNumber: ConsumerNumber } })
    } catch (error) {
      console.log(error)
      setisLoading(false)
    }
  }


  // submit plan next page
  const handlerSubmit = () => {
    if (operator === "") {
      toast.error('Operator field in empty!')
      return false;
    }
    if (state === "") {
      toast.error('State field in empty!')
      console.log(1)
      return false;
    } else {
      postOperator1()
    }
  }


  useEffect(() => {
    if (ConsumerNumber.length === 10) {
      GetOperatorAndCircle()
    }
    if (ConsumerNumber.length === 9 || ConsumerNumber.length === 11 || ConsumerNumber.length === 0) {
      setState({})
    }

  }, [ConsumerNumber])

  useEffect(() => {
    getMobileRechargeOperator();
    getStateData()
    if (receivedData?.circle) {
      setState(receivedData?.circle)
    }
  }, [])

  return (
    <React.Fragment>
      <div className="container mx-auto px-4">
        <div className='comman-container px-4'>
          <div className='mobile-recharge'>
            <BackButton link={"home"} />
            <h1>Mobile Recharge</h1>
          </div>
        </div>
        <div className="inputFeild">
          <div className="enter-mobilenum select-plan mt-2">
            <div className="enter-mobilenum">
              {/* <label className='lable-text d-block'>Enter Mobile Number</label> */}
              <div className='set-p-relative'>
                <input type="text"
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  value={ConsumerNumber}
                  placeholder='Enter Mobile Number.'
                  className='enter-mobile-num bg-white border-cs InputTextColor' />
              </div>
            </div>
          </div>
          <div className="enter-mobilenum">
            <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
              <InputLabel id="demo-select-small-label">Select your Prepaid Operator</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                label="Select your Prepaid Operator"
                onChange={handleChange}
                required
                value={operator ? parseInt(operator) : receivedData?.operator?.id ? parseInt(receivedData?.operator?.id) : ''}
              >
                {
                  operatordata?.length > 0 ? operatordata.map((items, index) => (
                    <MenuItem value={items.id}>
                      <img src={items.image} alt={''} className='airtal-image mr-2' />
                      <div>
                        <p>{items.category}</p>
                        <p>{items.name}</p>
                      </div>
                    </MenuItem>

                  )) : null
                }
              </Select>
            </FormControl>
          </div>
          <div className="enter-mobilenum select-plan">
            {state?.circle ? <Autocomplete
              // value={defaultValue}
              defaultValue={state}
              id="combo-box-demo"
              className='autocomplete-custom-style'
              // getOptionLabel={(option) => getOptionLabel(option)}
              getOptionLabel={(item) => item.circle} // Adjust this according to your API response structure
              options={stateData}
              sx={{ width: 300 }}
              size='sm'
              onInputChange={statehandleChange}
              renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label='Please select state' />}
            /> : null}


            {/* <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
              <InputLabel id="demo-select-small-label">State</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={state}
                label="State"
                onChange={statehandleChange}
              >

                {
                  stateData?.length > 0 ? stateData.map((items, index) => (
                    <MenuItem value={items.circle}>{items.circle}</MenuItem>
                  )) : null
                }


              </Select>
            </FormControl> */}

          </div>
        </div>

        <div className='Pervious-recharge-numbers'>
          {/* <h4 className='my-4'>Pervious recharge numbers</h4>
            <div className='opretor-list'>
              <div className="operator-innner-list">
                <img src={airtalImage} alt="airtal" />
                <div className='oprator-content'>
                  <p><b>Yash Khare</b></p>
                  <p>9876543210</p>
                  <p>Recharged 100/- on 20 June 2023</p>
                </div>
              </div>
              <div className="operator-innner-list">
                <img src={jioImage} alt="airtal" />
                <div className='oprator-content'>
                  <p><b>Yash Khare</b></p>
                  <p>9876543210</p>
                  <p>Recharged 100/- on 20 June 2023</p>
                </div>
              </div>
              <div className="operator-innner-list">
                <img src={viImage} alt="airtal" />
                <div className='oprator-content'>
                  <p><b>Yash Khare</b></p>
                  <p>9876543210</p>
                  <p>Recharged 100/- on 20 June 2023</p>
                </div>
              </div>
            </div> */}

          <div className='button-process'>
            <button type='button' className='button-pro' onClick={handlerSubmit}>
              <Link to="#">Proceed</Link>
              {/* <Link to={"/mobile-choice-plan"}>Proceed</Link> */}
              {/* <Link to={"#"}>Proceed</Link> */}
            </button>
          </div>
        </div>
      </div>
      <Loader isLoading={isLoading} />
    </React.Fragment>
  )
}



export default MobileRechargeContent

