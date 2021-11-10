import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { serverUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {

    const [watches, setWatches] = useState([]);
    const [reviews, setReviews] = useState([]);


    const getWatchesUrl = `${serverUrl}/watches`;
    const saveWatchesUrl = `${serverUrl}/watch`;
    const getReviewsUrl = `${serverUrl}/reviews`;
    const saveReviewsUrl = `${serverUrl}/review`;

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
        axios.post(saveReviewsUrl, { user, rating, content })
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
                    throw new Error(response.statusText);
                }

            })
            .catch(error => {
                Swal.showValidationMessage(
                    `Oops! Something is wrong.`
                )
            })
    }
    return { fetchWatches, watches, saveWatch, fetchReviews, reviews, saveReviews };
}

export default useApi;