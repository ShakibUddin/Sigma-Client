import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { serverUrl } from '../../../Constants/Constants';

const CheckoutForm = (props) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const product = props.product;
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        console.log("getting intent")
        axios.post(`${serverUrl}/create-payment-intent`, { price: product.price })
            .then(data => console.log(data));
    }, [product.price]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        }
        else {
            setError('');
            console.log(paymentMethod);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="py-2 px-8 bg-gradient-to-t from-green-600 to-green-500 rounded-lg shadow-md text-white cursor-pointer" type="submit" disabled={!stripe}>
                    Pay ${product.price}
                </button>
            </form>
            {
                error && <p style={{ color: 'red' }}>{error}</p>
            }
        </div>
    );
};
export default CheckoutForm;