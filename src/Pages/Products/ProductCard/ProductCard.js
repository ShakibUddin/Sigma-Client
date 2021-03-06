import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useData from '../../../Hooks/useData';

const ProductCard = (props) => {
    const { _id, name, description, price, image } = props.data;
    const { deleteProduct } = useData();
    const { token } = useAuth();

    const showDeleteButton = props.showDeleteButton;
    const showPurchaseButton = props.showPurchaseButton;

    function openModal() {
        Swal.fire({
            title: 'Warning',
            text: `Delete is disabled for security purpose.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                //deleteProduct(_id, token);
            }
        })
    }

    return (
        <div className="w-full shadow-md p-4 flex flex-col justify-between bg-white">
            <div className="w-4/12 h-52 mx-auto">
                <img className="w-full h-full " src={image} alt="" />
            </div>
            <div className="w-full flex flex-col justify-between">
                <div className="w-full">
                    <p className="text-xl text-black font-semibold my-2">{name}</p>
                    <p className="text-sm text-gray-400 my-2">{description}</p>
                </div>
                <div className="w-full flex  items-center">
                    {showPurchaseButton && <p style={{ fontFamily: "'Bebas Neue', cursive" }} className="text-6xl pr-16 text-green-500 font-bold my-2">${price}</p>}

                    {showPurchaseButton && <Link className="w-3/5 py-2 px-4 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg shadow-lg" to={`/purchase/${_id}`}>
                        <button className=" w-full  text-white">BUY</button>
                    </Link>}
                    {showDeleteButton && <button className="w-3/5 mx-auto py-2 px-4 bg-gradient-to-t from-red-600 to-red-500 rounded-lg shadow-lg text-white" onClick={() => openModal()}>DELETE</button>}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;