import React from 'react';
import Watches from '../Watches/Watches';
import Hero from './Hero/Hero';
import Reviews from './Review/Reviews';

const Home = () => {
    return (
        <div className="w-full">
            <Hero></Hero>
            <p className="lg:text-3xl text-3xl font-extrabold text-blue-600 text-center my-2">Trending Watches</p>
            <Watches limit={6}></Watches>
            <p className="lg:text-3xl text-3xl font-extrabold text-blue-600 text-center my-2 mt-16">See What Our Customers Say</p>
            <Reviews></Reviews>
        </div>
    );
};

export default Home;