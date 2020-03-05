import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
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
                password: this.state.password
            });
            this.setState({redirectToLogin: true})
    }
   render(){
    if(this.state.redirectToLogin)
    return <Redirect to={{ pathname: '/Login'}} />
       return (
        <section className="section__login">
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
                    <input type="password" placeholder="password" name="ConfirmPassword"
                    value={this.state.password} onChange={(evt) => this.handleInputChange('password', evt.target.value)}  ></input>
                </div>
                <div className="section__informs">
                    <p>Doesn't have an account? <Link to= "/Register">click here</Link ></p>
                </div>
                <div className="container-input-send ">
                    <input type="submit" value="LOGIN"></input> 
                </div>
            </form>
    </section>
       )
   } 
}