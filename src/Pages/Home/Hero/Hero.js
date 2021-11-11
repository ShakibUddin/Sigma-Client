import React from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import heroImage from '../../../Images/watch-1.png';

const Hero = () => {
    const history = useHistory();
    const { role } = useAuth();
    const handleExploreClick = () => {
        history.push('/products');
    }
    return (
        <div className="w-full h-screen flex bg-black items-center lg:mb-36">
            <div className="lg:w-5/12 md:w-5/12  w-full flex flex-col justify-center  lg:items-start md:items-start items-center lg:ml-8 md:ml-8">
                <p className="lg:text-5xl md:text-3xl text-2xl font-extrabold text-white lg:text-left md:text-left text-center uppercase my-8">Custom Products For Any Occasion</p>
                {role === "USER" && <button className="w-1/3 bg-black border-2 border-green-500 text-green-500  py-4" onClick={handleExploreClick}>Explore</button>}
            </div>
            <div className="lg:w-7/12 md:w-7/12 h-full lg:flex lg:items-center md:flex md:items-center hidden lg:-mb-36">
                <img className="w-full" src={heroImage} alt="" />
            </div>
        </div>
    );
};

export default Hero;