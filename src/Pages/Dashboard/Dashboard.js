import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Switch } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, ProSidebar, SidebarHeader } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Route, useRouteMatch } from 'react-router';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import DashboardSection from './DashboardSection/DashboardSection';

const Dashboard = () => {
    const [collapse, setCollapse] = useState(false);
    const { height, width } = useWindowDimensions();
    let { path, url } = useRouteMatch();
    useEffect(() => {
        if (width < 800) {
            setCollapse(true);
        }
        else {
            setCollapse(false);
        }
    }, [width]);
    const handleSideBarToggle = () => {
        setCollapse(!collapse);
    }
    return (
        <div className="flex">
            <ProSidebar collapsedWidth={"50px"} width={"150px"} collapsed={collapse} className="bg-yellow-500 h-96">
                <SidebarHeader>
                    <FontAwesomeIcon className="m-5 cursor-pointer" onClick={handleSideBarToggle} icon={faBars} />
                </SidebarHeader>
                <Menu popperArrow={true} iconShape="square">
                    <MenuItem><Link to={`${url}/pay`}>Pay</Link></MenuItem>
                    <MenuItem><Link to={`${url}/orders`}>My Orders</Link></MenuItem>
                    <MenuItem><Link to={`${url}/review`}>Review</Link></MenuItem>
                    <MenuItem><Link to={`${url}/logout`}>Logout</Link></MenuItem>
                </Menu>
            </ProSidebar>

            <Switch>
                <Route exact path={`${path}/:sectionId`}>
                    <DashboardSection></DashboardSection>
                </Route>
            </Switch>
        </div >
    );
};

export default Dashboard;