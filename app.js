/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * OBJETIVO:        API responsável pela manipulação de dados de Back-End (GET, PUT, POST, DELETE)
 * AUTOR:           Miguel Antonio
 * DATA_CRIAÇÃO:    01/12/2022
 * VERSÃO:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('./modulo/config.js');
const e = require('express');

const app = express();

app.use((request, response, next) => {
    response.header ('AccesS-Control-Allow-Origin', '*');
    response.header ('AccesS-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

const jsonParser = bodyParser.json();

app.get('/v1/pizza', cors(), async function(request, response){
    let statusCode;
    let message;
});






