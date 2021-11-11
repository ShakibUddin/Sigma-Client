
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import useAuth from '../../../Hooks/useAuth';
import contactbg from '../../../Images/contactbg.jpg';

const Contact = () => {
    const { user } = useAuth();

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string(),
        message: Yup.string()
            .required('Message is required')
            .max(30, 'Message must be maximum 30 characters')
            .min(5, 'Message must be minimum 5 characters long'),


    }).required();

    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, formState: { errors } } = useForm(formOptions);
    const onSubmit = data => {
        Swal.fire({
            title: 'Thank You',
            text: 'We received your message',
            showCloseButton: true,
            showConfirmButton: false,
        })
    };


    return (
        <div className="w-full h-screen object-cover bg-fixed bg-gray-600 bg-blend-multiply" style={{ backgroundImage: `url(${contactbg})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundPosition: "center" }}>

            <form className="lg:w-8/12 w-11/12 mx-auto p-5 m-3 flex flex-col justify-center items-center" onSubmit={handleSubmit(onSubmit)}>
                <p className="text-4xl text-white py-10 font-extrabold text-center">We are here for you, Got any questions?</p>

                <input className="lg:w-3/5 w-10/12 p-3 my-2 border-2 rounded-md" type="text" defaultValue={user.name} readOnly={user.email ? true : false} placeholder="Enter Name" {...register("name")} />
                {errors.name && <p className="lg:w-3/5 w-10/12 text-start text-red-600 font-bold">{errors.name?.message}</p>}

                <input className="lg:w-3/5 w-10/12 p-3 my-2 border-2 rounded-md" type="text" defaultValue={user.email} readOnly={user.email ? true : false} placeholder="Enter Email" {...register("email")} />
                {errors.email && <p className="lg:w-3/5 w-10/12 text-start text-red-600 font-bold">{errors.email?.message}</p>}

                <textarea className="lg:w-3/5 w-10/12 p-3 my-2 border-2 rounded-md" type="text" placeholder="Enter Message" {...register("message")} />
                {errors.message && <p className="lg:w-3/5 w-10/12 text-start text-red-600 font-bold">{errors.message?.message}</p>}

                <input className="lg:w-3/5 w-10/12 mx-auto px-4 p-2 bg-blue-600 rounded-md text-white cursor-pointer" type="submit" name="SUBMIT" />
            </form>
        </div>

    );
};

export default Contact;