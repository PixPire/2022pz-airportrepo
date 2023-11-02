const express=require("express");
const router = require("express").Router();
const bodyParser = require('body-parser');
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const {authUser, authRole} = require ("./UserAuthentication");
const mysql = require('mysql');
function clearFlightMinute() {
  var msToNext = 60000;

  setTimeout(function() {
      var con = mysql.createConnection({
        host: "34.118.104.101",
        port:"3306",
        user: "root",
        password: "gu&2?/+*)/:Xb'I=",
        database: "airport"
      });
      
      con.connect(function(err) {
        if (err) throw err;
        var date=new Date()
        date.setFullYear(date.getFullYear()-5)
               con.query("DELETE FROM flights WHERE departure<?",date, function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
        });
      });
      clearFlightMinute();
  }, msToNext);
  console.log("clear flight")
}
clearFlightMinute()
  

require("dotenv");

const app=express();
const {getArticles, postArticles, createArticles, getArticleThumbs, getArticleBody, getArticleThumbsWithFormData, getArticleTitles, getArticleThumbsNormally} = require("./articles/ArticlesController");
const { getUserId,postUser, postNewUser, putUserId, deleteUserId, logout, getUsersWithRole} = require("./user/UserController");
const {postNewAwaria,createAwarie,deleteAwariaId,getAwariaId,editAwariaId,getAwarie,getOpoznienia,editOpoznienieId,postNewOpoznienie,createOpoznienia,deleteOpoznienieId,getOpoznienieId,putOpoznienieId, getPiloci, addPilot, createPiloci}=require("./pilot/PilotController");
const {getAsortyment,getAsortymentId,postAsortyment,putAsortymentId,deleteAsortymentId}=require("./asortyment_bar/Asortyment_barController")
const {getOrders, getOrdersById, createOrders, postOrder, deleteOrdersById, putOrdersById} = require("./controllers/OrdersController");
const { getPlanes, getPlanesById, postPlane, deletePlanesById, createPlanes, putPlanesById } = require("./controllers/PlanesController");
const { postTicket, getTicketById, getAllTickets, getTicketsByUser, getTicketsByFlight,getTicketWithFlightInfo, deleteTicketById, deleteTicketsByUser, deleteTicketsByFlight} = require("./controllers/TicketsController");
const {getFlightData,getFlightDataId,postFlightData,deleteFlightDataId, putFlightDataId, getDestinations, getSearchedFlights,getSearchedFlightsByDate,getSearchedFlightsByDestination, UpdateSeatsById}=require("./controllers/FlightController");
const {getHarmonogramId}=require("./controllers/HarmonogramController");


const jsonParser = bodyParser.json({
  inflate: true,
  limit: '50mb',
    type: () => true, // this matches all content types
});


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.SESSION_MAX_AGE)
    }
}));

const sessionDebug = (req, res, next) => {
  console.log("Middleware call: \n")
  console.log("Session id: " + req.session.id);
  console.log(req.session);
  next();
};
//app.use(cookieParser);

const requireUser = (req, res, next) => {
  console.log("aaa");
  const { user } = req.session;
  if (!user) {
    return res.status(401).send('Unauthorized');
  }
  next();
};

//tickets
router.post("/tickets",jsonParser, postTicket);
router.get("/tickets",jsonParser, getAllTickets);
router.get("/tickets/:id",jsonParser, getTicketById);
router.get("/ticketsByUser/:userId",jsonParser, getTicketsByUser);
router.get("/tickets/:flightId",jsonParser, getTicketsByFlight);
router.get("/ticketsWithFlightInfo/:userId",jsonParser, getTicketWithFlightInfo);
router.delete("/ticketsId/:id",jsonParser, deleteTicketById);
router.delete("/tickets/:userId",jsonParser, deleteTicketsByUser);
router.delete("/tickets/:flightId",jsonParser, deleteTicketsByFlight);

//articles
router.get("/articles", getArticleThumbsNormally);
router.get("/articles/:id", getArticleBody);
router.post("/articles", jsonParser, postArticles);
router.post("/createArticles",jsonParser, createArticles);
//user
router.get('/user/:id', jsonParser, getUserId);
router.get('/user/role/:role', jsonParser, getUsersWithRole);
router.post('/user', sessionDebug, jsonParser, postUser);
router.post('/newuser', jsonParser, postNewUser);
router.post('/logout', sessionDebug, logout);
router.put('/user/:id', jsonParser, putUserId);
router.delete('/user/:id', jsonParser, deleteUserId);

//pilot_awarie
router.post("/createAwarie",jsonParser,createAwarie);
router.post('/awaria', jsonParser, postNewAwaria);
router.get("/awarie",jsonParser,getAwarie);
router.put("/awaria/:id",jsonParser,editAwariaId);
router.delete('/awaria/:id',jsonParser,deleteAwariaId);
router.get('/awaria/:id',jsonParser,getAwariaId);

//pilot_opoznienia
router.post("/createOpoznienia",jsonParser,createOpoznienia);
router.post('/opoznienie',jsonParser, postNewOpoznienie);
router.put("/opoznienie/:id",jsonParser,editOpoznienieId);
router.get("/opoznienia",jsonParser,getOpoznienia);
router.delete('/opoznienie/:id',jsonParser, deleteOpoznienieId);
router.get('/opoznienie/:id',jsonParser,getOpoznienieId);

//pilots
router.get("/piloci",jsonParser,getPiloci);
router.post("/pilot",jsonParser,addPilot);
router.post("/createPiloci",jsonParser,createPiloci);
router.get("/pilot",requireUser, (req,res)=>
{
  console.log("OK");
})

//flights
router.post("/flight",jsonParser,postFlightData)
router.get("/flight",jsonParser,getFlightData)
router.put("/flight/:id",jsonParser,putFlightDataId)
router.delete("/flight/:id",jsonParser,deleteFlightDataId)
router.get("/flight/:id",jsonParser,getFlightDataId)
router.get("/destinations",jsonParser,getDestinations)
router.post("/searchFlights",jsonParser,getSearchedFlights)
router.post("/searchFlightsByDate",jsonParser,getSearchedFlightsByDate)
router.post("/searchFlightsByDestination",jsonParser,getSearchedFlightsByDestination)
router.put("/updateSeats/:id",jsonParser,UpdateSeatsById)
//assortment
router.get("/asortyment",jsonParser,getAsortyment)
router.get("/asortyment/:id",jsonParser,getAsortymentId)
router.post("/asortyment",jsonParser,postAsortyment)
router.put("/asortyment/:id",jsonParser,putAsortymentId)
router.delete("/asortyment/:id",jsonParser,deleteAsortymentId)

//orders
router.get("/Orders",jsonParser, getOrders);
router.get("/Orders/:id_ticket/:id_asortyment",jsonParser, getOrdersById);
router.put("/Orders/:id_ticket/:id_asortyment",jsonParser, putOrdersById);
router.post("/Orders",jsonParser, postOrder);
router.delete("/Orders/:id_ticket/:id_asortyment",jsonParser, deleteOrdersById);
router.post("/createOrders",jsonParser, createOrders);

//planes
router.get("/Planes",jsonParser, getPlanes);
router.get("/Planes/:id",jsonParser, getPlanesById);
router.put("/Planes/:id",jsonParser, putPlanesById);
router.post("/Planes",jsonParser, postPlane);
router.delete("/Planes/:id",jsonParser, deletePlanesById);
router.post("/createPlanes",jsonParser, createPlanes);

//harmonogram
router.get("/harmonogram/:id",jsonParser, getHarmonogramId);

app.use(cors(
  {
    origin: true,
    credentials: true
  }
));
app.use(router);
app.listen(3333);
