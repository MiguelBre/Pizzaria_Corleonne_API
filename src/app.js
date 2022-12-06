/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * OBJETIVO:        API responsável pela manipulação de dados de Back-End (GET, PUT, POST, DELETE)
 * AUTOR:           Miguel Antonio
 * DATA_CRIAÇÃO:    01/12/2022
 * VERSÃO:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {MESSAGE_ERROR, MESSAGE_SUCCESS} = require('../modulo/config.js');
const e = require('express');

const app = express();

app.use((request, response, next) => {
    response.header ('AccesS-Control-Allow-Origin', '*');
    response.header ('AccesS-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

const jsonParser = bodyParser.json();

app.get('/.netlify/functions/api/v1/pizzas', cors(), async function(request, response){
    let statusCode;
    let message;

    const controllerPizza = require('../controller/controllerPizza.js');

    const pizzas = await controllerPizza.listarPizzas();

    if (pizzas) {
        statusCode = 200;
        message = pizzas;
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }

    response.status(statusCode);
    response.json(message);

});

app.get('/.netlify/functions/api/v1/pizza/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {

        //Import do arquivos controllerAluno
        const controllerPizza = require('../controller/controllerPizza.js');

        //Retorna todos os alunos existentes no BD
        const dadosPizza = await controllerPizza.buscarPizzaID(id);

        //Valida se existe retorno de dados
        if (dadosPizza) {
            //Status 200
            statusCode = 200;
            message = dadosPizza;
        } else {
            //Status 404
            statusCode = 404;
            message = MESSAGE_ERROR.NOT_FOUND_DB;
        }
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    // console.log(message)

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

app.post('/v1/pizza', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    //Recebe um tipo de content-type que foi enviado no header da requisição
        //application/json
    headerContentType = request.headers['content-type'];

    // console.log(headerContentType);

    //Validar se o content-type é do tipo application/json
    if (headerContentType == 'application/json') {
        //Recebe do corpo da mensagem o conteúdo 
        let dadosBody = request.body;

        //Realiza uma conversão de dados para conseguir comparar o json vazio
            //O comando transforma o JSON em String
        if (JSON.stringify(dadosBody) != '{}') {
            
            //Import do arquivo da controller de aluno
            const controllerPizza = require('../controller/controllerPizza.js');

            //Chama a função novoAluno da controller e encaminha os dados do Body
            const novaPizza = await controllerPizza.novaPizza(dadosBody);

                statusCode = novaPizza.status;
                message = novaPizza.message;

        } else {
            statusCode = 400;
            message = MESSAGE_ERROR.EMPTY_BODY;
        }



    } else {
        statsCode = 415;
        message = MESSAGE_ERROR.CONTENT_TYPE;
    }

    response.status(statusCode)
    response.json(message)

});




app.listen(8080, function(){
    console.log('Servidor aguardando requisições')
});





