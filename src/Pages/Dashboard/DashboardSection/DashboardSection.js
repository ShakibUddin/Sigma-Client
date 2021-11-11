import React from 'react';
import { useParams } from 'react-router';
import AddAdmin from '../AddAdmin/AddAdmin';
import AddProduct from '../AddProduct/AddProduct';
import ManageOrders from '../ManageOrders/ManageOrders';
import ManageProducts from '../ManageProducts/ManageProducts';
import Payment from '../Payment/Payment';
import PurchaseDataTable from '../PurchaseDataTable/PurchaseDataTable';
import ReviewForm from '../ReviewForm/ReviewForm';

const DashboardSection = () => {
    let { sectionId } = useParams();
    if (sectionId === "pay") return (<Payment></Payment>);
    if (sectionId === "orders") return (<PurchaseDataTable></PurchaseDataTable>);
    if (sectionId === "review") return (<ReviewForm></ReviewForm>);
    if (sectionId === "manage_orders") return (<ManageOrders></ManageOrders>);
    if (sectionId === "manage_products") return (<ManageProducts></ManageProducts>);
    if (sectionId === "add_product") return (<AddProduct></AddProduct>);
    if (sectionId === "make_admin") return (<AddAdmin></AddAdmin>);
};

export default DashboardSection;