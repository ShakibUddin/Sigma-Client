import React from 'react';

const WatchCard = (props) => {
    const { _id, name, description, price, image } = props.data;
    return (
        <div className="w-full shadow-md p-4 flex flex-col justify-between">
            <div className="lg:w-4/12 md:w-5/12 w-6/12 h-52 mx-auto">
                <img className="w-full h-full" src={image} alt="" />
            </div>
            <div className="w-full">
                <p className="text-xl text-black font-semibold my-2">{name}</p>
                <p className="text-sm text-gray-400 my-2">{description}</p>
            </div>
            <div className="w-full">
                <p className="text-2xl text-yellow-500 font-bold my-2">${price}</p>
                <button className="w-1/3 py-2 bg-green-500 text-white text-center mx-auto">Buy</button>
            </div>
        </div>
    );
};

export default WatchCard;