const pool = require("../config/database");
const bodyParser = require('body-parser');
const { application } = require("express");

module.exports = {
    getPlanes: (req, res) => {
        pool.query(
            `select * from Planes`,
            [],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    getPlanesById: (req, res) => {
        pool.query(
            `select * from Tickets
            WHERE id_samolotu = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    postPlane: (req, res) => {
        
        pool.query(
            `insert into Planes(
                id_samolotu, 
                id_pilota, 
                model,
                I_miejsc
                )
                values(?, ?, ?, ?)`,
            [
                req.body.id_samolotu, 
                req.body.id_pilota, 
                req.body.model,
                req.body.I_miejsc
            ],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    putPlanesById: (req, res) => {
        
        pool.query(
            `insert into Planes( 
                id_pilota = ?, 
                model = ?
                I_miejsc = ?
                WHERE id_samolotu = ?`,
            [ 
                req.body.id_pilota, 
                req.body.model,
                req.body.I_miejsc,
                req.body.id
            ],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    deletePlanesById: (req, res) => {
        
        pool.query(
            `delete from Planes WHERE id_samolotu = ?`,
            [
              req.params.id_samolotu
            ],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    },
    createPlanes: (req, res) => {
        pool.query(
            `create table Planes(
                id_samolotu int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                id_pilota int NOT NULL REFERENCES Pilots(id_pilot),
                model varchar(20),
                I_miejsc int
                )`,
            [],
            (error, results, fields) => {
              if (error) {
                res.send(error);
              }
              else{
                res.send(results);
              }
            }
          );
    }
}