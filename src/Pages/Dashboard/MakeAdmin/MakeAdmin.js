
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import useAuth from '../../../Hooks/useAuth';
import useData from '../../../Hooks/useData';

const MakeAdmin = () => {
    const {
        makeAdmin
    } = useData();
    const { token } = useAuth();
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .required('Email is required')
            .matches(emailRegex, { message: "Invalid email address", excludeEmptyString: true })
            .max(30, 'Email must be maximum 30 characters'),
    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, reset, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        makeAdmin(data.email, token);
        reset();
    };

    return (
        <form className="lg:w-7/12 w-11/12 mx-auto p-2 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="lg:text-4xl md:text-3xl text-2xl py-10 font-extrabold text-center">Make Admin</p>

            <input className="lg:w-7/12 md:w-3/4 w-full p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Email" {...register("email")} />
            {errors.email && <p className="lg:w-2/4 w-3/4 text-start text-red-600 font-bold">{errors.email?.message}</p>}

            <input className="lg:w-2/4 w-3/4 mx-auto px-4 p-2 bg-gradient-to-t from-blue-600 to-blue-500 rounded-lg shadow-md text-white cursor-pointer" type="submit" name="SUBMIT" />
        </form>
    );
};

export default MakeAdmin;