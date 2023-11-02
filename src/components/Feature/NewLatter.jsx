import React from 'react';
import AppStore from "./../../assets/newlatter/app-store.png";
import PlayStore from "./../../assets/newlatter/play-store.png";

import fb from "../../assets/social_media/facebook.svg";
import twitter from "./../../assets/social_media/twitter.svg";
import instagram from "./../../assets/social_media/instagram.svg";
import linkedin from "./../../assets/social_media/linkedin.svg";
import { Link } from 'react-router-dom';

const NewLatter = () => {
    return (
        <React.Fragment>
            <div className="newlater-wrap">
                <div className="container">
                    <div className="perentsNode">
                        <div className="download-ebbutan">
                            <div>
                                <h3>Download eBhuktan App
                                    to Pay From Anywhere</h3>
                            </div>
                            <div>
                                <img src={AppStore} alt="app store" />
                            </div>
                            <div>
                                <img src={PlayStore} alt="play store" />
                            </div>
                        </div>
                        <div className="social-media">
                            <div>
                                <Link to={'/'}><img src={fb} alt="facebook" /></Link>
                            </div>
                            <div>
                                <Link to={'/'}><img src={twitter} alt="twitter" /></Link>
                            </div>
                            <div>
                                <Link to={'/'}><img src={instagram} alt="instagram" /></Link>
                            </div>
                            <div>
                                <Link to={'/'}><img src={linkedin} alt="linkedin" /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NewLatter