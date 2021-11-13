
import React from 'react';
import { BrowserRouter, Route, Switch as RouteSwitch } from 'react-router-dom';
import AuthProvider from '../../../Contexts/AuthProvider';
import DataProvider from '../../../Contexts/DataProvider';
import Dashboard from '../../Dashboard/Dashboard';
import Home from "../../Home/Home";
import NotFound from "../../NotFound/NotFound";
import Products from '../../Products/Products';
import Purchase from '../../Purchase/Purchase';
import SignIn from '../../SignIn/SignIn';
import SignUp from '../../SignUp/SignUp';
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
                        <Route exact path="/products"><Products></Products></Route>
                        <Route path="/dashboard"><Dashboard></Dashboard></Route>
                        <PrivateRoute exact path="/purchase/:productId"><Purchase></Purchase></PrivateRoute>
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