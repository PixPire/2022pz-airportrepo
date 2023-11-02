import React from "react";
import * as PilotApi from '../../api/PilotApi.js';
import * as HarmonogramApi from '../../api/HarmonogramApi.js';
import * as UserApi from '../../api/UserApi.js';
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react';

export default function Pilot() 
{
    

    const [stopienAwarii,setStopienAwarii]=useState(null);
    const [rodzajAwarii,setRodzajAwarii]=useState(null);
    const [opisAwarii,setOpisAwarii]=useState(null);

    const [przyczynaOpoznienia,setPrzyczynaOpoznienia]=useState(null);
    const [godzinaOpoznienia,setGodzinaOpoznienia]=useState(null);
    const [minutaOpoznienia,setMinutaOpoznienia]=useState(null);
    const [opisOpoznienia,setOpisOpoznienia]=useState(null);

    const onChangeAwaria=(e)=> 
    {
        const{id,value}=e.target;
        if(id==="stopienAwarii")
        {
            setStopienAwarii(value);
        }
        if(id==="rodzajAwarii")
        {
            setRodzajAwarii(value);
        }
        if(id==="opisAwarii")
        {
            setOpisAwarii(value);
        }
        
    }

    const onChangeOpoznienie=(e)=>
    {
        const{id,value}=e.target;
        if(id==="przyczynaOpoznienia")
        {
            setPrzyczynaOpoznienia(value);
        }
        if(id==="godzinaOpoznienia")
        {
            setGodzinaOpoznienia(value);
        }
        if(id==="minutaOpoznienia")
        {
            setMinutaOpoznienia(value);
        }
        if(id==="opisOpoznienia")
        {
            setOpisOpoznienia(value);
        }
    }

    function handleAwaria(e)
    {
        e.preventDefault();
        let obiektAwarii=
        {
            stopienAwarii:stopienAwarii,
            rodzajAwarii:rodzajAwarii,
            opisAwarii:opisAwarii,

        }
        PilotApi.addAwaria(obiektAwarii).then(response => {
            if (response.status === 201) {
                alert("Udalo sie dodac awarie");
            }});
    }
    function handleOpoznienie(e)
    {
        e.preventDefault();
        let obiektOpoznienia=
        {
            przyczynaOpoznienia:przyczynaOpoznienia,
            godzinaOpoznienia:godzinaOpoznienia,
            minutaOpoznienia:minutaOpoznienia,
            opisOpoznienia:opisOpoznienia,

        }
        PilotApi.addOpoznienie(obiektOpoznienia).then(response => {
            if (response.status === 201) {
                alert("Udalo sie dodac opoznienie");
            }});

    }
    

    function handlePDF()
    {
        let style="<style>table{border:solid;}th{font-weight:bold;text-align:center;}tr{border:solid;text-align:center;}col{border: solid;}colgroup{border:solid;}</style>";
        let tabPDF1 = document.getElementById('tabPDF').innerHTML;
        let win = window.open('','','height=900,width=900')
        win.document.write('<html><head');
        win.document.write('<title>Harmonogram pracy</title>');
        win.document.write(style);
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(tabPDF1);
        win.document.write('</body></html>');
        

        win.document.close();

        win.print();
    }
   
      


    const [isShown1, setIsShown1] = useState(false);
    const [isShown2, setIsShown2] = useState(false);
    const [isShown3, setIsShown3] = useState(false);
    const [pilotData, setPilotData] = useState({});
    const [pilotPerson, setPilotPerson] = useState({});
    const handleClick1 = event => 
    {
      setIsShown1(current => !current);
      console.log(pilotData.data);
    }
    const handleClick2 = event => 
    {
      setIsShown2(current => !current);
    }
    const handleClick3 = event =>
    {
        setIsShown3(current => !current);
    }
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthorized, setIsAuthorized] = useState(true);

    
    useEffect(()=>{

        let id = Cookies.get('id');
        let role = Cookies.get('role');
        console.log(id)
     if (role === 'pilot') {
        UserApi.getUserById(id)
        .then(response => {
            setPilotPerson(response);
          }) 
          .catch(error => {
            console.error('Error fetching harmonogram data:', error);
          });
      HarmonogramApi.getHarmonogramId(id)
        .then(response => {
          setPilotData(response);
          setIsLoading(false);
        })
        
        .catch(error => {
          console.error('Error fetching harmonogram data:', error);
        });
    }
    else
{
    //ktos inny wszedl
    setIsAuthorized(true)
}}, [])

  
    if(isLoading)
    {
        if(isAuthorized)
        {
            return("Musisz być zalogowany jako pilot");
        }
        return ("Ładowanie...");
    }
    return(
        <div className="divPilot">
        <><h1>Witaj {pilotPerson.data.name} {pilotPerson.data.surname}</h1><>
        
        <br></br>
        <div id="klik1">
            <button onClick={handleClick1} id="handlerAwarii" className="buttonPilot">Zglos awarie</button>
            {isShown1 &&
                (
                    
                    <form onSubmit={handleAwaria}>
                        <br></br>
                        <select id="stopienAwarii"value ={stopienAwarii} onChange={(e) => onChangeAwaria(e)} required>
                            <option disabled selected value="">Wybierz stopień awarii</option>
                            <option>lekka</option>
                            <option>średnia</option>
                            <option>wielka</option>

                        </select>
                        
                        <br></br>
                        <select id="rodzajAwarii"value ={rodzajAwarii} onChange={(e) => onChangeAwaria(e)} required>
                            <option disabled selected value="">Wybierz rodzaj awarii</option>
                            <option>silnika</option>
                            <option>turbin</option>
                            <option>inna</option>
                        </select>
                        <br></br>
                        <textarea id="opisAwarii" value ={opisAwarii} onChange={(e) => onChangeAwaria(e)} required
                            rows="2"
                            cols="16"
                            placeholder="wpisz tutaj cos o awarii">
                        </textarea>
                        <br></br>
                        <button type="submit" id="przyciskAwarii" className="buttonPilot" >Wyslij</button>
                    </form >
                )
            }
        </div>
            <br></br>
            <div id="klik2">
                <button onClick={handleClick2} id="handlerOpoznienia" className="buttonPilot">Zglos opoznienie</button>
                {isShown2 &&
                    (
                        <form onSubmit={handleOpoznienie}>
                            <br></br>
                            <select id="przyczynaOpoznienia" onChange={(e) => onChangeOpoznienie(e)} required>
                                <option disabled selected value="">Wybierz przyczyne opoznienia</option>
                                <option>warunki pogodowe</option>
                                <option>problemy z pasażerami</option>
                                <option>sprawy techniczne</option>

                            </select>
                            <br></br>
                           
                            <input type="number" className='inputTimePilot' id="godzinaOpoznienia" onChange={(e) => onChangeOpoznienie(e)} name="hOpoznienie" min="0" max="24"  placeholder="godzina" required>
                            </input>
                            <br></br>
                            
                            <input type="number" className='inputTimePilot' id="minutaOpoznienia" onChange={(e) => onChangeOpoznienie(e)} name="mOpoznienie" min="5" max="59" placeholder="minuty" required>
                            </input>
                            <br></br>

                            <textarea id="opisOpoznienia" onChange={(e) => onChangeOpoznienie(e)} required
                                rows="2"
                                cols="16"
                                placeholder="wpisz tutaj cos o opóźnieniu">
                            </textarea>
                            <br></br>
                            <button type="submit" id="przyciskOpoznienia" className="buttonPilot">Wyslij</button>
                        </form>
                    )
                }
            </div>
            <br></br>
            <div id="klik3">
                <button onClick={handleClick3} id="handlerHarmonogramu" className="buttonPilot">Sprawdz Harmonogram</button>
                {isShown3 &&
                    (
                        <><>
                        <div id="tabPDF">
                        <table>
  <thead>
    <tr>
      <th>Dzien</th>
      <th>Godzina rozpoczecia</th>
      <th>Godzina zakonczenia</th>
      <th>Laczny czas</th>
    </tr>
  </thead>
  <tbody>
  {pilotData.data.map(row => (
      <tr key={row.id}>
        <td>{row.dzien}</td>
        <td>{row.start}</td>
        <td>{row.koniec}</td>
        <td>{row.koniec-row.start}</td>
        
      </tr>
    ))}
    <tr>
  <td></td>
  <td></td>
  <td></td>
  <td>{pilotData.data.reduce((acc, curr) => acc + curr.koniec - curr.start, 0)}</td>
</tr>
    
  </tbody>
</table>

                    </div>
                    </>
                    <button onClick={handlePDF} id="handlerPDF" className="buttonPilot"> Pobierz </button></>
                    )
                }
            </div>
            </></>
            </div>

    );



   
  
}