import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import * as Yup from 'yup';
import useAuth from '../../../Hooks/useAuth';
import useData from '../../../Hooks/useData';

const SignUp = () => {
    const [rating, setRating] = useState(0);

    const {
        saveReview, reviewSaved, setReviewSaved
    } = useData();
    const { user, token } = useAuth();
    const history = useHistory();
    const redirect_uri = '/home';

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters')
            .max(100, 'Description must be maximum 100 characters'),
    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        saveReview({ user: data.name, rating: rating.toString(), description: data.description }, token);
    };

    useEffect(() => {
        //if purchase is saved redirect user back to home 
        if (reviewSaved) {
            history.push(redirect_uri);
            setReviewSaved(false);
        }
    }, [history, reviewSaved, setReviewSaved]);

    const handleRatingChange = (value) => setRating(value);

    return (
        <div className='w-full p-2 flex justify-center'>
            <form className="lg:w-2/4 md:w-2/4 sm:w-3/4 w-10/12 p-2 mx-auto bg-white mb-auto flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <input className="w-full p-3 my-2 border-2 rounded-md" defaultValue={user.name} readOnly={true} type="text" placeholder="Enter Name" {...register("name")} />
                {errors.name && <p className="w-full text-start text-red-600 font-bold">{errors.name?.message}</p>}

                <StarRatings
                    rating={rating}
                    changeRating={(value) => { console.log(value); handleRatingChange(value) }}
                    starDimension="30px"
                    starRatedColor="orange"
                    numberOfStars={5}
                    name='rating'
                    {...register("rating")}
                />
                {errors.rating && <p className="w-full text-start text-red-600 font-bold">{errors.rating?.message}</p>}

                <textarea className="w-full p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Description" {...register("description")} />
                {errors.description && <p className="w-full text-start text-red-600 font-bold">{errors.description?.message}</p>}

                <input className="w-full mx-auto px-4 p-2 bg-blue-500 rounded-md text-white cursor-pointer" type="submit" value="SUBMIT" />
            </form>
        </div>
    );
};

export default SignUp;