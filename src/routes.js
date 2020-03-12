import React from 'react';
import { isAuthenticated } from './components/Authenticated/auth';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Register  from './pages/Register/Section';
import Login from './pages/login/login';
import Home from './pages/Home/Home';
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Confirmation from './pages/ConfirmationAccount/Confirmation';

import { AnimatePresence, motion} from 'framer-motion';
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
        <AnimatePresence>
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
                    <Route path="/ResetPassword" component={ResetPassword}/>
                    <Route path="/ForgotPassword" component={ForgotPassword}/>
                    <Route path="/Confirmation" component= {Confirmation} />
                    <PrivateRoute path='/Home' component={Home}/>
            </Switch>
        </AnimatePresence>
    </BrowserRouter>
);
export default Routes;