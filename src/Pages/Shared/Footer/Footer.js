import { faLocationArrow, faMailBulk, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import logo from '../../../Images/logo.jpg';
import payment from '../../../Images/payment.png';

const Footer = () => {
    return (
        <div className="bg-black w-full flex items-center justify-center flex-col">
            <div className="w-full flex flex-wrap justify-evenly items-center">
                <div className="lg:w-2/4 w-full p-5" style={{ minWidth: "300px" }}>

                    <p className="text-white  py-3">
                        <FontAwesomeIcon className="mr-2" icon={faLocationArrow} /> Level-3, 31, Road-5,Block-C, Sydney, Australia
                    </p>
                    <p className="text-white  py-3">
                        <FontAwesomeIcon className="mr-2" icon={faMailBulk} /> Official: official@sigma.com
                    </p>
                    <p className="text-white  py-3">
                        <FontAwesomeIcon className="mr-2" icon={faPhone} /> Helpline : 66-12910 (Available : 09:00am to 7:00pm)
                    </p>
                    <div className="w-full flex justify-around flex-wrap">
                        <SocialIcon url="https://www.facebook.com/profile.php?id=100011011868115" />
                        <SocialIcon url="https://shakibuddinbhuiyan.medium.com/" />
                        <SocialIcon url="https://github.com/ShakibUddin?fbclid=IwAR2RG4-MqYLetKV2oQdQkVDFrnMxVLA08cT14UaNHMTHFBhBC92H6LEQWoQ" />
                        <SocialIcon url="linkedin.com/in/md-shakib-uddin" />
                    </div>
                </div>
                <div className="lg:w-2/4 w-full p-3" style={{ minWidth: "300px" }}>
                    <div className="lg:w-3/5 md:w-3/4 w-full mx-auto">
                        <p className="text-xl font-bold text-white my-3">Signup for news and offers from us</p>
                        <input className="p-2 my-3 w-10/12" type="email" placeholder="Enter email" />
                        <button className="p-2 my-3 w-2/4 bg-green-500 text-white mx-auto">Subscribe</button>
                    </div>
                    <img className="lg:w-3/5 md:w-3/4 w-full mx-auto" src={payment} alt="" />
                </div>
            </div>
            <div className="flex my-5">
                <div className="w-14">
                    <img className="w-full" src={logo} alt="" />
                </div>
                <p className="text-white text-2xl font-bold">Sigma</p>
            </div>
            <p className="text-white text-xl">Copyright © 2021</p>
        </div>
    );
};

export default Footer;