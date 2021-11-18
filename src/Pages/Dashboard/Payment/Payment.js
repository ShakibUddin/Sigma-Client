import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { serverUrl } from "../../../Constants/Constants";
import ProductCard from '../../Products/ProductCard/ProductCard';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`)


const Payment = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState({});

    //finding the product user is paying from
    useLayoutEffect(() => {
        axios.get(`${serverUrl}/product/${productId}`)
            .then(response => setProduct(response.data))
    }, [productId]);

    return (
        <div className="w-full text-center h-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1  flex-col justify-start items-center">
            <div className="w-4/5 mx-auto">
                <ProductCard data={product} showPurchaseButton={false} showDeleteButton={false}></ProductCard>
            </div>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm product={product} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;