import React, {Component} from 'react';
import './style.css';
import { Link } from 'react-router-dom';

export default class Login extends Component{
    constructor(props){
        super(props);
            this.state = { }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(e){
        this.setState({
            [e.target.email]: e.target.value,
            [e.target.password]: e.target.value
        })
    }
    handleSubmit(e){
        e.preventDefault();
    }
   render(){
       const {email, password} = this.state;
       return (
        <section className="section__login">
            <section className="section__title">
                    <h3>Login</h3>
            </section>
                <form method="POST" className="form__login" onSubmit={this.handleSubmit} >
                    <div className="container-input">
                        <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleInputChange} ></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="password" name="password" value={password} onChange={this.handleInputChange} ></input>
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