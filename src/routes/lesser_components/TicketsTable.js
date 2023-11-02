import Cookies from 'js-cookie'
// import SimpleReactValidator from 'simple-react-validator'
import React, { useEffect } from 'react'
import {useState} from 'react'
import * as TicketApi from '../../api/TicketApi'
import RenderTable from '../../adminComponents/renderTable'
import * as FlightApi from '../../api/FlightApi'
import './styles1.css'
// import { response } from 'express'
export default  TicketsTable=>{
    const[tickets,setTickets]=useState(null)
    useEffect(()=>{TicketApi.getTicketsWithFlightInfo(Cookies.get('id')).then(response => {
        
        if (response.status === 200 && tickets===null) {
          setTickets(response.data)
         
        }
      
      })
    })
    
    const deleteTicket=(id)=>{
      TicketApi.getTicketById(id).then(
        response =>{
        var updateSeatsObject = {
          seatsDifference:response[0].seats
        }
        FlightApi.updateSeatsById(response[0].flightId,updateSeatsObject).then(
          TicketApi.deleteTicketById(id).then(
            response=>{
            if(response.status===200)
            {setTickets(tickets.filter(ticket=>ticket.id!=id))
              alert("Pomyslnie usunieto bilet.");
            }
            }
          )
        )
        }
      )
    }

if(tickets==null)
{return(<h2>Brak biletow</h2>)}
   else {var time=new Date()
    console.log(time)
    return (
        <table>
        <thead>
          <tr>
          <th>No.</th>
          <th>Id lotu</th>
          <th>Linia lotnicza</th>
          <th>Cel podrozy</th>
          <th>Czas odlotu</th>
          <th>Siedzenie</th>
          <th>Strefa</th>
          <th></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket,index) =>
          
         <tr class={(time.getTime()<Date.parse(ticket.departure))? "":"strikeout"}>
            <td>{index+1}</td>
<td>{ticket.flightId}</td>
<td>{ticket.airline}</td>
<td>{ticket.destination}</td>
<td>{ticket.departure}</td>
<td>{ticket.seats}</td>
<td>{ticket.zone}</td>
<td> {(time.getTime()<Date.parse(ticket.departure))?<button onClick={() =>deleteTicket(ticket.id)}>Zwrot</button>:<></> }</td>
          </tr> )}

        </tbody>
      </table>
    );
}}