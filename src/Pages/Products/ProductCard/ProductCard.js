import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = (props) => {
    const { _id, name, description, price, image } = props.data;
    const showButton = props.showButton;
    return (
        <div className="w-full shadow-md p-4 flex flex-col justify-between bg-white">
            <div className="w-4/12 h-52 mx-auto">
                <img className="w-full h-full" src={image} alt="" />
            </div>
            <div className="w-full">
                <p className="text-xl text-black font-semibold my-2">{name}</p>
                <p className="text-sm text-gray-400 my-2">{description}</p>
            </div>
            <div className="w-full flex flex-col items-center">
                <p className="text-2xl text-green-500 font-bold my-2">${price}</p>
                {showButton && <Link className="w-3/5 py-2 px-4 bg-green-500" to={`/purchase/${_id}`}>
                    <button className=" w-full  text-white">Buy</button>
                </Link>}
            </div>
        </div>
    );
};

export default ProductCard;