require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bodyParser = require('body-parser');
const todo=require('./router/user')
const app = express();


app.use(bodyParser.urlencoded({
     extended: true
   }));

app.use(express.json());
app.use('/',todo)

module.exports = app;
