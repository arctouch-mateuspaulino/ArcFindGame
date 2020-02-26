import React, {Component} from 'react';
import './style.css';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { saveToken } from '../../components/Authenticated/auth';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = { redirectToHome: false}
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
            axios.post("http://localhost:4001/arcfind/login", { email: this.state.email, password: this.state.password })
                .then(response => {
                    saveToken(response.data.token);
                    this.setState({redirectToHome: true})
                }).catch(err => console.log(' errr', err))
    }

   render(){
       if(this.state.redirectToHome)
        return <Redirect to={{ pathname: '/Home'}} />

       return (
        <section className="section__login">
            <section className="section__title">
                    <h3>Login</h3>
            </section>
                <form method="POST" className="form__login" onSubmit={this.handleSubmit} >
                    <div className="container-input">
                        <input type="email" placeholder="Email" name="email" value={this.state.email} onChange={(evt) => this.handleInputChange('email', evt.target.value)} ></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="password" name="password" value={this.state.password} onChange={(evt) => this.handleInputChange('password', evt.target.value)} ></input>
                    </div>
                    <div className="section__informs">
                        <p>Forgot password? <a href="#">click here.</a></p>
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