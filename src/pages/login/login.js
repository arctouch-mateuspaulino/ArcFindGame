import React, {Component} from 'react';
import './style.css';
class Login extends Component{
   render(){
       return (
            <section className="section__login">
                <section className="section__title">
                    <h3>Login</h3>
                </section>
                <form method="POST" className="form__login">
                    <div className="container-input">
                        <input type="email" placeholder="Email" name="email"></input>
                    </div>
                    <div className="container-input">
                        <input type="password" placeholder="Password" name="Password"></input>
                    </div>
                    <div className="section__informs">
                        <p>Forgot password? <a>click here.</a></p>
                        <p>Doesn't have an account? <a>click here.</a></p>
                    </div>
                    <div className="container-input-send ">
                        <input type="submit" value="LOGIN"></input> 
                    </div>
                </form>
            </section>
       );
   } 
}
export default Login;