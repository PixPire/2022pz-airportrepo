import React, {useState, useEffect} from "react";
// import {Button, Form} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
// import {v4 as uuid} from "uuid";
import {useNavigate} from 'react-router-dom';
import * as FlightApi from '../api/FlightApi.js';
import Cookies from 'js-cookie';
// import { useParams } from 'react-router-dom';

function Edit()
{
    const history = useNavigate();
    const [object, setObject] = useState({});
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

    useEffect(() => {
        const objectId = localStorage.getItem('id');
        console.log(objectId);
        if(objectId)
        {FlightApi.getFlightById(objectId)
          .then(response => setObject(response.data))
          .catch(error => console.log(error));
        }
      }, []);

    function handleEditFlight(e)
    {
        e.preventDefault();
        let flightObject=
        {
            airline:airline,
            departure:departure,
            destination:destination,
            availableSeats:availableSeats,
        }
        
        FlightApi.editFlight(localStorage.getItem('id'),flightObject).then(response => {
            history('/Flights');
            if (response.status === 201) {
                alert("Flight edited");
            }});
            
    }

    const [isAuthorized, setIsAuthorized] = useState(true);

    
    useEffect(()=>{
        let role = Cookies.get('role');

     if (role = 'admin') {
        setIsAuthorized(false);
     }

   
}, [])
  
    if(isAuthorized)
    {
        return("Musisz być zalogowany jako admin");
    }
    return(
            <div>
            
            <form onSubmit = {handleEditFlight} className='formM'>
            <h1 className='creator'>EDYTOR ISTNIEJĄCEGO LOTU</h1>
                <input type="text" id="airline" value ={object.airline} onChange={(e) => onChangeFlight(e)} required placeholder={`przewoznik: ${object.airline}`}>
                </input>
                <br></br>
                <input type="datetime-local" id="departure" value ={object.departure} onChange={(e) => onChangeFlight(e)} required>
                </input>
                <br></br>
                <input type="text" id="destination" value ={object.destination} onChange={(e) => onChangeFlight(e)} required placeholder={`cel lotu: ${object.destination}`}>
                </input>
                <br></br>
                <input type="number" className="inputAdd" id="availableSeats" value ={object.availableSeats} onChange={(e) => onChangeFlight(e)} required placeholder={`liczba miejsc: ${object.availableSeats}`}>
                </input>
                <br></br>
                
                    <button type="submit" id="flightButton" >Edytuj</button>
                
            </form>
        </div>
        )
}


export default Edit;