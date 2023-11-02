
const pool = require("../config/database");
const bodyParser = require('body-parser');
const { application } = require("express");
const { check, validationResult } = require('express-validator');

module.exports = {
    getAsortyment: (req, res) => {
        pool.query(
            `select * from asortyment_bar`,
            [],
            (error, results, fields) => {
              if (error) {
                console.log('getAsortyment failed');
                res.send(error);
              }
              else{
                console.log("getAsortyment ok");
                res.json({
                    results 
                });
              }
            }
        );
    },
    getAsortymentId: (req, res) => {
        pool.query(
            `select * from asortyment_bar where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('getAsortyment failed');
                res.send(error);
              }
              else{
                console.log('getAsortyment ok');
                res.json({
                    id: results[0],
                    nazwa: results[1],
                    cena:results[2],
                    image:results[3]
                });
              }
            }
        );
      
    },
    postAsortyment: (req, res) => {
        pool.query(
            `insert into asortyment_bar (id, nazwa,cena,image) values(DEFAULT, ?, ?, ?)`,
            [req.body.nazwa,req.body.cena,req.body.image],
            (error, results, fields) => {
              if (error) {
                console.log('postAsortyment failed');
                res.status(500).send(error);
              }
              else{
                console.log("postAsortyment ok");
                res.status(201).send(req.body);
              }
            }
        );
    },
    putAsortymentId: (req, res) => {
        pool.query(
            `update asortyment_bar set nazwa = ?,cena=?,image=? where id = ?`,
            [req.body.nazwa,req.body.cena,req.body.image,req.body.id],
            (error, results, fields) => {
              if (error) {
                console.log('putAsortymentId failed');
                res.status(500).send(error);
              }
              else if (results == null){
                console.log('putAsortymentId failed, data with id ' + req.params.id + ' not found');
                res.status(500).send('putAsortymentId failed, data with id ' + req.params.id + ' not found');
              }
              else{
                console.log('Successfully wrote to putAsortymentId with id ' + req.params.id);
                res.status(200).send(req.body);
              }
            }
        );
    },
    deleteAsortymentId: (req, res) => {
        pool.query(
            `delete from asortyment_bar where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('deleteAsortymentId failed');
                res.status(500).send(error);
              }
              else if (results == null){
                console.log('deleteAsortymentId failed, data with id ' + req.params.id + ' not found');
                res.status(500).send('deleteAsortymentId failed, data with id ' + req.params.id + ' not found');
              }
              else{
                console.log('Successfully deleted deleteAsortymentId with id ' + req.params.id);
                res.status(204).send();
              }
            }
        );
    },
    
}