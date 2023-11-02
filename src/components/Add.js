
import * as FlightApi from '../api/FlightApi.js';
// import {Button, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
// import {v4 as uuid} from "uuid";
import {useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import React,{useState, useEffect} from 'react';
// import { useHistory } from 'react-router-dom';

export default function Add()
{
    const history = useNavigate();
    const [airline,setAirline]=useState(null);
    const [departure,setDeparture]=useState(null);
    const [destination,setDestination]=useState(null);
    const [availableSeats,setAvailableSeats]=useState(null);
    
    
    const onChangeFlight=(e)=> 
    {
        const{id,value}=e.target;
        if(id==="airline")
        {
            setAirline(value);
        }
        if(id==="departure")
        {
            setDeparture(value);
        }
        if(id==="destination")
        {
            setDestination(value);
        }
        if(id==="availableSeats")
        {
            setAvailableSeats(value);
        }
        
    }
    function handleFlight(e)
    {
        e.preventDefault();
        let flightObject=
        {
            airline:airline,
            departure:departure,
            destination:destination,
            availableSeats:availableSeats,
        }
        console.log(flightObject);
        
        FlightApi.addFlight(flightObject).then(response => {
            history('/Flights');
            if (response.status === 201) {
                alert("Flight added");
            }});
            
    }


    const [isAuthorized, setIsAuthorized] = useState(true);

    
    useEffect(()=>{
        let role = Cookies.get('role');
        console.log(role);
     if (role== 'admin') {
        setIsAuthorized(false);
     }

   
}, [])
  
    if(isAuthorized)
    {
        return("Musisz być zalogowany jako admin");
    }
    else
    {
        return(
            <div>
                
                <form onSubmit = {handleFlight} className='formM'>
                <h1 className='creator'>KREATOR DODAWANIA NOWEGO LOTU</h1>
                    <input type="text" id="airline" value ={airline} onChange={(e) => onChangeFlight(e)} required placeholder="nazwa przewoznika">
                    </input>
                    <br></br>
                    <input type="datetime-local" id="departure" value ={departure} onChange={(e) => onChangeFlight(e)} required placeholder="zamierzony czas odlotu">
                    </input>
                    <br></br>
                    <input type="text" id="destination" value ={destination} onChange={(e) => onChangeFlight(e)} required placeholder="cel podróży">
                    </input>
                    <br></br>
                    <input type="number" className='inputAdd' id="availableSeats" value ={availableSeats} onChange={(e) => onChangeFlight(e)} required placeholder="ilość miejsc">
                    </input>
                    <br></br>
                   
                    <button type="submit" id="flightButton" >Stworz</button>
                    
                </form>
            </div>
        )
    }


   

}
