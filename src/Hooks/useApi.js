import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { serverUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {

    const [watches, setWatches] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [purchaseSaved, setPurchaseSaved] = useState(false);


    const getWatchesUrl = `${serverUrl}/watches`;
    const saveWatchesUrl = `${serverUrl}/watch`;
    const getReviewsUrl = `${serverUrl}/reviews`;
    const saveReviewUrl = `${serverUrl}/review`;
    const getPurchasesUrl = `${serverUrl}/purchases`;
    const savePurchaseUrl = `${serverUrl}/purchase`;
    const deletePurchaseUrl = `${serverUrl}/delete/purchase`;//add id
    const approvePurchaseUrl = `${serverUrl}/update/purchase`;//add id

    //----------------------Watches Get,Post Code------------------
    const fetchWatches = () => {
        axios.get(getWatchesUrl)
            .then(response => {
                setWatches(response.data);
            }).catch(e => console.log(e));
    }
    useEffect(() => {
        fetchWatches();
    }, []);
    const saveWatch = ({ name, description, price, image }) => {
        axios.post(saveWatchesUrl, { name, description, price, image })
            .then(response => {
                if (response.data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Watch Uploaded Successfully',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    Swal.showValidationMessage(
                        `Oops! Something is wrong.`
                    )
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Oops! Something is wrong.`
                )
            })
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
    const saveReviews = ({ user, rating, content }) => {
        axios.post(saveReviewUrl, { user, rating, content })
            .then(response => {
                if (response.data) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Thank You.',
                        text: "We appreciate your feedback",
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    Swal.showValidationMessage(
                        `Oops! Something is wrong.`
                    )
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Oops! Something is wrong.`
                )
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
    const savePurchase = ({ user, email, mobile, address, watchId, watch, date, price, status }) => {
        axios.post(savePurchaseUrl, { user, email, mobile, address, watchId, watch, date, price, status })
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
                    Swal.showValidationMessage(
                        `Oops! Something is wrong.`
                    )
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                setPurchaseSaved(false);
                Swal.showValidationMessage(
                    `Oops! Something is wrong.`
                )
            })
    }
    const deletePurchase = (id) => {
        axios.delete(`${deletePurchaseUrl}/${id}`)
            .then(function (response) {
                if (response.data) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Purchase deleted successfully.',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                    //fetch new data
                    fetchPurchases();
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const approvePurchase = ({ _id, user, email, mobile, address, watchId, watch, date, price, status }) => {
        axios.put(approvePurchaseUrl, { user, email, mobile, address, watchId, watch, date, price, status })
            .then(response => {
                if (response.data) {
                    deletePurchase(_id);
                    Swal.fire({
                        icon: 'success',
                        title: 'Purchase approved successfully',
                        showCloseButton: true,
                        showConfirmButton: false,
                    })
                }
                else {
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Oops! Something is wrong.`
                )
            })
    }


    return { fetchWatches, watches, saveWatch, fetchReviews, reviews, saveReviews, fetchPurchases, purchases, savePurchase, purchaseSaved, setPurchaseSaved, deletePurchase, approvePurchase };
}

export default useApi;