import React from 'react';
import { useParams } from 'react-router';
import Payment from '../../Payment/Payment';
import PurchaseDataTable from '../PurchaseDataTable/PurchaseDataTable';

const DashboardSection = () => {
    let { sectionId } = useParams();
    if (sectionId === "pay") return (<Payment></Payment>);
    if (sectionId === "orders") return (<PurchaseDataTable></PurchaseDataTable>);
    return (
        <div>
            <p>{sectionId}</p>
        </div>
    );
};

export default DashboardSection;