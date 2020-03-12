import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import { motion } from 'framer-motion';

export default class forgotPassword extends Component{
    constructor(props){
        super(props);
        this.state = { redirectToResetPassword: false}
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
            axios.post("http://localhost:4001/arcfind/forgot_password", { email: this.state.email})
            this.setState({redirectToResetPassword: true})
    }

   render(){
    if(this.state.redirectToResetPassword)
    return <Redirect to={{ pathname: '/ResetPassword'}} />

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
                    <h3>Forgot password</h3>
            </section>
                <form method="POST" className="form__login" onSubmit={this.handleSubmit}>
                    <div className="container-input">
                        <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={(evt) => this.handleInputChange('email', evt.target.value)}  ></input>
                    </div>
                    <div className="section__informs">
                        <p>Doesn't have an account? <Link to= "/Register">click here</Link ></p>
                    </div>
                    <div className="container-input-send ">
                        <input type="submit" value="Recuperar Senha"></input> 
                    </div>
                </form>
        </motion.section>
       )
   } 
}