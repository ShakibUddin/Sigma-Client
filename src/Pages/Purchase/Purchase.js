import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Loader from 'react-loader-spinner';
import { useHistory, useParams } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import ProductCard from '../Products/ProductCard/ProductCard';

const SignUp = () => {
    const { productId } = useParams();
    const [selectedProduct, setSelectedProduct] = useState();
    const {
        savePurchase, purchaseSaved, setPurchaseSaved, products
    } = useData();
    const { user } = useAuth();
    const history = useHistory();
    const redirect_uri = '/home';

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
        savePurchase({ user: data.name, email: data.email, mobile: data.mobile, address: data.address, productId: selectedProduct._id, product: selectedProduct.name, price: selectedProduct.price, date: new Date().toDateString(), status: "Pending" });
    };

    useEffect(() => {
        //if purchase is saved redirect user back to home 
        if (purchaseSaved) {
            history.push(redirect_uri);
            setPurchaseSaved(false);
        }
    }, [history, purchaseSaved, setPurchaseSaved]);

    useEffect(() => {
        //finding user selected product from products
        setSelectedProduct(products.find(product => product._id.toString() === productId.toString()));
    }, [productId, products]);

    if (!selectedProduct) return (<div className='w-full flex justify-center items-center h-96'>

        <Loader
            type="Bars"
            color="#3386FF"
            height={100}
            width={100}
            timeout={4000}
        />

    </div>);
    return (
        <div className="w-full flex flex-wrap">
            <div style={{ minWidth: "300px" }} className="lg:w-1/3 md:w-2/4 w-full p-3">
                <ProductCard data={selectedProduct} showPurchaseButton={false}></ProductCard>
            </div>
            <form style={{ minWidth: "300px" }} className="lg:w-2/4 md:w-2/4 w-full mx-auto p-3 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" defaultValue={user.name ? user.name : user.displayName} readOnly={true} type="text" placeholder="Enter Name" {...register("name")} />
                {errors.name && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.name?.message}</p>}

                <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="text" defaultValue={user.email} readOnly={true} placeholder="Enter Email" {...register("email")} />
                {errors.email && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.email?.message}</p>}

                <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="number" placeholder="Enter Mobile Number" {...register("mobile")} />
                {errors.mobile && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.mobile?.message}</p>}

                <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Address" {...register("address")} />
                {errors.address && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.address?.message}</p>}

                <input className="lg:w-2/4 w-3/4 mx-auto px-4 p-2 bg-blue-500 rounded-md text-white cursor-pointer" type="submit" value="PURCHASE" />
            </form>
        </div>
    );
};

export default SignUp;