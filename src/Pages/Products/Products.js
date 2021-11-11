import React, { useEffect, useState } from 'react';
import useData from '../../Hooks/useData';
import ProductCard from './ProductCard/ProductCard';

const Products = (props) => {
    const { products } = useData();
    const [productsForHomePage, setProductsForHomePage] = useState([]);
    const limit = props.limit;
    useEffect(() => {
        if (limit) setProductsForHomePage(products.slice(0, limit));
    }, [limit, products])
    return (
        <div className="w-full mx-auto place-content-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
            {
                limit ?
                    productsForHomePage.map(product => <ProductCard key={product._id} data={product} showButton={true}></ProductCard>) :
                    products.map(product => <ProductCard key={product._id} data={product} showButton={true}></ProductCard>)
            }
        </div>
    );
};

export default Products;