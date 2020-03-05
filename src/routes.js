import React from 'react';
import { isAuthenticated } from './components/Authenticated/auth';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Register  from './pages/Register/Section';
import Login from './pages/login/login';
import Home from './pages/Home/Home';
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        { ...rest}
        render = { props => (
            isAuthenticated()? (
                <Component {... props}/>    
        ):(
                <Redirect to={{ pathname: '/', state: { from: props.location} }} />
        )
    )}/>
);
const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" 
                render = { props => (
                        isAuthenticated()? (
                            <Home {... props}/>
                            
                    ):(
                            <Login {... props}/>
                    )

                )}>
            </Route>
            <Route path="/Register" component={Register}/>
            <PrivateRoute path='/Home' component={Home}/>
            <Route path="/ResetPassword" component={ResetPassword}/>
            <Route path="/ForgotPassword" component={ForgotPassword}/>
        </Switch>
    </BrowserRouter>
);
export default Routes;