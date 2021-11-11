import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useData from '../../Hooks/useData';
import ProductCard from './ProductCard/ProductCard';

const Products = (props) => {
    const { products } = useData();
    const { role } = useAuth();
    const [productsForHomePage, setProductsForHomePage] = useState([]);
    const limit = props.limit;

    useEffect(() => {
        if (limit) setProductsForHomePage(products.slice(0, limit));
    }, [limit, products]);

    return (
        <div className="w-full mx-auto place-content-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
            {
                limit ?
                    productsForHomePage.map(product => <ProductCard key={product._id} data={product} showPurchaseButton={role !== "ADMIN" ? true : false} showDeleteButton={false}></ProductCard>) :
                    products.map(product => <ProductCard key={product._id} data={product} showPurchaseButton={true} showDeleteButton={false} ></ProductCard>)
            }
        </div>
    );
};

export default Products;