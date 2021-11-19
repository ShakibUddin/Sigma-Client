import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { serverUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {

    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [locationState, setLocationState] = useState();
    const [dataLoading, setDataLoading] = useState(false);

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

    const updateLocationState = (state) => {
        setLocationState(state);
    }

    //using facade design pattern to create simpler interface for different api calls
    const getApi = ({ url, setState, token }) => {
        setDataLoading(true);
        if (token) axios.defaults.headers.common['authorization'] =
            'Bearer ' + token;
        axios.get(url)
            .then(response => {
                setState(response.data);
            }).catch(e => console.log(e))
            .finally(() => setDataLoading(false));
    }
    const postApi = ({ url, body, callbackOnSuccess, successMessage, history, token, redirectTo }) => {
        axios.defaults.headers.common['authorization'] =
            'Bearer ' + token;
        axios.post(url, body)
            .then(response => {
                if (response.data) {
                    callbackOnSuccess();
                    //if user passes a redirect url redirect to that page
                    redirectTo && history.replace(redirectTo);
                    Swal.fire({
                        icon: 'success',
                        title: successMessage,
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
    const deleteApi = ({ url, id, callbackOnSuccess, successMessage, token }) => {
        axios.defaults.headers.common['authorization'] =
            'Bearer ' + token;
        axios.delete(`${url}/${id}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        title: successMessage,
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                    //fetch new data
                    callbackOnSuccess();
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
    //----------------------Products Get,Post,Delete Code------------------
    const fetchProducts = () => {
        getApi({ url: getProductsUrl, setState: setProducts });
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    const saveProduct = (productData, token) => {
        postApi({ url: saveProductsUrl, body: productData, callbackOnSuccess: fetchProducts, successMessage: 'Product Uploaded Successfully', token });
    }
    const deleteProduct = (id, token) => {
        deleteApi({ url: deleteProductUrl, id, callbackOnSuccess: fetchProducts, successMessage: 'Product deleted successfully.', token });
    }
    const updateApi = ({ url, id, callbackOnSuccess, successMessage, token }) => {
        axios.defaults.headers.common['authorization'] =
            'Bearer ' + token;
        axios.put(`${url}/${id}`)
            .then(response => {
                if (response.data) {
                    callbackOnSuccess(token);
                    Swal.fire({
                        icon: 'success',
                        title: successMessage,
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
    //----------------------Reviews Get,Post Code------------------
    const fetchReviews = () => {
        getApi({ url: getReviewsUrl, setState: setReviews });
    }

    const saveReview = ({ user, rating, description }, token, history) => {
        postApi({ url: saveReviewUrl, body: { user, rating, description }, callbackOnSuccess: fetchReviews, successMessage: 'We appreciate your feedback', token, history, redirectTo: '/home' });
    }

    //----------------------Purchases Get,Post Code------------------
    const fetchPurchases = (token) => {
        getApi({ url: getPurchasesUrl, setState: setPurchases, token });
    }

    const savePurchase = ({ user, email, mobile, address, productId, product, date, price, status }, token, history) => {
        postApi({ url: savePurchaseUrl, body: { user, email, mobile, address, productId, product, date, price, status }, callbackOnSuccess: fetchPurchases, successMessage: 'We received your order', token, history, redirectTo: '/home' });
    }
    const deletePurchase = (id, token) => {
        deleteApi({ url: deletePurchaseUrl, id, callbackOnSuccess: fetchPurchases, successMessage: 'Order deleted successfully.', token });
    }
    const approvePurchase = (id, token) => {
        updateApi({ url: approvePurchaseUrl, id, callbackOnSuccess: fetchPurchases, successMessage: 'Order shipped successfully', token })
    }

    //----------------------Make Admin Code------------------
    const makeAdmin = (email, token) => {
        updateApi({ url: makeAdminUrl, callbackOnSuccess: fetchPurchases, successMessage: 'Order shipped successfully', token })
        axios.defaults.headers.common['authorization'] =
            'Bearer ' + token;
        axios.put(`${makeAdminUrl}/${email}`)
            .then(response => {
                if (response.data) {
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


    return { dataLoading, fetchProducts, products, saveProduct, deleteProduct, fetchReviews, reviews, saveReview, fetchPurchases, purchases, savePurchase, deletePurchase, approvePurchase, makeAdmin, updateLocationState, locationState };
}

export default useApi;