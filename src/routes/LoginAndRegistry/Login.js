import React from "react";
import * as UserApi from '../../api/UserApi.js';
import '../../styles.css';
// import {Navigate} from 'react-router-dom';

class Login extends React.Component {

  constructor(props) {
    super(props);
   
    this.state = {
      login:"",
      password:""

  }

  }



  onChange=(e)=> {
    var name = e.target.name;
    this.setState({[name]: e.target.value});
    
}
login=()=>{
  UserApi.login(this.state).then(response => {
    if (response.status === 200) {
     
      
      window.location.href = '/';
    }
    else{
      alert("Nie udało się zalogować. Błędne hasło lub nazwa użytkownika");
    }
    
  });
}


  render() {
    return (
      <div class="photo">
<div class="user-container">
<label class="labels">Login:</label>
<br/>
<input type="text"class="inputs" name="login" onChange={this.onChange}></input>
<br/>
<br/>
<label class="labels">Haslo:</label>
<br/>
<input type="text"class="inputs" name="password" onChange={this.onChange}></input>
<br/>
<br/>
<button class="buttons" onClick={this.login}>Zaloguj</button>
</div></div>
    );
  }
}

export default Login;