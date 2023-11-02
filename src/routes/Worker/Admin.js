import React, { useContext,useEffect } from "react";
// import flights from "../../adminComponents/exampleFlights.json";
import RenderTable from "../../adminComponents/renderTable";
import { getAwarie, getOpoznienia, getPiloci, addPilot} from "../../api/PilotApi";
import Cookies from 'js-cookie';
import * as UserApi from "../../api/UserApi";

class Admin extends React.Component{
    constructor(props) {
        super(props);
        let role = Cookies.get('role');
        let AuthWord = true;
        if(role!="admin")
        {
            AuthWord=false;
        }
        this.state = {
            Auth:AuthWord,
            awarieData: [],
            opoznieniaData: [],
            userList: [],
        
            roleFilter: "all",
        
            showUserEdit: false,
            creatingNewUser: false,
            userObject: ""
        };
      }
    componentDidMount() {
        getAwarie().then(response=>{this.setState({awarieData:response})});
        getOpoznienia().then(response=>{this.setState({opoznieniaData:response})});
        //getPiloci().then(response=>{this.setState({pilociData:response})});
        this.Refresh();
     
    }
    Refresh=()=>{
        UserApi.getUsersByRole(this.state.roleFilter).then(results => {
            this.setState({userList: results});
        });
    }
    DeleteUser=(userObject)=>{
        if(window.confirm(`Czy na pewno chcesz usunąć użytkownika o id = ${userObject.id} ?`)== true)
        {
            UserApi.deleteUser(userObject.id).then(results => {
                alert(`Usunieto użytkownika o id = ${userObject.id}`);
                this.Refresh();
            });
        }   
    }
    EditUser=(userObject)=>{
        this.setState({showUserEdit: !this.state.showUserEdit, userObject: userObject, creatingNewUser: false});
    }
    SendUser=()=>{
        let userBody = {
            login:this.state.userObject.login,
            password:this.state.userObject.password,
            name:this.state.userObject.name,
            surname:this.state.userObject.surname,
            email:this.state.userObject.email,
            phone:this.state.userObject.phone,
            passport:this.state.userObject.passport
        };

        if (this.state.creatingNewUser){
            UserApi.addUser(userBody).then( results => {
                if (results.status != 201){
                    alert("Stworzenie uzytkownika nie powiodlo sie");
                }
                else{
                    this.Refresh();
                }
            });
        }
        else{
            UserApi.editUser(this.state.userObject.id, userBody).then( results => {
                if (results.status != 201){
                    alert("Aktualizacja danych uzytkownika nie powiodla sie");
                }
                else{
                    this.Refresh();
                }
            });
        }

        this.setState({showUserEdit: false, creatingNewUser: false});
    }


    render(){
        if(this.state.Auth==false)
        {
            return("Musisz być zalogowany jako admin");
        }
        else
        {
            return (
                <>
                    <h1>Panel administratora</h1>
                    {/* <h1>Loty</h1>
                    <RenderTable data={flights} column={columnFlights}></RenderTable> */}
                    <h1>Awarie</h1>
                    <RenderTable data={Array.from(this.state.awarieData)} column={Array.from(columnAwarie)}></RenderTable>
                    <h1>Opóźnienia</h1>
                    <RenderTable data={Array.from(this.state.opoznieniaData)} column={Array.from(columnOpoznienia)}></RenderTable>
                    <h1 style={{display: 'inline-block'}}>Użytkownicy</h1>
                    <button onClick={() => {this.setState({showUserEdit: !this.state.showUserEdit, userObject: {
                                                                                                    id:null,
                                                                                                    login:null,
                                                                                                    password:null,
                                                                                                    name:null,
                                                                                                    surname:null,
                                                                                                    email:null,
                                                                                                    phone:null,
                                                                                                    passport:null
                                                                                                },
                                                            creatingNewUser: !this.state.showUserEdit});
                                            }} 
                                    style={{display: 'inline-block'}}>Dodaj</button>
                    <button onClick={this.Refresh} style={{display: 'inline-block'}}>Odśwież</button>
                    <input value={this.state.roleFilter} onChange={(e) => {this.setState({roleFilter: e.target.value})}}/>
                    <RenderTable data={Array.from(this.state.userList)} column={Array.from(columnUsers)} onClick1={this.EditUser} onClick2={this.DeleteUser}></RenderTable>

                    {this.state.showUserEdit && (<div style={{"max-width": "900px", align: "center", margin: "auto"}}>
                    <table>
                    <tbody>
                        <tr><td>Login</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.login} onChange={(e) => {this.state.userObject.login = e.target.value}}/></td></tr>
                        <tr><td>Password</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.password} onChange={(e) => {this.state.userObject.password = e.target.value}}/></td></tr>
                        <tr><td>Role</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.role} onChange={(e) => {this.state.userObject.role = e.target.value}}/></td></tr>
                        <tr><td>Name</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.name} onChange={(e) => {this.state.userObject.name = e.target.value}}/></td></tr>
                        <tr><td>Surname</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.surname} onChange={(e) => {this.state.userObject.surname = e.target.value}}/></td></tr>
                        <tr><td>Email</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.email} onChange={(e) => {this.state.userObject.email = e.target.value}}/></td></tr>
                        <tr><td>Phone</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.phone} onChange={(e) => {this.state.userObject.phone = e.target.value}}/></td></tr>
                        <tr><td>Passport</td> <td><input style={{width: "100%"}} type="text" defaultValue={this.state.userObject.passport} onChange={(e) => {this.state.userObject.passport = e.target.value}}/></td></tr>
                    </tbody>
                    </table>
                    <button style={{display: "inline-block", float: "right"}} onClick={this.SendUser}>Apply</button>
                    <button style={{display: "inline-block", float: "right"}} onClick={() => {this.setState({showUserEdit: false, creatingNewUser: false})}}>Cancel</button>
                    </div>
                    )}
                </>
            );
        }
        
        
    }
    
}
export default Admin;




// const columnFlights =[
//     {heading: "Id",value:"id"},
//     {heading: "From",value:"From"},
//     {heading: "To",value:"To"}
// ]

const columnAwarie =[
    {heading: "Id",value:"id"},
    {heading: "Stopień",value:"stopien"},
    {heading: "Rodzaj",value:"rodzaj"},
    {heading: "Opis",value:"opis"}
]

const columnOpoznienia =[
    {heading: "Id",value:"id"},
    {heading: "Przyczyna",value:"przyczyna"},
    {heading: "Ilość godzin",value:"ilosc_godzin"},
    {heading: "Ilość minut",value:"ilosc_minut"},
    {heading: "Opis",value:"opis"}
]

const columnUsers =[
    {heading: "Id",value:"id"},
    {heading: "Login",value:"login"},
    {heading: "Password",value:"password"},
    {heading: "Role",value:"role"},
    {heading: "Name",value:"name"},
    {heading: "Surname",value:"surname"},
    {heading: "Email",value:"email"},
    {heading: "Phone",value:"phone"},
    {heading: "Passport",value:"passport"},
]