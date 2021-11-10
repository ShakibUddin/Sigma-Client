
import React from 'react';
import { BrowserRouter, Route, Switch as RouteSwitch } from 'react-router-dom';
import AuthProvider from '../../../Contexts/AuthProvider';
import DataProvider from '../../../Contexts/DataProvider';
import Home from "../../Home/Home";
import NotFound from "../../NotFound/NotFound";
import Payment from '../../Payment/Payment';
import Purchase from '../../Purchase/Purchase';
import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';
import Watches from '../../Watches/Watches';
import NavBar from './NavBar/NavBar';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const Navigation = () => {
    return (
        <DataProvider>
            <AuthProvider>
                <BrowserRouter>
                    <NavBar></NavBar>
                    <RouteSwitch>
                        {/* using exact keyword to match with exact path */}
                        <Route exact path="/"><Home></Home></Route>
                        <Route exact path="/home"><Home></Home></Route>
                        <Route exact path="/watches"><Watches></Watches></Route>
                        <PrivateRoute exact path="/purchase/:watchId"><Purchase></Purchase></PrivateRoute>
                        <PrivateRoute exact path="/payment/:watchId"><Payment></Payment></PrivateRoute>
                        <Route exact path="/signin"><SignIn></SignIn></Route>
                        <Route exact path="/signup"><SignUp></SignUp></Route>
                        <Route path="*"><NotFound></NotFound></Route>
                    </RouteSwitch>
                </BrowserRouter>
            </AuthProvider>
        </DataProvider>
    );
};

export default Navigation;