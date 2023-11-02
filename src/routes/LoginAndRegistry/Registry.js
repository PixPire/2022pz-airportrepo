import React from "react";
import * as UserApi from '../../api/UserApi.js';
import '../../styles.css';
class Registry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login:"",
      password:"",
      name:"",
      surname:"",
      email:"",
      phone:"",
      passport:"",
      showPassword: false 
  }
  }



  onChange=(e)=> {
    var name = e.target.name;
    this.setState({[name]: e.target.value});
    
}
showPassword = () => {
  console.log("ddd");
  this.setState((prevState) => ({
    showPassword: !prevState.showPassword
  }));
};
registry=(e)=>{
  
  UserApi.login(this.state).then(
      response => {
        console.log(response)
        if (response.status == 205) {
          UserApi.addUser(this.state).then(response1 => {
            if (response1.status === 201) {
              UserApi.login(this.state).then(response2 => {
                if (response2.status === 200) {
                 
                  alert("Udalo sie zarejestrowac");
                  window.location.href = '/';
                }}); } });}});
                e.preventDefault();}
    

              

  render() {
    const { showPassword } = this.state;
    return (
      <div class="photo">
<div class="user-container">
<form onSubmit={this.registry}>
<label class="labels">Login:</label>
<br/>
<input type="text"class="inputs" name="login" required minLength={5} onChange={this.onChange}></input>
<br/>
<br/>
<label class="labels">Haslo:</label>
<br/>
<input type={showPassword ? "text" : "password"} class="inputs" id="passwordInput" name="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Przynajmniej 8 znaków, w tym jedna conajmniej 1 duża litera, mała litera i cyfra" onChange={this.onChange}></input>
<br/>
<label class="labels">Pokaz haslo   </label>
<input type="checkbox" onClick={this.showPassword}></input>
<br></br>

<label class="labels">Imie:</label>
<br/>
<input type="text"class="inputs" name="name" required minLength="1" onChange={this.onChange}></input>
<br/>
<br/>
<label class="labels">Nazwisko:</label>
<br/>
<input type="text"class="inputs" name="surname" required minLength ="1" onChange={this.onChange}></input>
<br/>
<br/>

<label class="labels">Email:</label>
<br/>
<input type="text"class="inputs" name="email" required pattern="^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$" onChange={this.onChange} title="Podaj poprawny adres e-mail"></input>
<br/>
<br/>
<label class="labels">Telefon:</label>
<br/>
<input type="text"class="inputs" name="phone" required minLength={9} maxLength={9} pattern="[0-9]+" onChange={this.onChange} title="Telefon ma mieć tylko i wyłącznie 9 cyfr"></input>
<br/>
<br/>
<label class="labels">Paszport:</label>
<br/>
<input type="text"class="inputs" name="passport" required minLength={12} maxLength={12} pattern="[0-9]+" onChange={this.onChange}></input>
<br/>
<br/>

<button class="buttons">Zarejestruj</button>
</form>
</div></div>
    );
  }
}

export default Registry;