const pool = require("../config/database");
const bodyParser = require("body-parser");
const { application } = require("express");

module.exports = {
  
  //create
  postTicket: (req, res) => {
    if(req.session.user != null){
      pool.query(
        `insert into tickets (
          id,
          userId,
          flightId,
          seats,
          zone)
          values (DEFAULT, ?, ?, ?, ?)`,
      [req.body.userId,
      req.body.flightId,
      req.body.seats,
      req.body.zone],
        (error, results, fields) => {
          if (error) {
            console.log("Error in postTicket");
            res.status(500).send(error);
          }
          else{
            console.log("Added ticket with id: " + req.body.userId);
            res.send(results);
          }
        }
      );
    }else{
      console.log("User not logged in, ticket not added");
      res.send(null);
    }
  },
  //read
  getTicketById: (req, res) => {
    pool.query(
      `select * from tickets where id = ?`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          console.log("Error in getTicketById");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("Can't find ticket with id: " + req.params.id);
          res.status(500).send("Can't find ticket with id: " + req.params.id);
        }
        else{
          console.log("Got ticket with id: " + req.params.id);
          res.send(results);
        }
      }
    );    
  },
  getAllTickets: (req, res) => {
    pool.query(
      `select * from tickets`,
      (error, results, fields) => {
        if (error) {
          console.log("Error in getAllTickets");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("No tickets found");
          res.status(500).send("No tickets found");
        }
        else{
          console.log("Got all tickets");
          res.send(results);
        }
      }
    );    
  },
  getTicketsByUser: (req, res) => {
    pool.query(
      `select * from tickets where userId = ?`,
      [req.params.userId],
      (error, results, fields) => {
        if (error) {
          console.log("Error in getTicketsByUser");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("No tickets found for userId: " + req.params.userId);
          res.status(500).send("No tickets found for userId: " + req.params.userId);
        }
        else{
          console.log("Got tickets for userId: " + req.params.userId);
          res.status(200).send(results);
        }
      }
    );    
  },
  getTicketsByFlight: (req, res) => {
    pool.query(
      `select * from tickets where flightId = ?`,
      [req.params.flightId],
      (error, results, fields) => {
        if (error) {
          console.log("Error in getTicketsByUser");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("No tickets found for userId: " + req.params.userId);
          res.status(500).send("No tickets found for userId: " + req.params.userId);
        }
        else{
          console.log("Got tickets for userId: " + req.params.userId);
          res.status(200).send(results);
        }
      }
    );    
  },
  getTicketWithFlightInfo:(req,res)=>{
    pool.query(
      `select t.id,
      t.userId,
      t.flightId,
      t.seats,
      t.zone,
      f.airline,
      f.departure,
      f.destination from tickets t inner join flights f on f.id=t.flightId where t.userId = ?`,
      [req.params.userId],
      (error, results, fields) => {
        if (error) {
          console.log("Error in getTicketsByFlight");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("No tickets found for userId: " + req.params.flightId);
          res.status(500).send("No tickets found for flightId: " + req.params.flightId);
        }
        else{
          console.log("Got tickets for flightId: " + req.params.flightId);
          res.send(results);
        }
      }
    );    
  },
  
  //update
  //remove
  deleteTicketById: (req, res) => {
    pool.query(
      `delete from tickets where id = ?`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          console.log("Error in deleteTicketById");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("Can't find ticket with id: " + req.params.id);
          res.status(500).send("Can't find ticket with id: " + req.params.id);
        }
        else{
          console.log("Deleted ticket with id: " + req.params.id);
          res.status(200).send();
        }
      }
    );    
  },
  deleteTicketsByUser: (req, res) => {
    pool.query(
      `delete from tickets where userId = ?`,
      [req.params.userId],
      (error, results, fields) => {
        if (error) {
          console.log("Error in deleteTicketsByUser");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("No tickets found for userId: " + req.params.userId);
          res.status(500).send("No tickets found for userId: " + req.params.userId);
        }
        else{
          console.log("Deleted tickets for userId: " + req.params.userId);
          res.send(results);
        }
      }
    );    
  },
  deleteTicketsByFlight: (req, res) => {
    pool.query(
      `delete from tickets where flightId = ?`,
      [req.params.flightId],
      (error, results, fields) => {
        if (error) {
          console.log("Error in deleteTicketsByFlight");
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("No tickets found for flightId: " + req.params.flightId);
          res.status(500).send("No tickets found for flightId: " + req.params.flightId);
        }
        else{
          console.log("Deleted tickets for flightId: " + req.params.flightId);
          res.send(results);
        }
      }
    );    
  },
}