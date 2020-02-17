import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register  from './pages/Register/Section';
import Login from './pages/login/login'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/Register" component={Register}></Route>
        </Switch>
    </BrowserRouter>
);
export default Routes;