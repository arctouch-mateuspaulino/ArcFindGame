import React, { Component } from 'react'
import { logOut } from '../../components/Authenticated/auth';
import { Link, Redirect } from 'react-router-dom';

export default class Home extends Component{

    render(){
        return(
        <section>
            <h1>Bem vindo</h1>
            <Link to='/' value="Log out" onClick={logOut}>Log out</Link>
            
        </section> 
        )
    }
}