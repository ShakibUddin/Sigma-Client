import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';

const SignUp = () => {

    const {
        handleFirebaseEmailSignUp, signupError, user
    } = useAuth();
    const { locationState } = useData();
    const history = useHistory();
    const redirect_uri = locationState?.from || '/home';
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(30, 'Name must be at least 30 characters'),
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegex, { message: "Invalid email address", excludeEmptyString: true })
            .min(6, 'Email must be at least 6 characters')
            .max(30, 'Email must be at least 30 characters'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .max(30, 'Password must be maximum 30 characters'),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .max(30, 'Password must be maximum 30 characters')
            .oneOf([Yup.ref('password')], 'Passwords must match')

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) errors.confirmPassword = true;
        handleFirebaseEmailSignUp(data.name, data.email, data.password);
    };

    useEffect(() => {
        if (user.email) history.replace(redirect_uri);
    }, [history, redirect_uri, user.email]);

    return (
        <form className="lg:w-6/12 w-11/12 mx-auto p-5 m-5 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-4xl py-10 font-extrabold">Register</p>
            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Name" {...register("name")} />
            {errors.name && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.name?.message}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Email" {...register("email")} />
            {errors.email && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.email?.message}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" type="password" placeholder="Enter Password" {...register("password")} />
            {errors.password && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.password?.message}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
            {errors.confirmPassword && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.confirmPassword?.message}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full mx-auto py-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg shadow-md text-white cursor-pointer" type="submit" value="CREATE ACCOUNT" />
            {signupError && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{signupError}</p>}
            <p className="py-5 text-center">Already have an account? <Link className="text-blue-800" to='/signin'>Login</Link></p>
        </form>
    );
};

export default SignUp;