import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LuIndianRupee } from 'react-icons/lu';
import "./../Style/Style.css"
import { toast } from 'react-toastify';
import BackButton from '../../../components/Button/BackButton';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MobileChoicePlanContent = () => {

  // get data of the choice plan 
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state;
  const { info } = receivedData.data;
  const { circle, operator, data, ConsumerNumber } = receivedData;
  const { COMBO, Romaing, SMS, TOPUP, FULLTT } = info
  const [value, setValue] = useState(0);
  const [isActive, setIsActive] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const choiplanHandler = (event) => {
    event.preventDefault();
    if (isActive) {
      navigate("/mobile-recharge-payment", {
        state: {
          Plan: isActive, circle: circle, operator: operator, ConsumerNumber: ConsumerNumber,
          UserData: {
            invoiceNo: data?.invoiceNo,
            consumerId: data?.consumerId
          }
        }
      })
    } else {
      toast.error('Please choose plan')
    }

  }

  

  return (
    <div className="comman-container px-4">
      <div className='mobile-recharge'>
        <BackButton link={"mobile-recharge"} />
        <h1>Select Plan - {operator?.name}</h1>
      </div>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="tabBar-dser">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Recommended Packs" {...a11yProps(0)} />
            <Tab label="3G/4G" {...a11yProps(1)} />
            <Tab label="2G" {...a11yProps(2)} />
            <Tab label="SMS" {...a11yProps(3)} />
            <Tab label="COMBO" {...a11yProps(4)} />
            <Tab label="Romaing" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className='recommended-packs'>
            <div className="selectpaln">
              {
                TOPUP?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <h3>3G/4G </h3>
          <div className='recommended-packs'>
            <div className="selectpaln">
              {
                info['3G/4G']?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <h3>2G</h3>
          <div className='recommended-packs'>
            <div className="selectpaln">
              {
                info['2G']?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          SMS
          <div className='recommended-packs'>
            <div className="selectpaln">

              {
                SMS?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          COMBO
          <div className='recommended-packs'>
            <div className="selectpaln">
              {
                COMBO?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }
              {
                FULLTT?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          Romaing
          <div className='recommended-packs'>
            <div className="selectpaln">

              {
                Romaing?.map((items, index) => (
                  <div className={`recharge-colurm ${isActive.rs !== items.rs ? "recharge-colurm" : "addborder"}`} key={index} onClick={() => setIsActive(items)}>
                    <div className='price-text'><LuIndianRupee /> <span>{items.rs}</span></div>
                    <div className='other-content'>
                      <p>{items.validity}</p>
                      <p>{items.desc}</p>
                    </div>
                  </div>
                ))
              }

            </div>
          </div>
        </CustomTabPanel>
      </Box>

      <div className='button-process'>
        <button type='button' className='button-pro'>
          <Link onClick={choiplanHandler}>Proceed</Link>
          {/* <Link to={"/mobile-recharge-payment"}>Proceed</Link> */}
        </button>
      </div>
    </div>
  )
}

export default MobileChoicePlanContent
