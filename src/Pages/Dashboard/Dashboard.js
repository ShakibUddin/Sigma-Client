import { faBars, faCreditCard, faEdit, faPlusSquare, faShoppingCart, faSignOutAlt, faTasks, faTimesCircle, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Loader from 'react-loader-spinner';
import { useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import AdminRoute from '../Shared/Navigation/AdminRoute/AdminRoute';
import PrivateRoute from '../Shared/Navigation/PrivateRoute/PrivateRoute';
import DashboardSection from './DashboardSection/DashboardSection';

const Dashboard = () => {
    const [collapse, setCollapse] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("");
    const userMenus = [{ name: "Pay", path: "pay", icon: faCreditCard }, { name: "Orders", path: "orders", icon: faShoppingCart }, { name: "Review", path: "review", icon: faEdit }, { name: "Logout", icon: faSignOutAlt }];

    const adminMenus = [{ name: "Manage Orders", path: "manage_orders", icon: faShoppingCart }, { name: "Manage Products", path: "manage_products", icon: faTasks }, { name: "Add A Product", path: "add_product", icon: faPlusSquare }, { name: "Make Admin", path: "make_admin", icon: faUserShield }, { name: "Logout", icon: faSignOutAlt }];

    const [menus, setMenus] = useState([]);
    const { logout, role, user } = useAuth();
    const { width, height } = useWindowDimensions();
    let { path, url } = useRouteMatch();

    //set menu according to user role
    useEffect(() => {
        if (role === "ADMIN") setMenus(adminMenus);
        else if (role === "USER") setMenus(userMenus);
    }, [role]);

    useEffect(() => {
        if (width < 768) {
            setCollapse(true);
        }
        else {
            setCollapse(false);
        }
    }, [width]);

    const handleSideBarToggle = () => {
        setCollapse(!collapse);
    }
    const handleMenuClick = (e) => {
        setSelectedMenu(e.target.innerText);
    }
    if (role === "Unauthorized") return (
        <div className='w-full h-64 flex justify-center items-center'>

            <Loader
                type="TailSpin"
                color="#3386FF"
                height={50}
                width={50}
                timeout={4000}
            />

        </div>
    );
    return (
        //if user clicks nav items set selected menu to empty string
        <div className="w-full" onBlur={() => { setSelectedMenu("") }}>
            {/* drawer and menu items div */}
            <div className="w-full flex select-none relative">
                {/* drawer */}
                <div style={{ minWidth: `${collapse ? "54px" : "224px"}`, zIndex: "2" }} className="h-full grid grid-cols-1 place-content-start bg-gradient-to-r from-blue-600 to-blue-500 rounded-r-3xl shadow-lg p-3 absolute" >
                    {
                        collapse ? <FontAwesomeIcon className="text-white font-bold text-xl cursor-pointer ml-2 mr-auto transition duration-500 transform hover:scale-125" icon={faBars} onClick={handleSideBarToggle} /> : <FontAwesomeIcon className="text-white font-bold text-xl cursor-pointer ml-auto transition duration-500 transform hover:scale-125" icon={faTimesCircle} onClick={handleSideBarToggle} />
                    }
                    {
                        !collapse && <div className="w-full">
                            {
                                menus.map((menu, index) => {
                                    if (index === menus.length - 1) {
                                        return <Link key={index} to="/home"><p className="w-full my-2 p-2 rounded-md text-base border-2 border-red bg-white bg-gradient-to-t hover:from-red-600 hover:to-red-500 shadow-md text-white select-none" onClick={() => {
                                            logout();
                                        }} ><FontAwesomeIcon icon={menu.icon} /> {menu.name}</p></Link>;
                                    }
                                    return <Link key={index} to={`${url}/${menu.path}`}>
                                        <p
                                            onClick={(e) => { handleMenuClick(e) }}
                                            className={
                                                `${menu.name.trim() === selectedMenu.trim() ?
                                                    "w-full bg-white my-2 p-2 rounded-md text-base text-blue-500 select-none"
                                                    :
                                                    "w-full my-2 p-2 text-base rounded-md select-none text-white "
                                                }`
                                            }>
                                            <FontAwesomeIcon icon={menu.icon} /> {menu.name}
                                        </p>
                                    </Link>
                                })
                            }
                        </div>
                    }
                </div>

                {/* menu items */}
                <div style={{ zIndex: "1", minHeight: height }} className={`w-full ${collapse ? "pl-14" : "lg:pl-56"} pl-14`}>
                    {window.location.pathname === "/dashboard" && <div className="w-full text-3xl text-blue-500 text-center h-96 flex justify-center items-center">
                        <p>Welcome, {user.name}</p>
                    </div>}
                    <Switch>
                        {
                            role === "USER" &&
                            <PrivateRoute exact path={`${path}/:sectionId`}>
                                <DashboardSection />
                            </PrivateRoute>
                        }{
                            role === "ADMIN" &&
                            <AdminRoute exact path={`${path}/:sectionId`}>
                                <DashboardSection />
                            </AdminRoute>
                        }

                    </Switch>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;