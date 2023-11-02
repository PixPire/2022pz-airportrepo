import React, { Fragment } from 'react';
import {Button, Table} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom'
import * as FlightApi from '../../api/FlightApi.js';
import Cookies from 'js-cookie';

class Flights extends React.Component
{
    constructor(props)
    {
        super(props); 
        let role = Cookies.get('role');
        let AuthWord = true;
        if(role!="admin")
        {
            AuthWord=false;
        }
        this.state={flightsData:[],Auth:AuthWord};
    }
    componentDidMount() 
    {
        FlightApi.getAllFlights().then(response=>{this.setState({flightsData:response})});
    }
    handleDelete = (id) => {
        if(window.confirm(`Czy na pewno chcesz usunąć lot o id ${id}?`)==true)
        {
            FlightApi.deleteFlight(id).then(() => {
                alert(`Usunięto lot o id ${id}`);
                window.location.reload();
              });
        }
        
       
    }
    handleEdit =(id)=>
    {
        localStorage.setItem('id', id);
    }
    
    render()
    {
   
        return(
        
        <Fragment>
        <div style={{margin:"10rem"}}>
        <h1 className='creator'>Loty :)</h1>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            id
                        </th>
                        <th>
                            Przewoźnik
                        </th>
                        <th>
                            Czas Odlotu
                        </th>
                        <th>
                            Cel
                        </th>
                        <th>
                            
                            Ilość miejsc
                        </th>
                  
                       
                            
                            {this.state.Auth &&
                                    (
                                    <th>
                                Narzędzia
                                </th>

                                    )
                            }
                   
                    </tr>
                </thead>
                <tbody>
                  {
  
                    this.state.flightsData.map((item)=>{
                        return(
                            <tr>
                                <td>
                                    {item.id}
                                </td>
                                <td>
                                    {item.airline}
                                </td>
                                <td>
                                    {item.departure}
                                </td>
                                <td>
                                    {item.destination}
                                </td>
                                <td>
                                    {item.availableSeats}
                                </td>
                                {this.state.Auth &&
                                  <td>
                                    
                                  <Link to={`/edit/`}>
                                      <Button onClick={() => this.handleEdit(item.id)} >Edytuj</Button>
                                  </Link>
                                  
                                  
                                  &nbsp;
                                  <Button onClick={() => this.handleDelete(item.id)} >Usuń</Button>
                              </td>
                                }
                
                            </tr>
                        )
                    })
                  }
                </tbody>
            </Table>
            <br>
            </br>
            {this.state.Auth &&
                                    (
                                        
                                    
                                 <Link className='d-grid gap-2' to="/create">
                <Button size="lg">Dodaj Nowy Lot</Button>
            </Link>
      

                                    )
                            }
           
        </div>
    </Fragment>
        )
    }


}

export default Flights;
