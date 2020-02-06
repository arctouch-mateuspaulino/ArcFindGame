import React, { Component } from 'react';
import './style.css';

export default class Register extends Component{
    constructor(props){
        super(props);
            this.state= {
                name: this.props.nome,
                email: this.props.email,
                ocupation: this.props.ocupation,
                password: this.props.password,
                confirmPassword: this.props.confirmPassword
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
    }
    render(){
        const {nome, email, ocupation, password, confirmPassword} = this.state;
    return(
    <section className="section__register">
            <div className="main-register">
                <form method="POST" className="form_register" onSubmit={this.handleSubmit}>
                    <div className="container-input">
                        <input type="text" placeholder="Name" name="name" value={nome} onChange={this.handleInputChange}></input>
                    </div>
                    <div className="container-input">
                        <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange}></input>
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
                    <div className="container-button">
                        <button value="Send">SEND</button>
                    </div>
                </form> 
            </div>
    </section>
    )
    }
}


