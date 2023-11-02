const pool = require("../config/database");
const bodyParser = require('body-parser');
const { application } = require("express");

module.exports = {
    getOrders: (req, res) => {
        pool.query(
            `select * from Orders`,
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
    getOrdersById: (req, res) => {
        pool.query(
            `select * from Orders
            WHERE id_ticket = ? AND
                id_asortyment = ?`,
            [req.params.id_ticket, req.params.id_asortyment],
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
    postOrder: (req, res) => {
        
        pool.query(
            `insert into articles(id_ticket, id_asortyment, amount) 
                values(?, ?, ?)`,
            [
              req.body.id_ticket,
              req.body.id_asortyment,
              req.body.amount
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
    putOrdersById: (req, res) => {
        
      pool.query(
          `UPDATE Orders
          SET
          amount = ?
          WHERE id_ticket = ? AND
          id_asortyment = ?`,
          [
            req.body.amount,
            req.params.id_ticket,
            req.params.id_asortyment
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
    deleteOrdersById: (req, res) => {
        
        pool.query(
            `delete from articles WHERE id_ticket = ?
                AND id_asortyment = ?`,
            [
              req.params.id_ticket,
              req.params.id_asortyment,
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
    createOrders: (req, res) => {
        pool.query(
            `create table Orders(
                id_ticket int NOT NULL REFERENCES Tickets(id_ticket),
                id_asortyment int NOT NULL REFERENCES asortyment_bar(id_asortymentu),
                amount int NOT NULL,
                PRIMARY KEY (id_ticket, id_asortyment)
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