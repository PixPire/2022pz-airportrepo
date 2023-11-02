import {Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import React from 'react';

import Home from "../routes/Home"

import Login from '../routes/LoginAndRegistry/Login';
import Registry from "../routes/LoginAndRegistry/Registry";
import UserPage from "../routes/UserPage";

import Worker from '../routes/Worker/Worker';
import Pilot from "../routes/Worker/Pilot";
import Admin from "../routes/Worker/Admin";

import Client from '../routes/Client/Client';
import Flights from "../routes/Client/Flights";
import ReserveTickets from '../routes/Client/ReserveTickets';

import Info from '../routes/Info/Info';
import AboutUs from '../routes/Info/AboutUs';
import AboutAirport from '../routes/Info/AboutAirport';
import Faq from "../routes/Info/Faq";

import Edit from '../components/Edit';
import ArticlesEditor from '../components/ArticlesEditor';
import Add from '../components/Add';
import Assortment from '../routes/Bar/Assortment';
import AssortmentAdd from '../routes/Bar/AssortmentAdd';
import AssortmentEdit from '../routes/Bar/AssortmentEdit';
import Logout from '../routes/LoginAndRegistry/Logout';
import ShoppingCart from '../routes/Bar/ShoppingCart';
import RoleNotifier from '../RoleNotifier';

axios.defaults.withCredentials = true;

class App extends React.Component
{
  constructor(props) {
        super(props);
        RoleNotifier.register(this);
    }

  state = {
    drawIndex : null,
    articles : [],
    article_body : "",
    role: null
}

notifyRoleChanged(){
  console.log("Called App.notifyRoleChanged()");
  this.setState({role: Cookies.get('role')});
}

  render(){
    return (
      <>
        <Routes>
          <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />

            <Route path="client" element={<Client />} />
            <Route path="flights" element={<Flights />} />
            <Route path="reserveTickets" element={<ReserveTickets/>} />
            
            <Route path="worker" element={<Worker />} />
            <Route path="pilot" element={<Pilot />} />
            <Route path="admin" element={<Admin />}/>

            <Route path="info" element={<Info />} />
            <Route path="about-us" element={<AboutUs />} />
            <Route path="about-airport" element={<AboutAirport />} />
            <Route path="faq" element={<Faq />} />

            <Route path="logout" element={<Logout />} />
            <Route path="login" element={<Login />} />
            <Route path="user-data" element={<UserPage />} />
            <Route path="registry" element={<Registry />} />

            <Route path="articleEditor" element={<ArticlesEditor/>}/>
            <Route path="assortment" element={<Assortment/>}/>
            <Route path="assortmentAdd" element={<AssortmentAdd/>}/>
            <Route path="assortmentEdit" element={<AssortmentEdit/>}/>
            <Route path="shoppingCart" element={<ShoppingCart/>}/>
            <Route path="create" element={<Add/>}/>
            <Route path="edit" element={<Edit/>}/>
            <Route path="*" element={<p>Not found!</p>} />
          </Route>
        </Routes>
        <footer>
          <a href="/faq">FAQ</a>
          <a href="/about-us">About us</a>
        </footer>
      </>
    );
  }
};

export default App;