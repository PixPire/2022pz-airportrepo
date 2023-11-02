const pool = require("../config/database");
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');

module.exports = {
  getUserId: (req, res) => {
    pool.query(
      `select * from users where id = ?`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          console.log('getUser failed');
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("Can't find user with id: " + req.params.id);
          res.status(500).send("Can't find user with login: " + req.params.id);
        }
        else{
      
          res.status(200).send(results[0]);
        }
      }
    );    
  },
  getUsersWithRole: (req, res) => {

    let roleFilter = req.params.role;
    if (roleFilter == "all")
      roleFilter = "%";

    console.log("roleFilter: " + roleFilter);

    pool.query(
      `select * from users where role like (?)`,
      [roleFilter],
      (error, results, fields) => {
        if (error) {
          console.log('getUsersWithRole failed');
          res.status(500).send(error);
        }
        else if (results == null){
          console.log("Can't find user with role: " + req.params.role);
          res.status(500).send("Can't find user with role: " + req.params.role);
        }
        else{
          console.log("Results: ", results);
          res.status(200).send(results);
        }
      }
    );    
  },
    postUser: (req, res) => {
      pool.query(
        `select password, role, name, surname,id from users where login = ?`,
        [req.body.login],
        (error, results, fields) => {
          if (error) {
            console.log('postUser failed');
            res.status(500).send(error);
          }
          else if (results == null || results.length==0){
            console.log("Can't find user with login: " + req.body.login);
            res.status(205).send("Can't find user with login: " + req.body.login);
          }
          else{
            if (results[0].password == req.body.password){
                console.log("post /user/" + req.body.login);
                req.session.user = {id: results[0].id,
                                    login: req.body.login, 
                                    role: results[0].role, 
                                    name: results[0].name, 
                                    surname: results[0].surname
                                  };
                req.session.save();
                console.log("req.session in postUser:\nsession id: ");
                console.log(req.session.id);
                console.log(req.session);
                
                res.cookie('id',results[0].id, { maxAge: 3600000, httpOnly: false });
                res.cookie('role',results[0].role, { maxAge: 3600000, httpOnly: false }).status(200).send("Login and password accepted");
            }
            else{
                res.status(200).send("Wrong password");
            }
          }
        }
      );    
    },
    postNewUser: (req, res) => {
        pool.query(
            `insert into users (
                id,
                login,
                password,
                role,
                name,
                surname,
                email,
                phone,
                passport)
                values (DEFAULT, ?, ?, 'user', ?, ?, ?, ?, ?)`,
            [req.body.login,
             req.body.password,
             req.body.name,
             req.body.surname,
             req.body.email,
             req.body.phone,
             req.body.passport],
            (error, results, fields) => {
              if (error) {
                console.log('postNewUser failed');
                res.status(500).send(error);
              }
             
              
              else{
                
                res.status(201).send(req.body);
                console.log('Successfully added new data with login: ' + req.body.login);
              }
            }
        );  
    },
    putUserId: (req, res) => {
        pool.query(
            `update users set
             login = ?,
             password = ?,
             name = ?,
             surname = ?,
             email = ?,
             phone = ?,
             passport = ?
             where id = ?`,
            [req.body.login,
             req.body.password,
             req.body.name,
             req.body.surname,
             req.body.email,
             req.body.phone,
             req.body.passport,
             req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in PUT /user/' + req.params.id, error);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("User with id "+req.params.id+ "  not found" )
                res.status(500).send("User with id "+req.params.id+ "not found" )
              }
              else{
                res.status(201).send(req.body);
                console.log('Successfully edited data with id = ' + req.params.id);
                console.log(req.body);
              }
            }
        ); 
    },
    deleteUserId: (req, res) => {
      pool.query(
            `delete from users where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in DELETE /user/' + req.params.id, error);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("User with id "+req.params.id+ " not found" )
                res.status(500).send("User with id "+req.params.id+ "not found" )
              }
              else{
                res.status(204).send();
                console.log('Successfully deleted user with id = ' + req.params.id);
              }
            }
      ); 
    },
    logout: (req, res) => {
      req.session.destroy();
      res.clearCookie('role').send();
    }
}