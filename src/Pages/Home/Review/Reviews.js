import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import useData from '../../../Hooks/useData';
import ReviewCard from './ReviewCard/ReviewCard';

const Reviews = () => {
    const { reviews, fetchReviews } = useData();

    useEffect(() => {
        fetchReviews();
    }, []);

    if (reviews.length === 0) return (
        <div className='w-full flex justify-center items-center'>

            <Loader
                type="ThreeDots"
                color="#3386FF"
                height={50}
                width={50}
                timeout={4000}
            />

        </div>
    );
    return (
        <div className="lg:w-11/12 md:w-11/12 w-full mx-auto place-content-center grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4 p-4">
            {
                reviews.map(review => <ReviewCard key={review._id} data={review}></ReviewCard>)
            }
        </div>
    );
};

export default Reviews;