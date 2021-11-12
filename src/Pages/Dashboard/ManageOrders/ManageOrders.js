import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useData from '../../../Hooks/useData';

const ManageOrders = () => {
    const { purchases, fetchPurchases, approvePurchase, deletePurchase } = useData();
    const { token } = useAuth();

    useEffect(() => {
        fetchPurchases(token);
    }, [fetchPurchases, token])

    const handleApproveClick = (purchase) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Approve ${purchase.user}'s ${purchase.product} order?`,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Approve',
            confirmButtonColor: "#3386FF",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return approvePurchase(purchase._id, token);
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }

    function openModal(purchase) {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${purchase.user}'s ${purchase.product} order?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePurchase(purchase._id, token);
            }
        })
    }

    if (purchases?.length === 0) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="Bars"
            color="#3386FF"
            height={100}
            width={100}
            timeout={4000}
        />

    </div>);
    return (
        <div className="bg-white mb-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 p-2">
            {
                purchases.map(purchase => <div key={purchase._id} className="w-full flex flex-col justify-between p-2 shadow-md">
                    <div>
                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Product: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.product}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Price: <span className="text-gray-600 text-xs text-left py-3 ">${purchase.price}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Status: <span className={`text-white rounded-md p-1 ${purchase.status === "Pending" ? "bg-yellow-500" : "bg-green-500"} text-xs text-left py-3 `}>{purchase.status}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">User: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.user}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Email: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.email}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Mobile: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.mobile}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Address: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.address}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Date: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.date}</span></p>
                    </div>
                    <div className="flex justify-center">
                        <button className="w-2/4 mx-1 p-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg shadow-md text-white" onClick={() => {
                            handleApproveClick(purchase);
                        }}
                        >Approve</button>
                        <button className="w-2/4 mx-1 p-2 bg-gradient-to-t from-red-600 to-red-500 rounded-lg shadow-md text-white" onClick={() => {
                            openModal(purchase);
                        }}>
                            Delete
                        </button>
                    </div>
                </div>)
            }
        </div>
    );
};

export default ManageOrders;