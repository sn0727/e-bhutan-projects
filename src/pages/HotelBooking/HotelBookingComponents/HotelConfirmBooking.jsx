import React, { useEffect, useState } from 'react'
import { ButtonBook } from '../../../components/Common/Button/button'
import { adultsQuantity1, childrenQuantity1, roomQuantity, saveHotelBookResponseData, valueSaveFalse, selectRoomArr } from '../atom/atom'
import { useRecoilValue } from 'recoil'
import { ChakraProvider, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import moment from 'moment'
import { SkeletonBookingHotelBlockDetails } from '../../../components/SkeletonTemplate/SkeletonBookingForm'

const HotelConfirmBooking = ({ setIdComponent }) => {
    const [isLoading, setIsLoading] = useState(true)
    const isLoadingBlock = useRecoilValue(valueSaveFalse)
    const hotelBookDataResponse = useRecoilValue(saveHotelBookResponseData)
    const getSelectRoomArr = useRecoilValue(selectRoomArr)
    const adultsQuantity = useRecoilValue(adultsQuantity1)
    const childrenQuantity = useRecoilValue(childrenQuantity1)
    const roomNoOfQuantity = useRecoilValue(roomQuantity)

    return (
        <div>
            {/* =========== availbal room details =============== */}
            {
                hotelBookDataResponse ?
                    <>
                        <div class="rmSelectRooms">
                            <h2 className='mb-3 mt-5'>Your room is booked | Numer of room {roomNoOfQuantity}</h2>
                            <div class="rmHeader">
                                <div className="rmHeader__item"><span className="font14 latoBlack capText">Room Type</span></div>
                                <div className="rmHeader__item"><span className="font14 latoBlack capText">Options</span></div>
                                <div className="rmHeader__item"><span className="font14 latoBlack capText">Price</span></div>
                            </div>
                            <div className="rmSelectCont appendBottom20">
                                <div className="rmSelect__card">
                                    <div className="rmSelect__card--wrap">
                                        {
                                            hotelBookDataResponse?.BlockRoomResult?.HotelRoomsDetails?.map((roomData, index) => (
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
                                                            <h2 className="rmType__roomName" data-testid="rmType__roomName">{roomData?.RoomDescription}</h2>
                                                            <ul className="rmTypeList appendTop10 vertical">
                                                                <li className="rmTypeList__item">
                                                                    <span className="makeFlex column column-text"><span className="rmTypeList__item--text"><b>Last Cancellation Date</b> : {moment(roomData?.LastCancellationDate).format('DD/MMM/YYYY, hh:mm, A')}</span></span>
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
                                                                    <div className="makeFlex end flexWrap"><span className="rmRatePlan__rec appendRight3">{hotelBookDataResponse?.BlockRoomResult?.ResponseStatus === 1 && ('Booked')}</span></div>
                                                                    <h5 className="rmRatePlan__heading">Most popular facilities</h5>
                                                                    <ul className="rmRatePlan__list">
                                                                        <li className="rmRatePlan__list--item">
                                                                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                                                                            <div className="flexOne rmRatePlan__list--dtl">
                                                                                <p className="flexOne rmRatePlan__list--text"><span>Amenities : {roomData?.Amenities} </span></p>
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
                                                                    <h5 className="rmRatePlan__heading">Cancellation Charge</h5>
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
                                                                            <p className="grayText appendBottom5" id="priceDisplayMessage">Price</p>
                                                                            <div className="appendTop5 cstmTooltipHover">
                                                                                <p className="font22 latoBlack">
                                                                                    ₹ {roomData?.Price?.PublishedPrice}
                                                                                </p>
                                                                            </div>
                                                                            <div className="appendTop5">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <p className="font12 latoBold appendTop15" id="loginPersuasion">
                                                                        To Get this @ INR {roomData?.Price?.PublishedPrice}
                                                                    </p>
                                                                    <p className="grayText appendBottom5" id="priceDisplayMessage">
                                                                        Day Rates : {
                                                                            roomData?.DayRates[0].Amount
                                                                        }
                                                                    </p>
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
                        <ButtonBook label={'Continue'} onClick={() => setIdComponent(5)} />

                        <ChakraProvider>
                            <div className='tab-bar-dfd' style={{ margin: '50px 0' }}>
                                <Tabs>
                                    <TabList>
                                        <Tab>Hotel Policy</Tab>
                                    </TabList>

                                    <TabPanels>
                                        <TabPanel>
                                            <h2>Hotel Policy</h2>
                                            <div dangerouslySetInnerHTML={{ __html: hotelBookDataResponse?.BlockRoomResult?.HotelPolicyDetail }} />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            </div>
                        </ChakraProvider>
                    </>
                    : <SkeletonBookingHotelBlockDetails />
            }

        </div>
    )
}

export default HotelConfirmBooking