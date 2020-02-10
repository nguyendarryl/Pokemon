const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const users = require("./routes/api/users");
const User = require("./models/User");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');
const monsters = require('./routes/api/monsters');
const teams = require('./routes/api/teams');
const game = require('./routes/api/game');
const socket = require("socket.io");
// const server = require('http').server(app);



if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to mongoDB successfully"))
  .catch(err => console.log(err));

app.get("/", (req, res) => { res.send("Hello Monster World!")});

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {console.log(`Listening on port ${port} successfully`)});

//Routes
app.use("/api/users", users)
app.use("/api/monsters", monsters);
app.use("/api/teams", teams);
app.use("/api/game", game);

app.use(express.static(__dirname + '/public'));





