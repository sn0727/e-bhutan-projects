import React, { useEffect, useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import "./style.css"
import { ApiUrl } from '../../../utils/api';
import axios from 'axios';
import ProfileDropdown from '../../ProfileDropdown/ProfileDropdown';

const Header = () => {
    const [profileData, seProfileData] = useState([])
    const token = localStorage.getItem("token")
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

    useEffect(() => {
        getProfile()
    }, [])

    return (
        <>
            <header className='header-part'>
                <div className='container mx-auto px-4'>
                    <div className="header">
                        <div className="logo-img">
                            <Link to="/home"><img src="assets/image/logo/logo.png" alt="logo" /></Link>
                        </div>
                        <div className="serarch-and-profile-icon ">
                            <div className="searchBar-icon">
                                <form action="/action_page.php">
                                    <input type="text" placeholder="Search.." name="search" />
                                    <Link className='serarch-ci' >
                                        <BiSearch className='serarch-icon' />
                                    </Link>
                                </form>
                            </div>

                            <ProfileDropdown token02={decodeToken} profileData={profileData} />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header


