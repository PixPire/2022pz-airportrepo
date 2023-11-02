import Cookies from 'js-cookie'
import SimpleReactValidator from 'simple-react-validator';
import React, { useEffect } from 'react';
import {useState} from 'react';
import * as UserApi from '../../api/UserApi'

export default UserDataEdit=>{
  const validator = new SimpleReactValidator();

  const[login,setLogin]=useState('');
    const[password,setPassword]=useState('');

    const[name,setName]=useState('');
    const[surname,setSurname]=useState('');

    const[email,setEmail]=useState('');
    const[passport,setPassport]=useState('');

    const[phone,setPhone]=useState('');
    useEffect(()=>{UserApi.getUserById(Cookies.get('id')).then(response => {
   
      if (response.status === 200&&login==='') {
        console.log("pobranie danych")
        setLogin(response.data.login)
        setPassword(response.data.password)
        setName(response.data.name)
        setSurname(response.data.surname)
        setEmail(response.data.email)
        setPassport(response.data.passport)
        setPhone(response.data.phone)
        
      }
    });})
  

    
    
    
   const  editData=()=>{
let user_changed={id:Cookies.get('id'), login:login,password:password,name:name,surname:surname,email:email,phone:phone,passport:passport}
console.log(user_changed)
UserApi.editUser(Cookies.get('id'),user_changed).then(response => {
    if (response.status === 201) {
      alert("Udalo sie zmienic dane");
     
    }
    else alert("Blad "+response.status);
  });


}
    if(login=='')
    {return(<>Niepoprawne dane</>)}
    else{
        return <>
            <h2>Zmień dane:</h2><br/>
        <label class="labels">Login:</label>
        <br/>
        <input type="text"class="inputs" defaultValue={login} onChange={e => {setLogin(e.target.value);}}></input>
        <br/>
        <br/>
        <label class="labels">Haslo:</label>
        <br/>
        <input type="text"class="inputs" defaultValue={password} onChange={e => setPassword(e.target.value)}></input>
        <br/>
        <br/>
        
        <label class="labels">Imie:</label>
        <br/>
        <input type="text"class="inputs" defaultValue={name} onChange={e => setName(e.target.value)}></input>
        <br/>
        <br/>
        <label class="labels">Nazwisko:</label>
        <br/>
        <input type="text"class="inputs" defaultValue={surname} onChange={e => setSurname(e.target.value)}></input>
        <br/>
        <br/>
        
        <label class="labels">Email:</label>
        <br/>
        <input type="text"class="inputs" defaultValue={email} onChange={e => setEmail(e.target.value)}></input>
        {validator.message('email', email, 'required|email')}
        <br/>
        <br/>
        <label class="labels">Telefon:</label>
        <br/>
        <input type="text"class="inputs" defaultValue={phone} onChange={e => setPhone(e.target.value)}></input>
        <br/>
        <br/>
        <label class="labels">Paszport:</label>
        {validator.message('passport', passport, 'required|min:12|max:12')}
        <br/>
        <input type="text"class="inputs" defaultValue={passport} onChange={e => setPassport(e.target.value)}></input>
        <br/>
        <br/>
        
        <button class="buttons" onClick={editData}>Zmien</button>
        </>
    }}
   