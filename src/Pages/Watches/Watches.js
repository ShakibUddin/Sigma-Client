import React, { useEffect, useState } from 'react';
import useData from '../../Hooks/useData';
import WatchCard from './WatchCard/WatchCard';

const Watches = (props) => {
    const { watches } = useData();
    const [watchesForHomePage, setWatchesForHomePage] = useState([]);
    const limit = props.limit;
    useEffect(() => {
        if (limit) setWatchesForHomePage(watches.slice(0, limit));
    }, [limit, watches])
    return (
        <div className="w-full mx-auto place-content-center grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 p-4">
            {
                limit ?
                    watchesForHomePage.map(watch => <WatchCard key={watch._id} data={watch} showButton={true}></WatchCard>) :
                    watches.map(watch => <WatchCard key={watch._id} data={watch} showButton={true}></WatchCard>)
            }
        </div>
    );
};

export default Watches;