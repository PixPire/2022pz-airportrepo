const pool = require("../config/database");
const bodyParser = require('body-parser');

module.exports = {
  getAwariaId: (req, res) => {
    pool.query(
        `select id, stopien,rodzaj,opis from awarie where id = ?`,
        [req.params.id],
        (error, results, fields) => {
          if (error) {
            console.log('getAwariaId failed');
            res.send(error);
          }
          else{
            console.log("getAwariaId ok");
            res.json({
                id: results[0].id,
                stopien: results[0].stopien,
                rodzaj: results[0].rodzaj,
                opis: results[0].opis
            });
          }
        }
    ); 
},
getOpoznienieId: (req, res) => {
  pool.query(
      `select id,przyczyna,ilosc_godzin,ilosc_minut,opis from opoznienia where id = ?`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          console.log('getOpoznienieId failed');
          res.send(error);
        }
        else{
          console.log("getOpoznienieId ok");
          res.json({
              id: results[0].id,
              przyczyna: results[0].stopien,
              ilosc_godzin: results[0].rodzaj,
              ilosc_minut: results[0].opis,
              opis:results[0].opis
          });
        }
      }
  );
},
getAwarie: (req, res) => {
  pool.query(
      `select id, stopien,rodzaj,opis from awarie`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          console.log('getAwarie failed');
          res.send(error);
        }
        else{
          console.log("getAwarie ok");
          res.send(
            results
          );
        }
      }
  ); 
},
getOpoznienia: (req, res) => {
  pool.query(
      `select id, przyczyna,ilosc_godzin,ilosc_minut,opis from opoznienia`,
      [req.params.id],
      (error, results, fields) => {
        if (error) {
          console.log('getOpoznienia failed');
          res.send(error);
        }
        else{
          console.log("getOpoznienia ok");
          res.send(
            results
          );
        }
      }
  ); 
},
    postNewAwaria: (req, res) => {
        pool.query(
            `insert into awarie (
                id,
                stopien,
                rodzaj,
                opis)
                values (DEFAULT, ?, ?, ?)`,
            [req.body.stopienAwarii,
             req.body.rodzajAwarii,
             req.body.opisAwarii],
            (error, results, fields) => 
            {
              if (error) {
                console.log('postNewAwaria failed');
                res.status(500).send(error);
              }
              else{
                res.status(201).send(req.body);
                console.log('Successfully added new awaria with id:' + 'unknown');
              }
            }
        );  
    },
    postNewOpoznienie: (req, res) => {
        
      pool.query(
          `insert into opoznienia (
              id,
              przyczyna,
              ilosc_godzin,
              ilosc_minut,
              opis)
              values (DEFAULT, ?, ?, ?,?)`,
          [req.body.przyczynaOpoznienia,
           req.body.godzinaOpoznienia,
           req.body.minutaOpoznienia,
           req.body.opisOpoznienia],
          (error, results, fields) => 
          {
            if (error) {
              console.log('postNewOpoznienie failed');
              res.status(500).send(error);
            }
            else{
              res.status(201).send(req.body);
              console.log('Successfully added new opoznienie with id: '+req.body.id);
            }
          }
      );  
  },
    editOpoznienieId: (req, res) => {
        pool.query(
            `update opoznienia set
             przyczyna = ?,
             ilosc_godzin=?,
             ilosc_minut = ?,
             opis = ?
             where id = ?`,
            [
             req.body.przyczynaOpoznienia,
             req.body.godzinaOpoznienia,
             req.body.minutaOpoznienia,
             req.body.opisOpoznienia,
             req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in PUT /opoznienie/' + req.params.id, error);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("Opoznienie with id "+req.params.id+ "  not found" )
                res.status(500).send("Opoznienie with id "+req.params.id+ "not found" )
              }
              else{
                res.status(201).send(req.body);
                console.log('Successfully edited opoznienie with id = ' + req.params.id);
              }
            }
        ); 
    },
    deleteAwariaId: (req, res) => {
      pool.query(
            `delete from awarie where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in DELETE /awaria/' + req.params.id, err);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("awaria with id "+req.params.id+ " not found" )
                res.status(500).send("awaria with id "+req.params.id+ "not found" )
              }
              else{
                res.status(204).send();
                console.log('Successfully deleted awaria with id = ' + req.params.id);
              }
            }
      ); 
    },
    deleteOpoznienieId: (req, res) => {
      pool.query(
            `delete from opoznienia where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in DELETE /opoznienie/' + req.params.id, error);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("opoznienie with id "+req.params.id+ " not found" )
                res.status(500).send("opoznienie with id "+req.params.id+ "not found" )
              }
              else{
                res.status(204).send();
                console.log('Successfully deleted opoznienie with id = ' + req.params.id);
              }
            }
      ); 
    },
    putOpoznienieId: (req, res) => {
      pool.query(
          `update opoznienia set data = ? where id = ?`,
          [req.body.dane, req.params.id],
          (error, results, fields) => {
            if (error) {
              console.log('putDataId failed');
              res.status(500).send(error);
            }
            else if (results == null){
              console.log('putDataId failed, data with id ' + req.params.id + ' not found');
              res.status(500).send('putDataId failed, data with id ' + req.params.id + ' not found');
            }
            else{
              console.log('Successfully wrote to data with id ' + req.params.id);
              res.status(200).send(req.body);
            }
          }
      );
  },
  editAwariaId: (req, res) => {
        pool.query(
            `update awarie set
             stopien = ?,
             rodzaj = ?,
             opis = ?
             where id = ?`,
            [
             req.body.stopienAwarii,
             req.body.rodzajAwarii,
             req.body.opisAwarii,
             req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in PUT /awaria/' + req.params.id, error);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("Awaria with id "+req.params.id+ "  not found" )
                res.status(500).send("Awaria with id "+req.params.id+ "not found" )
              }
              else{
                res.status(201).send(req.body);
                console.log('Successfully edited awaria with id = ' + req.params.id);
              }
            }
        ); 
    },
    editOpoznienieId: (req, res) => {
      pool.query(
          `update opoznienia set
           przyczyna = ?,
           ilosc_godzin=?,
           ilosc_minut = ?,
           opis = ?
           where id = ?`,
          [
           req.body.przyczynaOpoznienia,
           req.body.godzinaOpoznienia,
           req.body.minutaOpoznienia,
           req.body.opisOpoznienia,
           req.params.id],
          (error, results, fields) => {
            if (error) {
              console.log('Error in PUT /opoznienie/' + req.params.id, error);
              res.status(500).send(error);
            }
            else if (results == null){
              console.log("Opoznienie with id "+req.params.id+ "  not found" )
              res.status(500).send("Opoznienie with id "+req.params.id+ "not found" )
            }
            else{
              res.status(201).send(req.body);
              console.log('Successfully edited opoznienie with id = ' + req.params.id);
            }
          }
      ); 
  },
    
    deleteAwariaId: (req, res) => {
      pool.query(
            `delete from awarie where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in DELETE /awaria/' + req.params.id, err);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("awaria with id "+req.params.id+ " not found" )
                res.status(500).send("awaria with id "+req.params.id+ "not found" )
              }
              else{
                res.status(204).send();
                console.log('Successfully deleted awaria with id = ' + req.params.id);
              }
            }
      ); 
    },
    deleteOpoznienieId: (req, res) => {
      pool.query(
            `delete from opoznienia where id = ?`,
            [req.params.id],
            (error, results, fields) => {
              if (error) {
                console.log('Error in DELETE /opoznienie/' + req.params.id, error);
                res.status(500).send(error);
              }
              else if (results == null){
                console.log("opoznienie with id "+req.params.id+ " not found" )
                res.status(500).send("opoznienie with id "+req.params.id+ "not found" )
              }
              else{
                res.status(204).send();
                console.log('Successfully deleted opoznienie with id = ' + req.params.id);
              }
            }
      ); 
    },
    putOpoznienieId: (req, res) => {
      pool.query(
          `update opoznienia set data = ? where id = ?`,
          [req.body.dane, req.params.id],
          (error, results, fields) => {
            if (error) {
              console.log('putDataId failed');
              res.status(500).send(error);
            }
            else if (results == null){
              console.log('putDataId failed, data with id ' + req.params.id + ' not found');
              res.status(500).send('putDataId failed, data with id ' + req.params.id + ' not found');
            }
            else{
              console.log('Successfully wrote to data with id ' + req.params.id);
              res.status(200).send(req.body);
            }
          }
      );
  },
    createAwarie: (req, res) => {
        pool.query(
            `
            create table awarie(
                id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
                stopien varchar(20) NOT NULL,
                rodzaj varchar(20) NOT NULL,
                opis varchar(200)
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
    },

    createOpoznienia: (req, res) => {
      pool.query(
          `
          create table opoznienia(
              id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
              przyczyna varchar(50) NOT NULL,
              ilosc_godzin int NOT NULL,
              ilosc_minut int NOT NULL,
              opis varchar(200)
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
  },
  getPiloci: (req, res) => {
    pool.query(
        `select id, nr_licencji,imie,nazwisko from piloci`,
        [req.params.id],
        (error, results, fields) => {
          if (error) {
            console.log('getPiloci failed');
            res.send(error);
          }
          else{
            console.log("getPiloci ok");
            res.send(
              results
            );
          }
        }
    ); 
  },
  addPilot: (req, res) => {
      
    pool.query(
        `insert into piloci (
            id,
            nr_licencji,
            imie,
            nazwisko)
            values (DEFAULT, ?, ?, ?)`,
        [req.body.licencja,
        req.body.imie,
        req.body.nazwisko],
        (error, results, fields) => 
        {
          if (error) {
            console.log('addPilot failed');
            res.status(500).send(error);
          }
          else{
            res.status(201).send(req.body);
            console.log('Successfully added new pilot with id: ');
          }
        }
    );  
},

createPiloci: (req, res) => {
  pool.query(
      `
      create table piloci(
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
          nr_licencji int NOT NULL,
          imie varchar(50) NOT NULL,
          nazwisko varchar(50) NOT NULL
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
},
}