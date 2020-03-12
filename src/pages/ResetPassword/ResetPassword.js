import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { motion } from 'framer-motion';

export default class ResetPassword extends Component{
    constructor(props){
        super(props);
        this.state = { redirectToLogin: false}
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(key, value){
        this.setState({
            [key]: value,
        })
    }
    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
            axios.post("http://localhost:4001/arcfind/reset_password",
            {
                email: this.state.email,
                token: this.state.token,
                password: this.state.password,
                confirm_password: this.state.confirm_password
            });
            this.setState({redirectToLogin: true})
    }
   render(){
    if(this.state.redirectToLogin)
    return <Redirect to={{ pathname: '/'}} />

    const pageTransition ={
        in:{
            opacity:1,
            x:0
        },
        out:{
            opacity: 0,
            x: "-5%"
        }
    }
       return (
        <motion.section className="section__login"
            initial= "out"
            transition={{ duration: 1.8}}
            animate="in"
            exit="out"
            variants={pageTransition}
        >
            <section className="section__title">
                    <h3>Reset password</h3>
            </section>
                <form method="POST" className="form__login" onSubmit={this.handleSubmit}>
                    <div className="container-input">
                        <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={(evt) => this.handleInputChange('email', evt.target.value)} ></input>
                    </div>
                    <div className="container-input">
                        <input type="text" placeholder="Token" name="token"
                        value={this.state.token} onChange={(evt) => this.handleInputChange('token', evt.target.value)} ></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="New password" name="password"
                        value={this.state.password} onChange={(evt) => this.handleInputChange('password', evt.target.value)}  ></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="Confirm password" name="Confirm_password"
                        value={this.state.confirm_password} onChange={(evt) => this.handleInputChange('confirm_password', evt.target.value)}  ></input>
                    </div>
                    <div className="section__informs">
                        <p>Doesn't have an account? <Link to= "/Register">click here</Link ></p>
                    </div>
                    <div className="container-input-send ">
                        <input type="submit" value="Redefinir Senha"></input> 
                    </div>
                </form>
        </motion.section>
       )
   } 
}