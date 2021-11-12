import { faEdit, faImage, faMapMarkerAlt, faMoneyBillAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import useAuth from '../../../Hooks/useAuth';
import useData from '../../../Hooks/useData';

const AddProduct = () => {
    const {
        saveProduct
    } = useData();
    const { token } = useAuth();
    const history = useHistory();
    const redirect_uri = '/home';
    const imageRegex = /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters')
            .max(200, 'Name must be at least 200 characters'),
        description: Yup.string()
            .required('Description is required')
            .min(6, 'Description must be at least 6 characters')
            .max(500, 'Description must be at least 500 characters'),
        image: Yup.string()
            .required('Image Url is required')
            .matches(imageRegex, { message: "Invalid image url", excludeEmptyString: true })
            .min(6, 'Image Url must be at least 6 characters')
            .max(1000, 'Image Url must be at least 1000 characters'),
        price: Yup.string()
            .required('Price is required')
            .min(1, 'Price must be minimum 1')
            .max(100000, 'Price can not be more than 100000')

    }).required();
    const formOptions = { resolver: yupResolver(validationSchema) };
    const { register, handleSubmit, reset, formState: { errors } } = useForm(formOptions);

    const onSubmit = data => {
        saveProduct(data, token);
        history.push(redirect_uri);
        reset();
    };

    return (
        <form className="lg:w-4/12 md:w-8/12 sm:w-full mx-auto p-2 m-2 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
            <p className="lg:text-4xl md:text-3xl text-2xl py-10 font-extrabold text-center">Add A New Product</p>

            {/* name of product */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-xl text-center mx-auto" icon={faMapMarkerAlt} />
                <input className="w-11/12 p-3 my-2 rounded-md border-0 outline-none" type="text" placeholder="Enter Product Name" {...register("name")} />
            </div>
            {errors.name && <p className="w-full text-start text-red-600 font-bold">{errors.name?.message}</p>}

            {/* product description */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-xl text-center mx-auto" icon={faEdit} />
                <textarea className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="text" placeholder="Enter Description" {...register("description")} />
            </div>
            {errors.description && <p className="w-full text-start text-red-600 font-bold">{errors.description?.message}</p>}

            {/* image url */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-xl text-center mx-auto" icon={faImage} />
                <input className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="text" placeholder="Enter Image Url" {...register("image")} />
            </div>
            {errors.image && <p className="w-full text-start text-red-600 font-bold">{errors.image?.message}</p>}

            {/* price */}
            <div className="w-full flex justify-between bg-white items-center border-2 rounded-md my-2">
                <FontAwesomeIcon className="w-1/12 text-xl text-center mx-auto" icon={faMoneyBillAlt} />
                <input className="w-11/12 p-3 my-2 border-0 outline-none rounded-md" type="number" placeholder="Enter Price" {...register("price")} />
            </div>
            {errors.price && <p className="w-full text-start text-red-600 font-bold">{errors.price?.message}</p>}


            {/* submit button */}
            <input className="w-full mx-auto px-4 p-2 bg-blue-500 rounded-md text-white cursor-pointer" type="submit" name="ADD PRODUCT" />
        </form>
    );
};

export default AddProduct;