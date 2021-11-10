import { faBars, faCreditCard, faEdit, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Route, useRouteMatch } from 'react-router';
import { Link, Switch } from 'react-router-dom';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import DashboardSection from './DashboardSection/DashboardSection';

const Dashboard = () => {
    const [collapse, setCollapse] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState("");
    const menus = [{ name: "Pay", icon: faCreditCard }, { name: "Orders", icon: faShoppingCart }, { name: "Review", icon: faEdit }, { name: "Logout", icon: faSignOutAlt }];
    const { width } = useWindowDimensions();
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
            <div style={{ width: `${collapse ? "50px" : "150px"}`, height: "100vh" }} className="flex flex-col justify-start bg-yellow-400 pl-3 py-3">
                <FontAwesomeIcon className="text-black font-bold text-xl mb-3 cursor-pointer" icon={faBars} onClick={handleSideBarToggle} />
                {
                    !collapse && <div>
                        {
                            menus.map((menu, index) => {
                                return <Link key={index} to={`${url}/${menu.name.toLocaleLowerCase()}`}>
                                    <p
                                        onClick={(e) => { handleMenuClick(e) }}
                                        className={
                                            `${menu.name.trim() === selectedMenu.trim() ?
                                                "bg-white my-2 py-2 pl-2 text-xl text-yellow-500 select-none"
                                                :
                                                "my-2 py-2 pl-2 text-xl select-none"
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

            <Switch>
                <Route path={`${path}/:sectionId`}>
                    <DashboardSection />
                </Route>
            </Switch>
        </div >
    );
};

export default Dashboard;