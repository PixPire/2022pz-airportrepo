import React from "react";
import Cookies from 'js-cookie';
import {useState, useEffect} from 'react';
export default function AssortmentEdit() {
    
   
    

    const [isAuthorized, setIsAuthorized] = useState(true);

    
    useEffect(()=>{
        let role = Cookies.get('role');

     if (role == 'admin') {
        setIsAuthorized(false);
     }

   
}, [])
  
    if(isAuthorized)
    {
        return("Musisz być zalogowany jako admin");
    }
    return (
        <div>
            
        <form  className='formM'>
        <h1 className='creator'>EDYTOR PRODUKTU</h1>
            <input type="text" id="nazwa"   required placeholder="nowa nazwa produktu">
            </input>
            <br></br>
            <input type="number" id="cena" padding="120px 200px" min="0.1" required placeholder="nowa cena produktu">
            </input>
            <br></br>
            <br></br>
            <button id="przyciskImage" >Zmień Zdjęcie</button>
            <br></br>
            <br></br>
            <button type="submit" id="przyciskProduktu" >Potwierdź Zmiany</button>
            
        </form>
    </div>
    );
}
//