import React, { useEffect, useState } from 'react'
import { MdLocationPin } from "react-icons/md";
import { image } from '../../../constent/image'
import { ButtonBook } from '../../../components/Common/Button/button';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { adultsQuantity1, childrenQuantity1, ipAddressSave, reponseHotelDetails, roomQuantity, saveHotelBookResponseData, saveIPAddress, savePerHotelRecord, saveRoomPerData, saveRoomsMultipleData, selectRoomArr, valueSaveFalse } from '../atom/atom';
import { APIRequest, ApiUrl } from '../../../utils/api';
import { Button, ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { toast } from 'react-toastify';
import moment from 'moment/moment';
import { SkeletonBookingDetails, SkeletonBookingList } from '../../../components/SkeletonTemplate/SkeletonBookingForm';

const ServiceBookingDetails = ({ setIdComponent }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isLoading1, setIsLoading1] = useState(true)
  const [buttonSpiner, setButtonSpiner] = useState(false)
  // const [isLoadingBlock, setIsLoadingBlock] = useRecoilState(valueSaveFalse)
  const [activeSelectBtn, setActiveSelectBtn] = useState({})
  const [imgPath, setImgPath] = useState('')
  const [isActiveImg, setIsActiveImg] = useState(0)
  const [storeHtRoomResult, setStoreRoomResult] = useState([])
  const [hotelDetailsPerRd, setHotelDetailsPerRd] = useState({})
  const getPerRecordHotel = useRecoilValue(savePerHotelRecord)
  const hotelResponseData = useRecoilValue(reponseHotelDetails)
  const adultsQuantity = useRecoilValue(adultsQuantity1)
  const childrenQuantity = useRecoilValue(childrenQuantity1)
  const roomNoOfQuantity = useRecoilValue(roomQuantity)
  const storeRoomResult = useSetRecoilState(saveRoomPerData)
  const [hotelBookDataResponse, setHotelBookDataResponse] = useRecoilState(saveHotelBookResponseData)
  const [selectRoom, setSelectRoom] = useRecoilState(selectRoomArr)
  const [saveRooms, setSaveRooms] = useRecoilState(saveRoomsMultipleData)
  const { ResultIndex, HotelName, HotelCode } = getPerRecordHotel;
  const { TraceId } = hotelResponseData?.HotelSearchResult;
  const [demoIp_Address, setDemoIp_Address] = useState('192.168.10.26')

  // get ip address value
  useEffect(() => {
    const getIpAddressFun = async () => {
      try {
        const response = await fetch(`https://api.db-ip.com/v2/free/self`);
        const data = await response.json();
        setDemoIp_Address(data?.ipAddress);
        // Now that the IP address is set, call getStateName
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };
    getIpAddressFun();
  }, [setDemoIp_Address]);

  useEffect(() => {
    // Check if ipAddress is available
    if (demoIp_Address) {
      let config = {
        url: ApiUrl?.getHotelInfo,
        method: 'post',
        body: {
          "ResultIndex": ResultIndex,
          "HotelCode": HotelCode,
          "EndUserIp": demoIp_Address,
          "TraceId": TraceId
        }
      };
      APIRequest(
        config,
        res => {
          setHotelDetailsPerRd(res?.data?.HotelInfoResult?.HotelDetails)
          setIsLoading(false)
        },
        err => {
          console.log('err of the hotel details =======', err)
        }
      );
    }

  }, [demoIp_Address])

  useEffect(() => {
    // Check if ipAddress is available
    if (hotelDetailsPerRd && demoIp_Address) {
      let config = {
        url: ApiUrl?.getHotelRoom,
        method: 'post',
        body: {
          "ResultIndex": ResultIndex,
          "HotelCode": HotelCode,
          "EndUserIp": demoIp_Address,
          "TraceId": TraceId
        }
      };
      APIRequest(
        config,
        res => {
          storeRoomResult(res?.data?.GetHotelRoomResult)
          setStoreRoomResult(res?.data?.GetHotelRoomResult)
          setSaveRooms([])
          setHotelBookDataResponse([])
          setIsLoading1(false)
        },
        err => {
          if (err?.error) {
            toast.error(err?.message, "err")
            setIdComponent(2)
          }
        }
      );
    }
  }, [hotelDetailsPerRd, demoIp_Address])

  const handlerImage = (url) => {
    setImgPath(url)
  }

  const selectMultipleRoomFun = (roomData) => {
    // Check if the number is already selected

    if (saveRooms.includes(roomData)) {
      // If selected, remove it from the array
      setSaveRooms(saveRooms?.filter((selected) => selected !== roomData));
    } else {
      setSaveRooms([roomData])
    }
  };

  // hotal block booking api =====================
  let modifyArrRoom = saveRooms?.map((availableRoom) => {
    let SmokingPreferenceValue;
    if (availableRoom?.SmokingPreference === "NoPreference") {
      SmokingPreferenceValue = 0
    } else if (availableRoom?.SmokingPreference === "Smoking") {
      SmokingPreferenceValue = 1
    } else if (availableRoom?.SmokingPreference === "NonSmoking") {
      SmokingPreferenceValue = 2
    } else if (availableRoom?.SmokingPreference === "Either") {
      SmokingPreferenceValue = 3
    }
    return {
      RoomIndex: availableRoom?.RoomIndex,
      RoomTypeCode: availableRoom?.RoomTypeCode,
      RoomTypeName: availableRoom?.RoomTypeName,
      RatePlanCode: availableRoom?.RatePlanCode,
      BedTypeCode: availableRoom?.BedTypeCode ? availableRoom?.BedTypeCode : null,
      SmokingPreference: SmokingPreferenceValue,
      Supplements: availableRoom?.Supplements ? availableRoom?.Supplements : null,
      Price: availableRoom?.Price
    }
  })

  // Duplicate each object based on roomNoOfQuantity
  let duplicatedArray = modifyArrRoom.flatMap(room => Array.from({ length: roomNoOfQuantity }, () => ({ ...room })));

  const contiuneProcess = () => {
    if (saveRooms.length > 0) {
      setButtonSpiner(true)
      let config = {
        url: ApiUrl?.hotelBlockRoom,
        method: 'post',
        body: {
          "ResultIndex": ResultIndex,
          "HotelCode": HotelCode,
          "HotelName": HotelName,
          "GuestNationality": "IN",
          "NoOfRooms": roomNoOfQuantity,
          "ClientReferenceNo": "0",
          "IsVoucherBooking": "true",
          "EndUserIp": demoIp_Address,
          "TraceId": TraceId,
          "HotelRoomsDetails": [...duplicatedArray],
        }
      }
      APIRequest(
        config,
        res => {
          // console.log(res, 'res hotel booking ==================')
          setHotelBookDataResponse(res?.data)
          setSelectRoom(duplicatedArray)
          setButtonSpiner(false)
          setIdComponent(4)
        },
        err => {
          // console.log(err, 'err ============ hotel booking ff')
          if (err?.error) {
            toast.error(err?.message)
          }
          setButtonSpiner(false)
        }
      )
    } else {
      alert('Please select one room.')
    }

  }

  // console.log(duplicatedArray, 'duplicatedArray ===============')

  return (
    <>
      {
        !isLoading ?
          <>
            <div className='main-bx-dt-sr my-5'>
              <div className='mian-in-ht-sr-bk'>
                <div className='dt-image'>
                  <img src={imgPath ? imgPath : image?.service01} alt="details one" className='service details one' />
                </div>
                <h2 className='Preview-ht-dt mt-3 mb-2'>Preview</h2>
                {/* <div className='sdfsdhfds-dsfksdj'>
                    <div className='set-scrol-sfd'>
                      <div className='image-thum-ht-st' style={{ width: '900px' }}>
                        {
                          sliderImage.map((slide, index) => (
                            <div className={`img01-ht ${isActiveImg === index ? 'activeBorder' : ''}`} key={index} onClick={() => handlerImage(slide?.image, setIsActiveImg(index))}>
                              <img src={slide?.image} alt="service 01" className='thems-img' />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </div> */}
                <ul class="scroll">
                  {
                    hotelDetailsPerRd?.Images?.map((slide, index) => (
                      <li className={`list-item img01-ht ${isActiveImg === index ? 'activeBorder' : ''}`} key={index} onClick={() => handlerImage(slide, setIsActiveImg(index))}>
                        <img src={slide} alt="service 01" className='thems-img' />
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className='right-content-ht-dt'>
                <div className='review-sr-ht' style={{ top: 0 }}>
                  <div>
                    <h5>Good</h5>
                    <p>476 review</p>
                  </div>
                  <div>
                    {hotelDetailsPerRd?.StarRating}
                  </div>
                </div>
                <div className="content-bx-ht-sr">
                  <p style={{ fontSize: '22px', maxWidth: '350px' }}>{hotelDetailsPerRd?.HotelName}</p>
                  <p style={{ marginTop: '10px', fontSize: '16px' }}><MdLocationPin /> {hotelDetailsPerRd?.Address}</p>
                  <p className='sdfgdsd-sdfdsfdls' style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    color: '#000',
                    fontSize: '14px'
                  }}>

                  </p>
                  <p className='detail-page-df-ht'>
                    <div dangerouslySetInnerHTML={{ __html: hotelDetailsPerRd?.Description?.slice(0, 1000) + '...' }} />
                  </p>
                  {/* {hotelDetailsPerRd?.Description?.slice(0, 550) + '...'} */}
                  {/* <p className='mt-4'>{getPerRecordHotel?.Price?.CurrencyCode} {getPerRecordHotel?.Price?.PublishedPrice}</p> */}
                  {
                    <p className='room-guest-dt mt-3'>
                      <div>
                        Guest Details : Rooms {roomNoOfQuantity} - Adults {adultsQuantity} - Children {childrenQuantity}
                      </div>
                    </p>
                  }
                </div>
              </div>
            </div >
            <ChakraProvider>
              <div className='tab-bar-dfd' style={{ margin: '50px 0' }}>
                <Tabs>
                  <TabList>
                    <Tab>Overview</Tab>
                    <Tab>Hotel Facilities</Tab>
                    <Tab>Hotel Policy</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <h2>Overview</h2>
                      <div dangerouslySetInnerHTML={{ __html: hotelDetailsPerRd?.Description }} />
                    </TabPanel>
                    <TabPanel>
                      <h2>Hotel Facilities</h2>
                      <div dangerouslySetInnerHTML={{ __html: hotelDetailsPerRd?.HotelFacilities }} />
                    </TabPanel>
                    <TabPanel>
                      <h2>Hotel Policy</h2>
                      <div dangerouslySetInnerHTML={{ __html: hotelDetailsPerRd?.HotelPolicy }} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </ChakraProvider>
          </>
          : <SkeletonBookingDetails />
      }

      {
        !isLoading1 ?
          <>
            {/* =========== availbal room details =============== */}
            <div class="rmSelectRooms">
              <h2 className='mb-3'>Available Rooms :-- </h2>
              <div class="rmHeader">
                <div className="rmHeader__item"><span className="font14 latoBlack capText">Room Type</span></div>
                <div className="rmHeader__item"><span className="font14 latoBlack capText">Options</span></div>
                <div className="rmHeader__item"><span className="font14 latoBlack capText">Price</span></div>
              </div>
              <div className="rmSelectCont appendBottom20">
                <div className="rmSelect__card">
                  <div className="rmSelect__card--wrap">
                    {
                      storeHtRoomResult?.HotelRoomsDetails?.map((roomData, index) => (
                        <div className="rmSelect__card--wrapRow" id="room0">
                          <div className="rmSelect__card--left">
                            <div className="rmType">
                              <div className="rmPhotos appendBottom15">
                                <div className="slick-slider slick-initialized" dir="ltr">
                                  <div className="rmPhotos__item pointer" style={{ width: '100%', display: 'inline-block' }}>
                                    <img src="https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/room-imgs/20080802125928557-154363-62508cacd84111e9b0530242ac11000b.jpg?downsize=377:200&crop=377:200" alt title />
                                  </div>
                                </div>
                              </div>
                              <h2 className="rmType__roomName" data-testid="rmType__roomName">{roomData?.RoomTypeName}</h2>
                              <div className='mb-3'>
                                {roomData?.RoomDescription}
                              </div>
                              <ul className="rmTypeList appendTop10 vertical">
                                <li className="rmTypeList__item">
                                  <span className="makeFlex column column-text">
                                    <span className="rmTypeList__item--text"><b>Last Cancellation Date</b> : {moment(roomData?.LastCancellationDate).format('DD/MMM/YYYY, hh:mm, A')}</span>
                                  </span>
                                </li>
                                <li className="rmTypeList__item">
                                  <span className="makeFlex column column-text">
                                    <span className="rmTypeList__item--text">
                                      No cancellation charge will be applied up to this date. If the date is less than book date then cancellation charge will be applicable as per policy
                                    </span>
                                  </span>
                                </li>
                                <li className="rmTypeList__item">
                                  <span className="rmTypeList__item--icon appendRight10"><img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/bed.png" alt="1 Queen bed or 2 Twin Bed(s)" /></span>
                                  <span className="makeFlex column column-text"><span className="rmTypeList__item--text">{roomData?.RoomTypeName}</span></span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="rmSelect__card--right">
                            <div className="rmSelect__card--row">
                              <div className="rmSelect__card--rowLeft">
                                <div className="rmRatePlan">
                                  <div className="makeFlex end flexWrap"><span className="rmRatePlan__rec appendRight3">{storeHtRoomResult?.ResponseStatus === 1 ? ('Room available') : 'Not Available'}</span></div>
                                  <h5 className="rmRatePlan__heading">Most popular facilities</h5>
                                  <ul className="rmRatePlan__list">
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl">
                                        <p className="flexOne rmRatePlan__list--text"><span>Amenities : {roomData?.Amenities}</span></p>
                                      </div>
                                    </li>
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text"><span>Amenity : {roomData?.Amenity}</span></p></div>
                                    </li>
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Smoking Preference : {roomData?.SmokingPreference}</p></div>
                                    </li>
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Room Description : {roomData?.RoomDescription}</p></div>
                                    </li>
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">InfoSource : {roomData?.InfoSource}</p></div>
                                    </li>
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Rate Plan Name : {roomData?.RatePlanName}</p></div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rmRatePlan">
                                  <div className="makeFlex end flexWrap" />
                                  <h5 className="rmRatePlan__heading">Cancellation Policy Description :</h5>
                                  <ul className="rmRatePlan__list">
                                    <li className="rmRatePlan__list--item">
                                      <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                                      <div className="flexOne rmRatePlan__list--dtl">
                                        <p className="flexOne rmRatePlan__list--text"><span>{roomData?.CancellationPolicy}</span></p>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                                <div className="rmRatePlan">
                                  <div className="makeFlex end flexWrap" />
                                  <h5 className="rmRatePlan__heading">Cancellation Policies</h5>
                                  <ul className="rmRatePlan__list">
                                    {
                                      roomData?.CancellationPolicies?.map((CancellationDes, index) => (
                                        <li className="rmRatePlan__list--item" key={index}>
                                          <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                                          <div className="flexOne rmRatePlan__list--dtl">
                                            <p className="flexOne rmRatePlan__list--text">
                                              <p>Charge :
                                                {CancellationDes?.ChargeType === 1 && ('₹')} {CancellationDes?.Charge}{CancellationDes?.ChargeType === 2 && ('%')}
                                              </p>
                                              <p>From Date : {moment(CancellationDes?.FromDate).format('DD/MMM/YYYY, hh:mm, A')}</p>
                                              <p>To Date : {moment(CancellationDes?.ToDate).format('DD/MMM/YYYY, hh:mm, A')}</p>
                                            </p>
                                          </div>
                                        </li>
                                      ))
                                    }
                                  </ul>
                                </div>

                                <div className="rmRatePlan">
                                  <div className="makeFlex end flexWrap" />
                                  <h5 className="rmRatePlan__heading">Guest Details</h5>
                                  <ul className="rmRatePlan__list">
                                    {
                                      <li className="rmRatePlan__list--item" key={index}>
                                        <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                                        <div className="flexOne rmRatePlan__list--dtl">
                                          <p className="flexOne rmRatePlan__list--text">
                                            Rooms {roomNoOfQuantity} - Adults {adultsQuantity} - Children {childrenQuantity}
                                          </p>
                                        </div>
                                      </li>
                                    }
                                  </ul>
                                </div>
                              </div>
                              <div className="rmSelect__card--rowRight">
                                <div className="rmPayable">
                                  <div className="rmPayable__dtl">
                                    <div style={{ backgroundImage: '' }} className="rmPayable__dtl--left">
                                      <p className="grayText appendBottom5" id="priceDisplayMessage">Total price</p>
                                      <div className="appendTop5 cstmTooltipHover">
                                        <p className="font22 latoBlack">
                                          ₹ {roomData?.Price?.PublishedPrice}
                                        </p>
                                      </div>
                                      <div className="appendTop5">
                                        {/* <p className="font14 latoBold">
                                <span dir="ltr">
                                  + ₹1,440
                                </span>
                                taxes &amp; fees
                              </p> */}
                                      </div>
                                    </div>
                                  </div>
                                  <p className="font12 latoBold appendTop15" id="loginPersuasion">
                                    To Get this @ INR {roomData?.Price?.PublishedPrice}
                                  </p>
                                  <ButtonBook label={saveRooms[0] === roomData ? 'SELECTED' : 'SELECT ROOM'}
                                    activeBtn={saveRooms[0] === roomData ? 'activeBtn' : ''}
                                    onClick={() => selectMultipleRoomFun(roomData)}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }

                  </div>
                </div>
              </div>

            </div>
          </> : <SkeletonBookingList />
      }

      {/* <ButtonBook label={'Continue'}
        onClick={() => contiuneProcess()}
      /> */}
      <Button
        isLoading={buttonSpiner ? 'isLoading' : null}
        // isLoading
        loadingText='Loading'
        colorScheme='teal'
        variant='outline'
        spinnerPlacement='start'
        padding={'6px 20px'}
        borderRadius={'10px'}
        onClick={() => contiuneProcess()}
      >
        Continue
      </Button>
      <div className='my-4'></div>
    </>

  )
}

export default ServiceBookingDetails

const sliderImage = [
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },
  {
    id: 3,
    image: image?.service03
  },
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },


  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },
  {
    id: 3,
    image: image?.service03
  },
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },


  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },
  {
    id: 3,
    image: image?.service03
  },
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  },
  {
    id: 1,
    image: image?.service01
  },
  {
    id: 2,
    image: image?.service02
  }
]