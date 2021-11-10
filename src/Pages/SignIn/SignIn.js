
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from "react-router-dom";
import * as Yup from 'yup';
import useAuth from '../../Hooks/useAuth';

const SignIn = () => {
    const {
        handleGoogleSignIn,
        handleGithubSignIn,
        handleFirebaseEmailSignIn,
        alert,
        signinError,
        user
    } = useAuth();
    const location = useLocation();
    const history = useHistory();
    const redirect_uri = location.state?.from || '/home';
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

    const redirectUserAfterSignIn = () => {
        history.push(redirect_uri);
    }

    useEffect(() => {
        if (user.email) history.push(redirect_uri);
    }, [history, redirect_uri, user.email]);

    return (
        <form className="lg:w-6/12 w-11/12 mx-auto p-5 m-5 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-4xl py-10 font-extrabold">SignIn</p>
            {alert && <p className="p-3 text-center bg-yellow-400 text-black">{alert}</p>}

            <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Email" {...register("email")} />
            {errors.email && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.email?.message}</p>}

            <input className="lg:w-2/4 w-3/4 p-3 my-2 border-2 rounded-md" type="password" placeholder="Enter Password" {...register("password")} />
            {errors.password && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.password?.message}</p>}

            <input className="lg:w-2/4 w-3/4 mx-auto px-4 p-2 bg-yellow-600 rounded-md text-white cursor-pointer" type="submit" name="LOGIN" />
            {signinError && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{signinError}</p>}

            <p className="p-5 text-center">Don't have an account? <Link className="text-yellow-800" to='/signup'>Register</Link></p>

            <p className="p-3">or</p>

            <div className="lg:w-2/4 w-3/4 flex justify-around">
                <button className="px-4 p-2 text-2xl border-2 text-black" onClick={(e) => {
                    e.preventDefault();
                    handleGoogleSignIn().then(() => { redirectUserAfterSignIn() })
                }}><FontAwesomeIcon icon={faGoogle} /></button>
                <button className="px-4 p-2 text-2xl border-2 text-black" onClick={(e) => {
                    e.preventDefault();
                    handleGithubSignIn().then(() => {
                        redirectUserAfterSignIn();
                    })
                }}><FontAwesomeIcon icon={faGithub} /></button>
                <button className="px-4 p-2 text-xl border-2 text-white bg-yellow-600" onClick={(e) => {
                    e.preventDefault();
                    handleFirebaseEmailSignIn("admin@gmail.com", "admin123").then(() => {
                        redirectUserAfterSignIn();
                    });
                }}>Admin</button>
                <button className="px-4 p-2 text-xl border-2 text-white bg-yellow-600" onClick={(e) => {
                    e.preventDefault();
                    handleFirebaseEmailSignIn("user@gmail.com", "useR1234").then(() => {
                        redirectUserAfterSignIn();
                    });
                }}>User</button>
            </div>
        </form>
    );
};

export default SignIn;