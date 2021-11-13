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
        <div className="w-full h-screen flex flex-col justify-start lg:items-start md:items-start items-center " style={{ backgroundImage: `url(${herobg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="lg:w-2/4 md:w-3/5 w-full lg:pl-12 md:pl-10 p-4 md:mt-24 mt-8">
                <p style={{ fontFamily: "'Bebas Neue', cursive" }} className="lg:text-5xl md:text-3xl text-2xl font-extrabold text-white  my-8">The New Reality Is Closer Than You Think</p>
                <p style={{ fontFamily: "'Bebas Neue', cursive" }} className="lg:text-xl md:text-lg text-md text-gray-400  my-8">These are the best in class effective watches from luxury brands.</p>
                {role !== "ADMIN" && <button className="w-2/5 bg-gradient-to-t from-blue-600 to-blue-500 shadow-md rounded-lg hover:text-white text-white uppercase font-bold py-4" onClick={handleExploreClick}>Explore</button>}
            </div>
        </div>
    );
};

export default Hero;