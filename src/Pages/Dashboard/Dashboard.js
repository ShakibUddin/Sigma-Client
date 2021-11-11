import { faBars, faCreditCard, faEdit, faPlusSquare, faShoppingCart, faSignOutAlt, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import DashboardSection from './DashboardSection/DashboardSection';

const Dashboard = () => {
    const location = useLocation();
    const [collapse, setCollapse] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("");
    const userMenus = [{ name: "Pay", path: "pay", icon: faCreditCard }, { name: "Orders", path: "orders", icon: faShoppingCart }, { name: "Review", path: "review", icon: faEdit }, { name: "Logout", icon: faSignOutAlt }];

    const adminMenus = [{ name: "Manage Orders", path: "manage_orders", icon: faShoppingCart }, { name: "Manage Products", path: "manage_products", icon: faTasks }, { name: "Add A Product", path: "add_product", icon: faPlusSquare }, { name: "Make Admin", path: "make_admin", icon: faUserShield }, { name: "Logout", icon: faSignOutAlt }];

    const [menus, setMenus] = useState([]);
    const { logout, role } = useAuth();
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
    return (
        <div className="w-full flex select-none">
            <div style={{ minWidth: `${collapse ? "50px" : "220px"}`, minHeight: height }} className="grid grid-cols-1 place-content-start bg-blue-500 pl-3 py-3">
                <FontAwesomeIcon className="text-white font-bold text-xl mb-3 cursor-pointer" icon={faBars} onClick={handleSideBarToggle} />
                {
                    !collapse && <div>
                        {
                            menus.map((menu, index) => {
                                if (index === menus.length - 1) {
                                    return <Link key={index} className="my-2 py-2 pl-2 text-xl select-none text-white" to="/home"><button onClick={() => {
                                        logout();
                                    }} ><FontAwesomeIcon icon={menu.icon} /> {menu.name}</button></Link>;
                                }
                                return <Link key={index} to={`${url}/${menu.path}`}>
                                    <p
                                        onClick={(e) => { handleMenuClick(e) }}
                                        className={
                                            `${menu.name.trim() === selectedMenu.trim() ?
                                                "bg-white my-2 py-2 pl-2 text-xl text-blue-500 select-none"
                                                :
                                                "my-2 py-2 pl-2 text-xl select-none text-white"
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

            <div className="w-full">
                <Switch>
                    <Route path={`${path}/:sectionId`}>
                        <DashboardSection />
                    </Route>
                </Switch>
            </div>
        </div >
    );
};

export default Dashboard;