
import React, { useEffect, useState } from 'react'
import Header from "../../components/Common/Header/Header";
import Footer from "../../components/Common/Footer/Footer";
import ImageFingerprint from "../../assets/aeps/fingerprint.png"
import ImageHp from "../../assets/aeps/hp.png"
import ImageMobile from "../../assets/aeps/mobile.png"
import ImageAirtal from "../../assets/operator/airtal.png"
import { SaveBillOption, SaveBillOption1 } from '../../utils/api';
import "./Css/money_Transfer.css"
import { Link, useNavigate } from 'react-router-dom';
import BackButton from '../../components/Button/BackButton';
import { BsBank } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa'
import { BsArrowRepeat } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineSearch, AiOutlineUserAdd } from 'react-icons/ai'
import { AiFillWarning } from "react-icons/ai"
import { ApiUrl, APIRequest } from '../../utils/api';
import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import AddBaneficiaryModal from '../../components/Modal/AddBaneficiaryModal';
import PayPannyModal from '../../components/Modal/PayPannyModal';
import PayToSendMoneyModal from '../../components/Modal/PayToSendMoneyModal';

// mobile no verifed
const MobileNumberVerify = () => {

  const navigate = useNavigate()
  const [isLoading, setisLoading] = useState(false)
  const [isOpen, setInOpen] = useState(true)
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const [mob, setMob] = useState("")

  const onsubmitQuaryEmmiter = () => {
    setisLoading(true)
    let data = {
      "mobile": mob,
      "bank3_flag": "No"
    }

    let config = {
      url: ApiUrl.queryImmitor,
      method: 'post',
      body: data
    };
    APIRequest(
      config,
      res => {
        console.log(res, "=================== res mobile")
        toast.success(res?.message)
        setInOpen(false)
        setisLoading(false)
        navigate('/register-beneficiary', { state: { res: res?.data, mobileNo: mob } })
      },
      err => {
        console.log(err);
        toast.error(err?.message)
        setisLoading(false)
      }

    )

  }

  return (
    <>
      {/* pop modal  */}
      {/* <Button onClick={onOpen}>Open Modal</Button> */}
      <Modal isOpen={true} >
        {/* <ModalOverlay /> */}
        <ModalContent>
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <div className='Verified-Transfer'>
              <div className='text-center warring-icon'>
                <AiFillWarning />
              </div>
              <p className='danger mb-2'>You'r not Verified To Transfer Money</p>
              <p className='mb-4'>(Enter Details To Be Verified)</p>

              <Input placeholder='Enter mobile no.' className='search-input' onChange={(e) => setMob(e.target.value)} />
            </div>

            <div className='button-process my-0' style={{ margin: '20px 0' }}>
              <button type='button' className='button-pro'>
                <Link onClick={() => onsubmitQuaryEmmiter()}>
                  {
                    isLoading ? <div>
                      <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                      </svg>
                      Loading...
                    </div> : "Proceed"
                  }
                </Link>
              </button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}


const Money_Transfer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [getRemitterData, setGetRemitterData] = useState({});
  const [tokenData, setTokenData] = useState('');
  const [fetchBeneficiaryData, setFetchBeneficiaryData] = useState([]);

  const getTokenData = () => {
    let config = {
      url: "https://api.ebhuktan.com/api/user/getByToken",
      method: 'get',
    };
    APIRequest(
      config,
      res => {
        // console.log(res, "token data, ===================")
        getRemitterByIdFun(res?.user?.partnerId);
        setTokenData(res?.user)
      },
      err => {
        console.log(err, "token data err, ===================");
      }
    );

  }

  // console.log(tokenData?.dmtuse, "=========== getRemitterData chan -==")

  const getRemitterByIdFun = (partnerId) => {
    let config = {
      url: ApiUrl.getRemitterById,
      method: 'post',
      body: {
        // "partnerId": "R001012"
        "partnerId": partnerId
      }

    };
    APIRequest(
      config,
      res => {
        fetchBeneficiaryFun(res?.data?.mobile)
        setGetRemitterData(res?.data)
      },
      err => {
        console.log(err, "setGetRemitterData error ==================");
      }
    );

  }

  const fetchBeneficiaryFun = (mobileNo) => {
    let config = {
      url: ApiUrl?.fetchBeneficiary,
      method: 'post',
      body: {
        // "mobile": "9354940727"
        "mobile": mobileNo,
      }
    };
    APIRequest(
      config,
      res => {
        // console.log(res?.data?.data, "====================res == new data mila")
        setFetchBeneficiaryData(res?.data?.data)
      },
      err => {
        console.log(err, "================== err mili");
      }
    );

  }

  // delete record  deleteBeneficiary
  const deleteBeneficiary = (bene_id) => {
    alert('Your want to delete')
    let config = {
      url: ApiUrl?.deleteBeneficiary,
      method: 'delete',
      body: {
        "mobile": getRemitterData?.mobile,
        "bene_id": bene_id
      }
    };
    APIRequest(
      config,
      res => {
        console.log(res, "==================== delete")
        toast.success(res?.message)
        setTimeout(()=> {
          window.location.reload(false);
        }, 1000)
      },
      err => {
        console.log(err, "================== err mili");
        toast.success(err?.message)
      }
    );
  }


  useEffect(() => {
    getTokenData();
  }, []);



  

  return (
    <>
      <Header />
      <div className="comman-container px-4" style={{marginBottom: '50px'}}>
        <div className='mobile-recharge'>
          <BackButton link={"home"} />
          <h1>Send Money To Any Bank</h1>
        </div>

        <div className='add-baneficiary'>
          <div className='add-baneficiary-inner'>
            <BsBank className='s1' />
            <h1>Add Baneficiary Account Details </h1>
          </div>
          <AddBaneficiaryModal isOpenOff={isOpen} mobileNo={getRemitterData?.mobile} />
        </div>

        <div className='recenttext'>
          <h1>React And Saved Baneficiary</h1>
        </div>

        {/* <div className='search-baneficry-main-div'>
          <div className='search-div'>
            <AiOutlineSearch />
            <Input placeholder='Search Banefeciry' className='search-input' />
          </div>
          <div className='refersh-div'>
            <BsArrowRepeat />
          </div>
          <div className='refersh-div'>
            <AiOutlineUserAdd />
          </div>
        </div> */}

        {/* baneficery details  */}
        {
          fetchBeneficiaryData.length > 0 ?
          fetchBeneficiaryData.map((item, index) => (
            <div className='ben_deatails' key={index}>
              <div className='ban_left_deatils'>
                <p>Name :- {item?.name}</p>
                <p>A/c :- {item?.bankname}</p>
                <p>IFSC :- {item?.ifsc}</p>
              </div>
              <div className='bane_right_detai'>
                <div className='bene_delete'>
                  {/* <Button > Pay 1&#8377; For Test</Button> */}
                  <PayToSendMoneyModal userDetails={item} mobileNo={getRemitterData?.mobile} />
                  <PayPannyModal itemData={item} mobileNo={getRemitterData?.mobile} />
                  <Button colorScheme='blue' onClick={() => deleteBeneficiary(item?.bene_id)}>
                    <RiDeleteBin6Line />
                  </Button>
                </div>
              </div>
            </div>
          )) : <div className='not-Found'>Not Found.</div>
        }
      </div >
      <Footer />
      <>
        {tokenData?.dmtuse === "false" ? <MobileNumberVerify />  : null}
        {/* <MobileNumberVerify /> */}
      </>
    </>
  )
}

export default Money_Transfer
