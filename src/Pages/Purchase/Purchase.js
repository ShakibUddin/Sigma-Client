import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Loader from 'react-loader-spinner';
import { useHistory } from 'react-router';
import { useParams } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import useWindowDimensions from '../../Hooks/useWindowDimensions';

const SignUp = () => {
    const { productId } = useParams();
    const { height, width } = useWindowDimensions();
    const [selectedProduct, setSelectedProduct] = useState();
    const {
        savePurchase, products
    } = useData();
    const history = useHistory();
    const { user, token } = useAuth();

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        address: Yup.string()
            .required('Address is required')
            .min(3, 'Address must be at least 3 characters')
            .max(30, 'Address must be maximum 30 characters'),
        mobile: Yup.string()
            .required('Mobile number is required')
            .min(6, 'Mobile number must be minimum 6 characters')
            .max(15, 'Mobile number must be maximum 15 characters')
    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        savePurchase({ user: user.name, email: data.email, mobile: data.mobile, address: data.address, productId: selectedProduct._id, product: selectedProduct.name, price: selectedProduct.price, date: new Date().toDateString(), status: "Pending" }, token, history);
    };

    useEffect(() => {
        //finding user selected product from products
        setSelectedProduct(products.find(product => product._id.toString() === productId.toString()));
    }, [productId, products]);

    if (!selectedProduct) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="ThreeDots"
            color="#3386FF"
            height={100}
            width={100}
            timeout={4000}
        />

    </div>);
    return (
        <div className="w-full flex flex-wrap">
            {/* image div */}
            <div style={{ minWidth: "300px", minHeight: height }} className="lg:w-2/4 md:w-2/4 w-full flex flex-col justify-center items-center">
                <div className="w-4/5 p-4 flex flex-col justify-between bg-white">
                    <div className="lg:w-6/12 md:w-9/12 w-10/12 h-96 mx-auto">
                        <img className="w-full h-full transition duration-700 ease-in-out transform hover:scale-125" src={selectedProduct.image} alt="" />
                    </div>
                </div>
            </div>
            {/* details & form div */}
            <div className="lg:w-2/4 md:w-2/4 w-full p-3 flex flex-col items-center justify-start pt-8 bg-gradient-to-r from-blue-600 to-blue-500">
                <div className="lg:w-3/4 md:w-3/4 w-full">
                    <p className="lg:text-3xl md:text-3xl text2xl font-bold text-white my-2">{selectedProduct.name}</p>
                    <p className="text-sm text-white my-2">{selectedProduct.description}</p>
                    <p className="lg:text-3xl md:text-3xl text2xl text-white my-2">Total: ${selectedProduct.price}</p>
                </div>
                <form style={{ minWidth: "300px" }} className="lg:w-3/4 md:w-3/4 w-full mx-auto flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                    <input className="w-full p-3 my-2 border-2 rounded-md" defaultValue={user.name} readOnly={true} type="text" placeholder="Enter Name" {...register("name")} />
                    {errors.name && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.name?.message}</p>}

                    <input className="w-full p-3 my-2 border-2 rounded-md" type="text" defaultValue={user.email} readOnly={true} placeholder="Enter Email" {...register("email")} />
                    {errors.email && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.email?.message}</p>}

                    <input className="w-full p-3 my-2 border-2 rounded-md" type="number" placeholder="Enter Mobile Number" {...register("mobile")} />
                    {errors.mobile && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.mobile?.message}</p>}

                    <input className="w-full p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Address" {...register("address")} />
                    {errors.address && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.address?.message}</p>}

                    <input className="lg:w-2/4 w-3/4 mx-auto px-4 p-2 bg-white rounded-lg shadow-lg text-blue-600 cursor-pointer mt-4" type="submit" value="ORDER" />
                </form>
            </div>

        </div>
    );
};

export default SignUp;