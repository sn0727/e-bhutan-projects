import React, { useState } from 'react'
import { MdLocationPin } from "react-icons/md";
import { image } from '../../../constent/image'
import { ButtonBook } from '../../../components/Common/Button/button';

const ServiceBookingDetails = ({ setIdComponent }) => {
  const [imgPath, setImgPath] = useState('')
  const [isActiveImg, setIsActiveImg] = useState(0)

  const handlerImage = (url) => {
    setImgPath(url)
  }
  return (
    <>
      <div className='main-bx-dt-sr my-5'>
        <div className='mian-in-ht-sr-bk'>
          <div className='dt-image'>
            <img src={imgPath ? imgPath : image?.service01} alt="details one" className='service details one' />
          </div>
          <h2 className='Preview-ht-dt mt-3 mb-2'>Preview</h2>
          <div className='image-thum-ht-st'>
            {
              sliderImage.map((slide, index) => (
                <div className={`img01-ht ${isActiveImg === index ? 'activeBorder' : ''}`} key={index} onClick={() => handlerImage(slide?.image, setIsActiveImg(index))}>
                  <img src={slide?.image} alt="service 01" className='thems-img' />
                </div>
              ))
            }
          </div>
        </div>
        <div className='right-content-ht-dt'>
          <div className='review-sr-ht' style={{ top: 0 }}>
            <div>
              <h5>Good</h5>
              <p>476 review</p>
            </div>
            <div>
              7.0
            </div>
          </div>
          <div className="content-bx-ht-sr">
            <p style={{ fontSize: '22px', maxWidth: '350px' }}>Collection O Agniv Residency Near Saket Metro</p>
            <p style={{ marginTop: '10px', fontSize: '16px' }}><MdLocationPin /> New Delhi, India <span style={{ color: '#000' }}>1.2 km from centre</span></p>
            <p className='sdfgdsd-sdfdsfdls' style={{
              marginTop: '10px',
              marginBottom: '10px',
              color: '#000',
              fontSize: '14px'
            }}>
              OYO 39689 Flagship SILVER KEY 111 , K D plaza is a popular choice amongst travelers in New Delhi and NCR, whether exploring or just passing through. The property features a wide range of facilities to make your stay a pleasant experience. Service-minded staff will welcome and guide you at OYO 39689 Flagship SILVER KEY 111 , K D plaza. Designed for comfort, selected guestrooms offer linens, mirror, towels, internet access – wireless, fan to ensure a restful night. The property offers various recreational opportunities. A welcoming atmosphere and excellent service are what you can expect during your stay at OYO 39689 Flagship SILVER KEY 111 , K D plaza.&nbsp;<br />
              <b style={{ marginTop: '10px', display: 'inline-block' }}>Disclaimer notification: Amenities are subject to availability and may be chargeable as per the hotel policy.</b>&nbsp; <br />
            </p>
            <p>Per Night | ₹ 7,999 | +₹ 1,440 taxes & fees</p>
          </div>
        </div>
      </div>
      <div class="rmSelectRooms">
        <div class="rmHeader">
          <div className="rmHeader__item"><span className="font14 latoBlack capText">Room Type</span></div>
          <div className="rmHeader__item"><span className="font14 latoBlack capText">Options</span></div>
          <div className="rmHeader__item"><span className="font14 latoBlack capText">Price</span></div>
        </div>
        <div className="rmSelectCont appendBottom20">
          <div className="rmSelect__card">
            <div className="rmSelect__card--wrap">
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
                    <h2 className="rmType__roomName" data-testid="rmType__roomName">Luxe Twin Room</h2>
                    <ul className="rmTypeList appendTop10 vertical">
                      <li className="rmTypeList__item">
                        <span className="rmTypeList__item--icon appendRight10"><img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/view.png" alt="210 sq.ft" /></span>
                        <span className="makeFlex column column-text"><span className="rmTypeList__item--text">210 sq.ft</span></span>
                      </li>
                      <li className="rmTypeList__item">
                        <span className="rmTypeList__item--icon appendRight10"><img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/view.png" alt="City View" /></span>
                        <span className="makeFlex column column-text"><span className="rmTypeList__item--text">City View</span></span>
                      </li>
                      <li className="rmTypeList__item">
                        <span className="rmTypeList__item--icon appendRight10"><img src="https://promos.makemytrip.com/Hotels_product/Hotel_SR/Android/drawable-hdpi/bed.png" alt="1 Queen bed or 2 Twin Bed(s)" /></span>
                        <span className="makeFlex column column-text"><span className="rmTypeList__item--text">1 Queen bed or 2 Twin Bed(s)</span></span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="rmSelect__card--right">
                  <div className="rmSelect__card--row">
                    <div className="rmSelect__card--rowLeft">
                      <div className="rmRatePlan">
                        <div className="makeFlex end flexWrap"><span className="rmRatePlan__rec appendRight3">RECOMMENDED</span></div>
                        <h5 className="rmRatePlan__heading">Room Only</h5>
                        <ul className="rmRatePlan__list">
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                            <div className="flexOne rmRatePlan__list--dtl">
                              <p className="flexOne rmRatePlan__list--text"><span>Non-Refundable</span></p>
                            </div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">No meals included</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">20% discount on Food and Soft Beverages</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Free Welcome Drink on Arrival</p></div>
                          </li>
                        </ul>
                        <p className="rmRatePlan__link appendTop15"><a className="latoBlack font12 capText" id="detpg_options_read_more_btn" data-testid="990001367100:MSE:1120:MSE:INGO-readMore">More Details</a></p>
                      </div>
                    </div>
                    <div className="rmSelect__card--rowRight">
                      <div className="rmPayable">
                        <div className="rmPayable__dtl">
                          <div style={{ backgroundImage: '' }} className="rmPayable__dtl--left">
                            <p className="grayText appendBottom5" id="priceDisplayMessage">Per Night</p>
                            <div className="appendTop5 cstmTooltipHover">
                              <p className="font22 latoBlack">
                                ₹{/* */}
                                {/* */}7,999
                              </p>
                            </div>
                            <div className="appendTop5">
                              <p className="font14 latoBold">
                                <span dir="ltr">
                                  +{/* */}₹{/* */}
                                  {/* */}1,440
                                </span>
                                {/* */}taxes &amp; fees
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="font12 latoBold appendTop15" id="loginPersuasion">
                          To Get this @ INR7,920 or less <a className="latoBlack capText"> {/* */}Login Now</a>
                        </p>
                        <ButtonBook label={'SELECT ROOM'} onClick={() => setIdComponent(3)} />
                      </div>
                    </div>
                  </div>
                  <div className="rmSelect__card--row">
                    <div className="rmSelect__card--rowLeft">
                      <div className="rmRatePlan">
                        <div className="makeFlex end flexWrap" />
                        <h5 className="rmRatePlan__heading">Room with Breakfast</h5>
                        <ul className="rmRatePlan__list">
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                            <div className="flexOne rmRatePlan__list--dtl">
                              <p className="flexOne rmRatePlan__list--text"><span>Non-Refundable</span></p>
                            </div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">20% discount on Food and Soft Beverages</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Free Welcome Drink on Arrival</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Free Breakfast</p></div>
                          </li>
                        </ul>
                        <p className="rmRatePlan__link appendTop15"><a className="latoBlack font12 capText" id="detpg_options_read_more_btn" data-testid="990001367101:MSE:1120:MSE:INGO-readMore">More Details</a></p>
                      </div>
                    </div>
                    <div className="rmSelect__card--rowRight">
                      <div className="rmPayable">
                        <div className="rmPayable__dtl">
                          <div style={{ backgroundImage: '' }} className="rmPayable__dtl--left">
                            <p className="grayText appendBottom5" id="priceDisplayMessage">Per Night</p>
                            <div className="appendTop5 cstmTooltipHover">
                              <p className="font22 latoBlack">
                                ₹{/* */}
                                {/* */}7,999
                              </p>
                            </div>
                            <div className="appendTop5">
                              <p className="font14 latoBold">
                                <span dir="ltr">
                                  +{/* */}₹{/* */}
                                  {/* */}1,440
                                </span>
                                {/* */}taxes &amp; fees
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="font12 latoBold appendTop15" id="loginPersuasion">
                          To Get this @ INR7,920 or less <a className="latoBlack capText"> {/* */}Login Now</a>
                        </p>
                        <ButtonBook label={'SELECT ROOM'} onClick={() => setIdComponent(3)} />
                      </div>
                    </div>
                  </div>
                  <div className="rmSelect__card--row">
                    <div className="rmSelect__card--rowLeft">
                      <div className="rmRatePlan">
                        <div className="makeFlex end flexWrap" />
                        <h5 className="rmRatePlan__heading">Room with Breakfast + Lunch/Dinner</h5>
                        <ul className="rmRatePlan__list">
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularRedCross" /></span>
                            <div className="flexOne rmRatePlan__list--dtl">
                              <p className="flexOne rmRatePlan__list--text"><span>Non-Refundable</span></p>
                            </div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">20% discount on Food and Soft Beverages</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">20 % Discount On F&amp;B Services</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Free Welcome Drink on Arrival</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Free Lunch Or Dinner</p></div>
                          </li>
                          <li className="rmRatePlan__list--item">
                            <span className="rmRatePlan__list--itemIcon"><span className="dtlSprite icCircularTick" /></span>
                            <div className="flexOne rmRatePlan__list--dtl"><p className="rmRatePlan__list--text">Free Breakfast</p></div>
                          </li>
                        </ul>
                        <p className="rmRatePlan__link appendTop15"><a className="latoBlack font12 capText" id="detpg_options_read_more_btn" data-testid="990001876778:MSE:1120:MSE:INGO-readMore">More Details</a></p>
                      </div>
                    </div>
                    <div className="rmSelect__card--rowRight">
                      <div className="rmPayable">
                        <div className="rmPayable__dtl">
                          <div style={{ backgroundImage: '' }} className="rmPayable__dtl--left">
                            <p className="grayText appendBottom5" id="priceDisplayMessage">Per Night</p>
                            <div className="appendTop5 cstmTooltipHover">
                              <p className="font22 latoBlack">
                                ₹{/* */}
                                {/* */}7,999
                              </p>
                            </div>
                            <div className="appendTop5">
                              <p className="font14 latoBold">
                                <span dir="ltr">
                                  +{/* */}₹{/* */}
                                  {/* */}1,440
                                </span>
                                {/* */}taxes &amp; fees
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="font12 latoBold appendTop15" id="loginPersuasion">
                          To Get this @ INR7,920 or less <a className="latoBlack capText"> {/* */}Login Now</a>
                        </p>
                        <ButtonBook label={'SELECT ROOM'} onClick={() => setIdComponent(3)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

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
  }
]