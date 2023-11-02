const pool = require("../config/database")

module.exports={
    getFlightData:(req,res)=>{
        pool.query(
            `select id, airline, departure, destination, availableSeats from flights`,
            [req.params.id],
            (error, results)=>{
              if(error){
                console.log('getFlightData failed')
                res.send(error)
              }
              else{
                console.log("getFlightData success")
                res.send(results);
              }
            }
        )
    },
    getFlightDataId:(req,res)=>{
        pool.query(
            `select id, airline, departure, destination, availableSeats from flights where id = ?`,
            [req.params.id],
            (error, results)=>{
              if(error){
                console.log('getFlightDataId failed')
                res.send(error)
              }
              else{
                console.log("getFlightDataId success")
                res.json({
                  id: results[0].id,
                  airline: results[0].airline,
                  departure: results[0].departure,
                  destination: results[0].destination,
                  availableSeats: results[0].availableSeats
              });
              }
            }
        )
    },
    getDestinations:(req,res)=>{
        pool.query(
            `select distinct destination from flights`,
            (error, results)=>{
              if(error){
                console.log('getDestinations failed')
                res.send(error)
              }
              else{
                console.log("getDestinations success")
                res.send(results);
              }
            }
        )
    },
    getSearchedFlights:(req,res)=>{
        pool.query(
            `select * from flights
            where date(departure) = ?
            and destination = ?`,
            [req.body.departure,
              req.body.destination],
            (error, results)=>{
              
              if(error){
                console.log('getSearchedFlights failed')
                res.send(error)
              }
              else{
                console.log("getSearchedFlights success")
                
                res.status(200).send(results);
              }
            }
        )
    },
    getSearchedFlightsByDate:(req,res)=>{
      pool.query(
          `select * from flights
          where date(departure) = ?
          `,
          [req.body.departure,
            ],
          (error, results)=>{
            
            if(error){
              console.log('getSearchedFlightsByDate failed')
              res.send(error)
            }
            else{
              console.log("getSearchedFlightsByDate success")
              
              res.status(200).send(results);
            }
          }
      )
  },
  getSearchedFlightsByDestination:(req,res)=>{
    pool.query(
        `select * from flights
        where destination = ?`,
        [req.body.destination],
        (error, results)=>{
          
          if(error){
            console.log('getSearchedFlightsByDestination failed')
            res.send(error)
          }
          else{
            console.log("getSearchedFlightsByDestination success")
            
            res.status(200).send(results);
          }
        }
    )
},
    postFlightData:(req,res)=>{
        pool.query(
            `insert into flights (id, airline, departure, destination, availableSeats) values(DEFAULT,?,?,?,?)`,
            [req.body.airline,
            req.body.departure,
            req.body.destination,
            req.body.availableSeats],
            (error)=>{
              if(error){
                console.log('postFlightData failed')
                res.status(500).send(error)
              }
              else{
                console.log("postFlightData success")
                res.status(201).send(req.body)
              }
            }
        )
    },
    putFlightDataId:(req,res)=>{
        pool.query(
            `update flights set airline = ?, departure = ?, destination = ?, availableSeats = ? where id = ?`,
            [req.body.airline, req.body.departure, req.body.destination, req.body.availableSeats, req.params.id],
            (error, results)=>{
              if(error){
                console.log('putFlightDataId failed')
                res.status(500).send(error)
              }
              else if (results == null){
                console.log('putFlightDataId failed, data with id ' + req.params.id + ' not found')
                res.status(500).send('putFlightDataId failed, data with id ' + req.params.id + ' not found')
              }
              else{
                console.log('Successfully wrote to data with id ' + req.params.id)
                res.status(201).send(req.body)
              }
            }
        )
    },
    UpdateSeatsById:(req,res)=>{
        pool.query(
          `update flights
          set availableSeats = availableSeats + ?
          where id = ?`,
            [req.body.seatsDifference, req.params.id],
            (error, results)=>{
              if(error){
                console.log([req.body.seatsDifference, req.params.id])
                res.status(500).send(error)
              }
              else if (results == null){
                console.log('UpdateSeats failed, data with id ' + req.params.id + ' not found')
                res.status(500).send('UpdateSeats failed, data with id ' + req.params.id + ' not found')
              }
              else{
                console.log('Successfully updated data with id ' + req.params.id)
                res.status(201).send(req.body)
              }
            }
        )
    },
    

    deleteFlightDataId: (req, res) => {
        pool.query(
            `delete from flights where id = ?`,
            [req.params.id],
            (error, results)=>{
              if (error) {
                console.log('deleteFlightDataId failed')
                res.status(500).send(error)
              }
              else if (results == null){
                console.log('deleteFlightDataId failed, data with id ' + req.params.id + ' not found')
                res.status(500).send('deleteFlightDataId failed, data with id ' + req.params.id + ' not found')
              }
              else{
                console.log('Successfully deleted data with id ' + req.params.id)
                res.status(204).send()
              }
            }
        )
    }
}