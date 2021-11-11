import React from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../../Hooks/useAuth';
import herobg from '../../../Images/mainbg.jpg';

const Hero = () => {
    const history = useHistory();
    const { role } = useAuth();
    const handleExploreClick = () => {
        history.push('/products');
    }
    return (
        <div className="w-full h-screen flex flex-col justify-start lg:items-start md:items-start items-center bg-fixed" style={{ backgroundImage: `url(${herobg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="lg:w-2/4 md:w-3/5 w-full lg:pl-12 md:pl-10 p-4 md:mt-24 mt-8">
                <p className="lg:text-5xl md:text-3xl text-2xl font-extrabold text-white uppercase my-8">Custom Products For Any Occasion</p>
                {role !== "ADMIN" && <button className="w-2/5 bg-transparent border-blue-600 border-2 hover:bg-blue-600 hover:text-white text-white uppercase font-bold py-4" onClick={handleExploreClick}>Explore</button>}
            </div>
        </div>
    );
};

export default Hero;