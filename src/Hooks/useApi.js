import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { serverUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {

    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [purchaseSaved, setPurchaseSaved] = useState(false);
    const [reviewSaved, setReviewSaved] = useState(false);


    const getProductsUrl = `${serverUrl}/products`;
    const saveProductsUrl = `${serverUrl}/product/add`;
    const deleteProductUrl = `${serverUrl}/product/delete`;//add id
    const getReviewsUrl = `${serverUrl}/reviews`;
    const saveReviewUrl = `${serverUrl}/review/add`;
    const getPurchasesUrl = `${serverUrl}/purchases`;
    const savePurchaseUrl = `${serverUrl}/purchase/add`;
    const deletePurchaseUrl = `${serverUrl}/purchase/delete`;//add id
    const approvePurchaseUrl = `${serverUrl}/purchase/update`;//add id
    const makeAdminUrl = `${serverUrl}/admin`;//add id

    //----------------------Products Get,Post,Delete Code------------------
    const fetchProducts = () => {
        axios.get(getProductsUrl)
            .then(response => {
                setProducts(response.data);
            }).catch(e => console.log(e));
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    const saveProduct = (productData) => {
        axios.post(saveProductsUrl, productData)
            .then(response => {
                if (response.data) {
                    fetchProducts();
                    Swal.fire({
                        icon: 'success',
                        title: 'Product Uploaded Successfully',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }
    const deleteProduct = (id) => {
        axios.delete(`${deleteProductUrl}/${id}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Product deleted successfully.',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                    //fetch new data
                    fetchProducts();
                }
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
    }

    //----------------------Reviews Get,Post Code------------------
    const fetchReviews = () => {
        axios.get(getReviewsUrl)
            .then(response => {
                setReviews(response.data);
            }).catch(e => console.log(e));
    }
    useEffect(() => {
        fetchReviews();
    }, []);
    const saveReview = ({ user, rating, description }) => {
        axios.post(saveReviewUrl, { user, rating, description })
            .then(response => {
                if (response.data) {
                    setReviewSaved(true);
                    fetchReviews();
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You.',
                        text: "We appreciate your feedback",
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    setReviewSaved(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                setReviewSaved(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }

    //----------------------Purchases Get,Post Code------------------
    const fetchPurchases = () => {
        axios.get(getPurchasesUrl)
            .then(response => {
                setPurchases(response.data);
            }).catch(e => console.log(e));
    }
    useEffect(() => {
        fetchPurchases();
    }, []);
    const savePurchase = ({ user, email, mobile, address, productId, product, date, price, status }) => {
        axios.post(savePurchaseUrl, { user, email, mobile, address, productId, product, date, price, status })
            .then(response => {
                if (response.data) {
                    setPurchaseSaved(true);
                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You.',
                        text: "We received your order",
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    setPurchaseSaved(false);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                setPurchaseSaved(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }
    const deletePurchase = (id) => {
        axios.delete(`${deletePurchaseUrl}/${id}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Order deleted successfully.',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                    //fetch new data
                    fetchPurchases();
                }
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            });
    }
    const approvePurchase = (_id) => {
        axios.put(`${approvePurchaseUrl}/${_id}`)
            .then(response => {
                if (response.data) {
                    fetchPurchases();
                    Swal.fire({
                        icon: 'success',
                        title: 'Order shipped successfully',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                });
            })
    }

    //----------------------Make Admin Code------------------
    const makeAdmin = (email) => {
        axios.put(`${makeAdminUrl}/${email}`)
            .then(response => {
                if (response.data) {
                    fetchPurchases();
                    Swal.fire({
                        icon: 'success',
                        title: 'Admin Created Successfully.',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong!',
                    })
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }


    return { fetchProducts, products, saveProduct, deleteProduct, fetchReviews, reviews, saveReview, fetchPurchases, reviewSaved, setReviewSaved, purchases, savePurchase, purchaseSaved, setPurchaseSaved, deletePurchase, approvePurchase, makeAdmin };
}

export default useApi;