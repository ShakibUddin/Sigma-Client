
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import github from '../../Images/github.png';
import google from '../../Images/google.png';

const SignIn = () => {
    const {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        alert,
        signinError,
        user
    } = useAuth();
    const { updateLocationState } = useData();
    const location = useLocation();
    const history = useHistory();
    const user_redirect_uri = location.state?.from || '/home';
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegex, { message: "Invalid email address", excludeEmptyString: true })
            .max(30, 'Email must be maximum 30 characters'),
        password: Yup.string()
            .required('Password is required')
            .max(30, 'Password must be maximum 30 characters')

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        if (data.password !== data.confirmPassword) errors.confirmPassword = true;
        handleFirebaseEmailSignIn(data.email, data.password);
    };

    useEffect(() => {
        if (user.email) history.push(user_redirect_uri);
    }, [history, user.email, user_redirect_uri]);

    //saving location state
    useEffect(() => {
        updateLocationState(location.state);
    }, [location.state, updateLocationState])

    useEffect(() => {
        if (user.email) history.push(user_redirect_uri);
    }, [history, user.email, user_redirect_uri]);

    return (
        <form className="lg:w-6/12 w-11/12 mx-auto p-5 m-5 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-4xl py-10 font-extrabold">SignIn</p>
            {alert && <p className="p-3 text-center bg-blue-400 text-black">{alert}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Email" {...register("email")} />
            {errors.email && <p className="lg:w-2/4 md:w-3/4 w-full text-start text-red-600 font-bold">{errors.email?.message}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" icon={<FontAwesomeIcon icon={faEye} />} type="password" placeholder="Enter Password" {...register("password")} />
            {errors.password && <p className="lg:w-2/4 md:w-3/4 w-full text-start text-red-600 font-bold">{errors.password?.message}</p>}

            <input className="lg:w-7/12 md:w-3/4 w-full mx-auto py-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg shadow-md text-white cursor-pointer" type="submit" value="LOGIN" />
            {signinError && <p className="lg:w-2/4 md:w-3/4 w-full text-start text-red-600 font-bold">{signinError}</p>}

            <p className="p-5 text-center">Don't have an account? <Link className="text-blue-800" to='/signup'>Register</Link></p>

            <p className="p-3">or</p>

            <div className="lg:w-2/4 md:w-3/4 w-full flex justify-around">

                <button className="px-4 p-2 lg:text-xl md:text-xl text-base border-2 text-black bg-white shadow-md rounded-md" onClick={(e) => {
                    e.preventDefault();
                    handleGoogleSignIn()
                }}><img className="lg:w-7 lg:h-7 md:w-6 md:h-6 w-4 h-4 inline" src={google} alt="" /> Google</button>

                <button className="px-4 p-2 lg:text-xl md:text-xl text-base border-2 text-black bg-white shadow-md rounded-md" onClick={(e) => {
                    e.preventDefault();
                    handleGithubSignIn()
                }}> <img className="lg:w-7 lg:h-7 md:w-6 md:h-6 w-4 h-4 inline" src={github} alt="" /> Github</button>
            </div>
        </form>
    );
};

export default SignIn;