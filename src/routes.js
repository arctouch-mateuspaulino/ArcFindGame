import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register  from './components/Register/Section';
import Login from './pages/login/login'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
        </Switch>
    </BrowserRouter>
);
export default Routes;