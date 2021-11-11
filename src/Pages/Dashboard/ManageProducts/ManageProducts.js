import React from 'react';
import useData from '../../../Hooks/useData';
import ProductCard from '../../Products/ProductCard/ProductCard';

const ManageProducts = () => {
    const { products } = useData();

    return (
        <div className="w-full mx-auto place-content-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
            {
                products.map(product => <ProductCard key={product._id} data={product} showPurchaseButton={false} showDeleteButton={true} ></ProductCard>)
            }
        </div>
    );
};

export default ManageProducts;