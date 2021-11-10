import { faBars, faCreditCard, faEdit, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import DashboardSection from './DashboardSection/DashboardSection';

const Dashboard = () => {
    const [collapse, setCollapse] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("");
    const menus = [{ name: "Pay", icon: faCreditCard }, { name: "Orders", icon: faShoppingCart }, { name: "Review", icon: faEdit }, { name: "Logout", icon: faSignOutAlt }];
    const { logout } = useAuth();
    const { width, height } = useWindowDimensions();
    let { path, url } = useRouteMatch();
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
            <div style={{ minWidth: `${collapse ? "50px" : "160px"}`, minHeight: height }} className="grid grid-cols-1 place-content-start bg-green-500 pl-3 py-3">
                <FontAwesomeIcon className="text-white font-bold text-xl mb-3 cursor-pointer" icon={faBars} onClick={handleSideBarToggle} />
                {
                    !collapse && <div>
                        {
                            menus.map((menu, index) => {
                                if (index === menus.length - 1) {
                                    return <button className="my-2 py-2 pl-2 text-xl select-none text-white" key={index} onClick={logout} ><FontAwesomeIcon icon={menu.icon} /> {menu.name}</button>;
                                }
                                return <Link key={index} to={`${url}/${menu.name.toLocaleLowerCase()}`}>
                                    <p
                                        onClick={(e) => { handleMenuClick(e) }}
                                        className={
                                            `${menu.name.trim() === selectedMenu.trim() ?
                                                "bg-white my-2 py-2 pl-2 text-xl text-green-500 select-none"
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