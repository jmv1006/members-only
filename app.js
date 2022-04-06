const express = require("express");
const app = express();
require('dotenv').config()

var mongoose = require('mongoose');
var mongoDB = process.env.DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000, () => console.log('app listening on port 3000!'));

app.set("views", __dirname);
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    res.send('Works!')
});