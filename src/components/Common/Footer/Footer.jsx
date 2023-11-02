import React from 'react';
import { Link } from 'react-router-dom';
import NewLatter from '../../Feature/NewLatter';
import { MdLocationPin } from 'react-icons/md';
import { IoMdCall } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai';

const Footer = () => {
    return (
        <React.Fragment>
            <NewLatter />
            <footer className='footer-perents pt-30'>
                <div className="container mx-auto px-4">
                    <div className="footer-row">
                        <div className="footer-col-3">
                            <h3>Banking Services </h3>
                            <ul>
                                <li className='pt-30'><Link to="">Financial Services</Link></li>
                                <li className='pt-30'><Link to="">Tour & Travel</Link></li>
                                <li className='pt-30'><Link to="">Insurance Services</Link></li>
                                <li className='pt-30'><Link to="">Insurance Services</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col-3">
                            <h3>About Us</h3>
                            <ul>
                                <li className='pt-30'><p>we went on to become India’s leading Payments App. Today, more than 20 Million merchants & businesses are powered by Paytm to Accept Payments digitally.</p></li>
                            </ul>
                        </div>
                        <div className="footer-col-3">
                            <h3>CSR</h3>
                            <ul>
                                <li className='pt-30'><p>We believes in combining the power of technology to build an inclusive culture and lay a greater emphasis.</p></li>
                            </ul>
                        </div>
                        <div className="footer-col-3">
                            <h3>Blog</h3>
                            <ul>
                                <li className='pt-30'><Link to=""><p className='text-left'>How We Are Driving Leadership....</p></Link></li>
                                <li className='pt-30'><Link to=""><p className='text-left'>Our lending business achieves strong growth</p></Link></li>
                            </ul>
                        </div>
                        {/* <div className="footer-col-3">
                            <h3>Contact</h3>
                            <ul>
                                <li className='pt-30'><Link to=""><p className='text-left'>Customer Feedback</p></Link></li>
                                <li className='pt-30'><Link to=""><p className='text-left'>Privacy & Security</p></Link></li>
                            </ul>
                        </div> */}
                        <div className="footer-col-3">
                            <h3>Contact</h3>
                            <ul className='footer-list-information'>
                                <li className='pt-30'>
                                    <MdLocationPin className='text-white' />
                                    <address className='text-white address-text'> Nakshtra Ventures Pvt Ltd 2ND, 57, JME COLONY, SHAKTINAGAR, SONBHADRA, UTTAR PRADESH, INDIA 231222</address>
                                </li>
                                <li>
                                    <IoMdCall className='text-white' />
                                    <Link to="tel:91-7303144145">91-7303144145</Link>
                                </li>
                                <li>
                                    <AiOutlineMail className='text-white' />
                                    <Link to="mailto:ebhuktan@gmail.com">ebhuktan@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='footer-buttom'>
                        <div className='Copyright'>
                            Copyright © 2023 All rights reserved.
                        </div>
                        <div className='term-and-condition'>
                            <ul>
                                <li><Link to="https://ebhuktan.com/refundpolicy">Refund Policy</Link></li>
                                <li><Link to="https://ebhuktan.com/termsandcondition">terms and condition</Link></li>
                                <li><Link to="https://ebhuktan.com/privacyandpolicy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default Footer
