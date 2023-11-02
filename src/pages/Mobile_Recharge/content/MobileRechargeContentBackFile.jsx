import React, { useState, useEffect } from 'react';
import airtalImage from "../../../assets/operator/airtal.png"
import jioImage from "../../../assets/operator/jio.png"
import viImage from "../../../assets/operator/vi.png"
import "./../Style/Style.css"
import { Link, useNavigate } from 'react-router-dom';
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
import { Autocomplete, TextField } from '@mui/material';
import { Box } from '@chakra-ui/react';

const MobileRechargeContent = () => {

  const [operator, setOperator] = useState('');
  const [state, setState] = useState('');
  const [ConsumerNumber, setConsumerNumber] = useState('');
  const [operatordata, setOperatorData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  // console.log(state, "selectedOption new")


  const navigate = useNavigate();

  // Operator select list fun
  const handleChange = (event) => {
    setOperator(event.target.value);
  };

  // state select list fun 
  const statehandleChange = (event, newValue) => {
    setState(newValue);
  };

  // operator call api funcation 
  const getMobileRechargeOperator = async () => {
    try {
      const response = await axios.get(ApiUrl.rechargeGetOperatorList);
      const { data } = await response.data;
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
      const { data } = await response.data;
      setStateData(data)
      setisLoading(false)
    } catch ({ message }) {
      alert(message)
    }
  }

  // choice operator form the api

  const postOperator = async () => {
    setisLoading(true)
    let token = localStorage.getItem('token');
    try {
      const result = await axios.post(ApiUrl.recharGetPlan,
        {
          circle: state,
          op: operator.name
        },
        {
          headers: {
            'Content-Type': 'application/json',
            token: token
          }
        }
      )
      setisLoading(false)
      navigate("/mobile-choice-plan", { state: { data: result?.data?.data, operator: operator, circle: state, ConsumerNumber: ConsumerNumber } })
      // navigate("/")
    } catch (error) {
      console.log(error.response.data)
      setisLoading(false)
    }

  }

  // submit plan next page
  const handlerSubmit = () => {
    // isLoading ? <Loading /> : postOperator()

    if (operator === "") {
      toast.error('Operator field in empty!')
      console.log(1)
      return false;
    }
    if (state === "") {
      toast.error('State field in empty!')
      console.log(1)
      return false;
    }
    if (ConsumerNumber.length > 9 && ConsumerNumber.length < 11) {
      postOperator()
    } else {
      toast.error('Mobile Number must be 10 digit!')
    }
  }

  useEffect(() => {
    getMobileRechargeOperator();
    getStateData()
  }, [])


  return (
    <React.Fragment>
      <div className="container mx-auto px-4">
        <div className='mobile-recharge'>
          <BackButton link={"home"} />
          <h1>Mobile Recharge</h1>
        </div>
        <div className="inputFeild">
          <div className="enter-mobilenum">
            <FormControl sx={{ m: 1, minWidth: 340 }} size="small">
              <InputLabel id="demo-select-small-label">Operator</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={operator}
                label="operator"
                onChange={handleChange}
                required
              >

                {
                  operatordata?.length > 0 ? operatordata.map((items, index) => (

                    <MenuItem value={items}>
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
            <span>Please select your opretor</span>
          </div>
          <div className="enter-mobilenum select-plan mt-2">
            <div className="enter-mobilenum">
              {/* <label className='lable-text d-block'>Enter Mobile Number</label> */}
              <div className='set-p-relative'>
                <input type="number"
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  value={ConsumerNumber}
                  placeholder='9939074904'
                  className='enter-mobile-num bg-white border-cs InputTextColor' />
                <span className='mt-1'>Please enter your 10 digit mobile number </span>
              </div>
            </div>
          </div>
          <div className="enter-mobilenum select-plan">
            <Autocomplete
              id="combo-box-demo"
              className='autocomplete-custom-style'
              getOptionLabel={(stateData) => stateData.circle} // Adjust this according to your API response structure
              options={stateData}
              sx={{ width: 300 }}
              size='sm'
              onInputChange={statehandleChange}
              renderInput={(params) => <TextField {...params} className='autocomplete-custom-style-input' label="Please choice circle" />}
            />

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

