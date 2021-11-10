import React from 'react';
import StarRatings from 'react-star-ratings';

const ReviewCard = (props) => {
    const { user, rating, content } = props.data;
    return (
        <div className="w-full shadow-md p-4 flex flex-col justify-between">
            <p className="text-xl text-black text-center font-semibold my-2">{user}</p>

            <div className="text-center my-2">
                <StarRatings
                    rating={parseFloat(rating)}
                    starDimension="30px"
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                />
            </div>

            <p className="text-sm text-gray-400 my-4 text-center">{content}</p>
        </div>
    );
};

export default ReviewCard;