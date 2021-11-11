import React from 'react';
import Products from '../Products/Products';
import Contact from './Contact/Contact';
import Hero from './Hero/Hero';
import Reviews from './Review/Reviews';
import Services from './Services/Services';

const Home = () => {
    return (
        <div className="w-full">
            <Hero></Hero>
            <p className="lg:text-3xl text-3xl font-extrabold text-blue-600 text-center my-2">Trending Products</p>
            <Products limit={6}></Products>
            <p className="lg:text-3xl text-3xl font-extrabold text-blue-600 text-center my-2 mt-16">See What Our Customers Say</p>
            <Reviews></Reviews>
            <Services></Services>
            <Contact></Contact>
        </div>
    );
};

export default Home;