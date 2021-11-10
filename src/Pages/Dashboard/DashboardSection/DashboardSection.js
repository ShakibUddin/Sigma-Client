import React from 'react';
import { useParams } from 'react-router';
import Payment from '../../Payment/Payment';
import ReviewForm from '../../ReviewForm/ReviewForm';
import PurchaseDataTable from '../PurchaseDataTable/PurchaseDataTable';

const DashboardSection = () => {
    let { sectionId } = useParams();
    if (sectionId === "pay") return (<Payment></Payment>);
    if (sectionId === "orders") return (<PurchaseDataTable></PurchaseDataTable>);
    if (sectionId === "review") return (<ReviewForm></ReviewForm>);
};

export default DashboardSection;