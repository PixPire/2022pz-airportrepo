import Cookies from 'js-cookie'
import React from "react"
// import { FaPlaneArrival, FaPlaneDeparture, FaChild } from "react-icons/fa";
// import { GiPerson } from "react-icons/gi";
// import { useForm } from "react-hook-form";
import {getDestinations, getSearchedFlights,getSearchedFlightsByDestination,getSearchedFlightsByDate ,updateSeatsById} from "../../api/FlightApi"
import {postTicket} from "../../api/TicketApi"
import {Button, Table} from 'react-bootstrap'


class ReserveTickets extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      destinations:[],
      chosenDestination:"",
      chosenDeparture:"",
      chosenSeats:"",
      chosenZone:"",
      showFoundFlights:false,
      foundFlights:[]
    };
  }
  componentDidMount() {
    getDestinations().then(response=>{this.setState({destinations:response})});
  }

  onSubmit=(e)=>{
    // e.preventDefault();
    let flightObject=
    {
      departure:this.state.chosenDeparture,
      destination:this.state.chosenDestination
    }
    getSearchedFlights(flightObject).then(response =>{
      this.setState({foundFlights:response,showFoundFlights:true})
    })
  }
   
  setFoundFlights=()=>{
    let flightObject=
    {
      departure:this.state.chosenDeparture,
      destination:this.state.chosenDestination
    }
    if(flightObject.departure===""&&flightObject.destination==="")
    {}
    else if(flightObject.departure=="")
    {
      getSearchedFlightsByDestination({destination:this.state.chosenDestination}).then(response =>{
        if(response.length>=0)
        {
          this.setState({foundFlights:response,showFoundFlights:true})
        }
    })}
    else if(flightObject.destination="")
    {
      getSearchedFlightsByDate({departure:this.state.chosenDeparture}).then(response =>{
        if(response.length>=0)
        {
          this.setState({foundFlights:response,showFoundFlights:true})
        }
    })}
    else{
      getSearchedFlights(flightObject).then(response =>{
        if(response.length>=0)
        {
          this.setState({foundFlights:response,showFoundFlights:true})
        }
    })}
}
 

  onChange=(e)=> {
    var name = e.target.name;
    this.setState({[name]: e.target.value},this.setFoundFlights);
  }



  handleTicket=(flight)=>{
    let ticketObject=
    {
      userId:Cookies.get('id'),
      flightId:flight.id,
      seats:this.state.chosenSeats,
      zone:this.state.chosenZone
    }
    if(isNaN(ticketObject.seats)|| ticketObject.zone=="")
      alert("Wybierz klasę i liczbe pasażerów")
    else{
      if(flight.availableSeats-ticketObject.seats>=0){
        let updateSeatsObject=
        {
          seatsDifference:-this.state.chosenSeats
        }
        postTicket(ticketObject);
        updateSeatsById(flight.id,updateSeatsObject)
        alert("Poprawnie zarejestrowano bilet")
        this.setFoundFlights()
        // this.setState ({
        //   showFoundFlights:false
        // })
        // this.setState ({
        //   showFoundFlights:true
        // })
        // flight.availableSeats = flight.availableSeats-ticketObject.seats
      }else{
        alert("Niewystarczająca ilość miejsc")
      }
    }
  }

  render(){
    return ( 
        <div class="ticket-box" >
          <form onSubmit={this.onSubmit}>
            <div>
              {/* header */}
              <div>
                <h1>
                  Rezerwacja biletów
                </h1>
                
              </div>

              {/* body */}
              <div class="ticket-box2" >
                {/* destination */}
                <div>
                  <p>Miejsce przylotu</p>
                  <div className="select-container">
                    {this.state.destinations.length>0 ?
                    <select name="chosenDestination" required="required"  onChange={this.onChange}>
                      <option value="" selected disabled hidden>
                        --Wybierz lotnisko--
                      </option>
                      {this.state.destinations.map((option) => (
                        <option value={option.destination}>{option.destination}</option>
                      ))}
                    </select>:<p>Brak lotnisk</p>}
                  </div>
                </div>

                <br/>
                {/* departure */}
                <div>
                  <p>
                    Data odlotu
                  </p>
                  <input type="date" name="chosenDeparture" required="required"  onChange={this.onChange}/>
                </div>

                <br/>
                  {/* seats */}
                <div>
                  <p>
                    Pasażerowie
                  </p>
                  <select name="chosenSeats" required="required" onChange={this.onChange}>
                    <option value="" selected disabled hidden>
                      --Wybierz liczbę--
                    </option>
                    {[1,2,3,4,5,6,7,8].map(number => (
                      <option>{number}</option>
                    ))}
                  </select>
                </div>
                
                <br/>
                  {/* Zone */}
                <div>
                  <p>Klasa</p>
                  <select name="chosenZone" required="required" onChange={this.onChange}>
                    <option value="" selected disabled hidden>
                      --Wybierz klasę--
                    </option>
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                <br/>
                {/* Szukaj lotów */}
               
                

              </div>
            </div>
          </form>
          {this.state.showFoundFlights &&
                  (
                    <div>
                    {(this.state.foundFlights ==null || this.state.foundFlights.length == 0)
                      ?<p1>Nie znaleziono żadnych lotów.</p1>
                      :            
                      <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Przewoźnik</th>
                                <th>Czas Odlotu</th>
                                <th>Cel</th>
                                <th>Ilość miejsc</th>
                                <th>Zarezerwuj</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            this.state.foundFlights.map((item)=>{
                              return(
                                <tr>
                                  <td>{item.id}</td>
                                  <td>{item.airline}</td>
                                  <td>{item.departure}</td>
                                  <td>{item.destination}</td>
                                  <td>{item.availableSeats}</td>
                                  {Cookies.get('role') != null
                                    ?<td>
                                      <Button onClick={()=>this.handleTicket(item)} >Zarezerwuj</Button>
                                    </td>
                                    :<td>
                                    <label value="Zaloguj się by zarezerwować."/>
                                  </td>
                                  }
                                </tr>
                              )
                            })
                          }
                        </tbody>
                      </Table>
                    }
                    </div>
                  )
                }
        </div>
    );
  }
};
export default ReserveTickets;
