import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { serverUrl } from "../Constants/Constants";
const axios = require('axios').default;

let useApi = () => {

    const [watches, setWatches] = useState([]);


    const getWatchesUrl = `${serverUrl}/watches`;
    const saveWatchesUrl = `${serverUrl}/watch`;

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
                        title: 'Thank You.',
                        text: "We will contact you in 24 hours",
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

    return { watches, saveWatch };
}

export default useApi;