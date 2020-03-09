import React, { Component } from 'react';
import './style.css';
import axios from 'axios';
import { Link, Redirect} from 'react-router-dom';

export default class Register extends Component{
    constructor(props){
        super(props);
            this.state= {
                name: '',
                email: '',
                ocupation: '',
                password: '',
                confirmPassword: '',
                redirectToConfirmation: false
            }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e){
        this.setState({
            [e.target.name]: e.target.value,
            [e.target.email]: e.target.value,
            [e.target.ocupation]: e.target.value,
            [e.target.password]: e.target.value,
            [e.target.confirmPassword]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
        if(!this.state.name.length < 1 &&
           !this.state.email.length < 1 &&
           !this.state.ocupation.length < 1 &&
           !this.state.password.length < 8 &&
           !this.state.confirmPassword.length < 8){
               if(this.state.password === this.state.confirmPassword){
                   axios.post("http://localhost:4001/arcfind/register", this.state);
                   axios.post('https://api.elasticemail.com/v2/email/send',)
                   this.setState({redirectToConfirmation: true})
               }else{
                   console.log("Senhas incorretas");
               }    
           }else{
               console.log("Preencha todos os campos")
           }
    }

    render(){
        const {name, email, ocupation, password, confirmPassword} = this.state;
        if(this.state.redirectToConfirmation)
        return <Redirect to={{ pathname: '/Confirmation'}} />
    return(
    
    <section className="section__register">
            <div className="main-register">
                <form method="POST" className="form__register" onSubmit={this.handleSubmit}>
                    <div className="container-input">
                        <input type="text" placeholder="Name" name="name" value={name} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="container-input">
                        <input type="text" placeholder="Email" name="email" value={email} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="container-input">
                        <input type="text" placeholder="Ocupation"  name="ocupation"value={ocupation} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="Password"  name="password" value={password} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="container-input-send">
                        <input type="submit" value="SEND"></input>
                    </div>
                    <section className="section__inform">
                        <p>Already have an account? <Link to= "/">click here</Link ></p>
                    </section>
                </form> 
            </div>
    </section>
    )
    }
}


