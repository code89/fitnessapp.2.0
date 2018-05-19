import React from 'react';
import ReactDOM from 'react-dom';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './react.css';

function CheckLogin(props) {
  if(!props.isLoggedIn) {
    return null
  }
  return(
    <h6 className="signinMessage">Please Register</h6>
  ) 
}


class SignIn extends React.Component {
  constructor(props) {
      super(props)
      
      this.submitUserCredentials = this.submitUserCredentials.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.state = {
          username: '',
          password: '',
          userLogin: ''
      }
    }

  handleChange(eve) {
      this.setState({
        [eve.target.name]: eve.target.value
      })      
  }

  submitUserCredentials() {
    let userData = {
      username: this.state.username,
      password: this.state.password
    } 
    this.userSignIn(userData)
  }

  userSignIn(userData) {
    let url = `${location.origin}/signin`;
    let params = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }
    fetch(url, params)
    .then((res) => res.text())
    .then((data) => {
      if(data == 'successful') {
        window.location.assign('http://localhost:3000/profile')
      }
      else {
        this.setState({userLogin: true})
      }    
    })
    .catch((err) => {return err});
  }



  render() {
    const {username, password} = this.state;
    const isEnabled = username.length > 0 && password.length > 0;

    return (
        <div className="signIn">
          <CheckLogin isLoggedIn={this.state.userLogin}/>
          <h3>Login</h3>
          <input type="text" placeholder="Username" className="input" id="username" value={this.state.username} id="usernameInput" name="username" onChange={this.handleChange}/>
          <input type="text" placeholder="Password" className="input" id="password" value={this.state.password} id="passwordInput" name="password" onChange={this.handleChange}/>
          <Button disabled={!isEnabled} className="submit" color="success" onClick={this.submitUserCredentials}>Submit</Button>
        </div>
    )
  }
}



module.exports = SignIn;
