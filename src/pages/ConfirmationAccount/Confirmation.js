import React, { Component } from 'react';
import axios from 'axios';
import '../login/style.css'
import { Link, Redirect } from 'react-router-dom';

import { motion } from 'framer-motion';

export default class Confirmation extends Component{
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
            axios.post("http://localhost:4001/arcfind/confirmation", { email: this.state.email, token: this.state.token })
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
        return(
            <motion.section className="section__register"
                initial= "out"
                transition={{ duration: 1.8}}
                animate="in"
                exit="out"
                variants={pageTransition}
            >
                <div className="main-register">
                    <form method="POST" className="form__register" onSubmit={this.handleSubmit}>
                        <div className="container-input">
                            <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={(evt) => this.handleInputChange('email', evt.target.value)}></input>
                        </div>
                        <div className="container-input">
                            <input type="text" placeholder="Token"  name="Token" value={this.state.token} onChange={(evt) => this.handleInputChange('token', evt.target.value)}></input>
                        </div>
                        <div className="container-input-send">
                            <input type="submit" value="SEND"></input>
                        </div>
                        <section className="section__inform">
                            <p>Already have an account? <Link to= "/">click here</Link ></p>
                        </section>
                    </form> 
                </div>
            </motion.section>
        );
    }
}