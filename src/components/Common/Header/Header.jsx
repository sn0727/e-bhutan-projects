import React, { useEffect, useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import "./style.css"
import { ApiUrl } from '../../../utils/api';
import axios from 'axios';
import ProfileDropdown from '../../ProfileDropdown/ProfileDropdown';
import { FaIndianRupeeSign } from 'react-icons/fa6';

const Header = () => {
    const [profileData, seProfileData] = useState([])
    const token = sessionStorage.getItem("token")
    const decodeToken = jwtDecode(token);

    const getProfile = async () => {
        let config = {
            method: 'get',
            url: ApiUrl.userGetByToken,
            headers: {
                'token': token
            }
        };

        axios.request(config)
            .then((response) => {
                seProfileData(response?.data?.user)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function formatLargeNumber(value) {
        if (value >= 1000000000) {
            return (value / 1000000000).toFixed(2) + ' B';
        } else if (value >= 10000000) {
            return (value / 10000000).toFixed(2) + ' CR';
        } else if (value >= 100000) {
            return (value / 100000).toFixed(2) + ' L';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(2) + ' K';
        } else {
            return value.toString();
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    console.log('profileData', profileData?.amount)

    return (
        <>
            <header className='header-part'>
                <div className='container mx-auto px-4'>
                    <div className="header">
                        <div className="logo-img">
                            <Link to="/home"><img src="assets/image/logo/logo.png" alt="logo" /></Link>
                        </div>
                        <div className="serarch-and-profile-icon ">
                            {/* <div className="searchBar-icon">
                                <form action="/action_page.php">
                                    <input type="text" placeholder="Search.." name="search" />
                                    <Link className='serarch-ci' >
                                        <BiSearch className='serarch-icon' />
                                    </Link>
                                </form>
                            </div> */}

                            <ProfileDropdown token02={decodeToken} profileData={profileData} />

                            <div className='total-Price'>
                                <p className='button-sdfdfd'>
                                    <FaIndianRupeeSign />
                                    <span>{(profileData?.amount) ? formatLargeNumber((profileData?.amount)) : '....'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header


