import React from 'react';
import Watches from '../Watches/Watches';

const Home = () => {
    return (
        <div className="w-full">
            <Watches limit={6}></Watches>
        </div>
    );
};

export default Home;