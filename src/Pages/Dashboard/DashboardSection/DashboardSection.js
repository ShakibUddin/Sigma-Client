import React from 'react';
import { useParams } from 'react-router';
import Payment from '../../Payment/Payment';

const DashboardSection = () => {
    let { sectionId } = useParams();
    if (sectionId === "pay") return (<Payment></Payment>);
    return (
        <div>
            <p>{sectionId}</p>
        </div>
    );
};

export default DashboardSection;