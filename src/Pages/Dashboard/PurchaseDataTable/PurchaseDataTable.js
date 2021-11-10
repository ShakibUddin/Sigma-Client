import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useData from '../../../Hooks/useData';

const PurchaseDataTable = () => {
    const { purchases, fetchPurchases, approvePurchase, deletePurchase } = useData();
    const [myPurchases, setMyPurchases] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        fetchPurchases();
    }, [fetchPurchases]);

    useEffect(() => {
        setMyPurchases(purchases.filter(purchase => purchase.email.toString() === user?.email.toString()));
    }, [purchases, user?.email]);

    const handleApproveClick = (purchase) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Approve ${purchase.user}'s ${purchase.watch} order?`,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Approve',
            confirmButtonColor: "#3386FF",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                return approvePurchase({ ...purchase });
            },
            allowOutsideClick: () => !Swal.isLoading()
        });
    }

    function openModal(purchase) {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${purchase.user}'s ${purchase.watch} order?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePurchase(purchase._id);
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
                myPurchases.map(purchase => <div key={purchase._id} className="w-full flex flex-col justify-between p-2 shadow-md">
                    <div>
                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Watch: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.watch}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Price: <span className="text-gray-600 text-xs text-left py-3 ">${purchase.price}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">User: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.user}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Email: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.email}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Mobile: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.mobile}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Address: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.address}</span></p>

                        <p className="text-left text-blue-500 font-bold text-sm  py-3 break-words">Date: <span className="text-gray-600 text-xs text-left py-3 ">{purchase.date}</span></p>
                    </div>
                    <div className="flex justify-center">
                        {user.status === "ADMIN" && <button className="w-2/4 mx-1 p-2 bg-blue-500 text-white" onClick={() => {
                            handleApproveClick(purchase);
                        }}
                        >Approve</button>}
                        <button className="w-2/4 mx-1 p-2 bg-red-500 text-white" onClick={() => {
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

export default PurchaseDataTable;