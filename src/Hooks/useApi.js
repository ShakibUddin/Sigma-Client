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
    const savePurchase = ({ user, email, mobile, address, watchId, price }) => {
        axios.post(savePurchaseUrl, { user, email, mobile, address, watchId, price })
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
    return { fetchWatches, watches, saveWatch, fetchReviews, reviews, saveReviews, fetchPurchases, purchases, savePurchase, purchaseSaved, setPurchaseSaved };
}

export default useApi;