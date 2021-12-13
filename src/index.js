const express = require("express");
const {
    body
} = require("express-validator");
const {register, login} = require("./controllers/auth.controller");
const Moviecontroller = require("./controllers/movies.controller");
const seatscontroller = require("./controllers/seats.controller");
const showscontroller = require("./controllers/shows.controller");
const screencontroller = require("./controllers/screen.controller");
const theatrecontroller = require("./controllers/theatre.controller");
const app = express();


app.use(express.json());


app.post("/signup",register);
app.post("/signin",login);
app.use("/movie", Moviecontroller)
app.use("/seat", seatscontroller) 
app.use("/show", showscontroller)
app.use("/screen", screencontroller)
 app.use("/theatre", theatrecontroller)
module.exports = app;