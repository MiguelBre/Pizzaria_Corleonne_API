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
const http = require('http')
const swaggerUi = require('swagger-ui-express')


const app = express();

app.use((request, response, next) => {
    response.header ('AccesS-Control-Allow-Origin', '*');
    response.header ('AccesS-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    app.use(cors());
    next();
});

const jsonParser = bodyParser.json();

//      /.netlify/functions/api
app.get('/v1/pizzas', cors(), async function(request, response){
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

app.get('/v1/pizza/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {

        //Import do arquivos controllerProduto
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
            
            //Import do arquivo da controller de tamanho_pizza
            const controllerPizza = require('../controller/controllerPizza.js');

            //Chama a função novoProduto da controller e encaminha os dados do Body
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



// ====== END-POINTS DO TAMANHO DE PIZZAS =========

app.get('/v1/tamanhos_pizza', cors(), async function(request, response){

    let statusCode;
    let message;

    //Import do arquivos controllerTamanhoPizza
    const controllerTamanhoPizza = require('../controller/controllerTamanhoPizza.js');

    //Retorna todos os alunos existentes no BD
    const dadosTamanhosPizza = await controllerTamanhoPizza.listarTamanhosPizza();

    //Valida se existe retorno de dados
    if (dadosTamanhosPizza) {
        //Status 200
        statusCode = 200;
        message = dadosTamanhosPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }

    // console.log(message)

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

app.get('/v1/tamanho_pizza/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {

        //Import do arquivos controllerTamanhoPizza
        const controllerTamanhoPizza = require('../controller/controllerTamanhoPizza.js');

        //Retorna todos os alunos existentes no BD
        const dadosTamanhoPizza = await controllerTamanhoPizza.buscarTamanhoPizza(id);

        //Valida se existe retorno de dados
        if (dadosTamanhoPizza) {
            //Status 200
            statusCode = 200;
            message = dadosTamanhoPizza;
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

app.post('/v1/tamanho_pizza', cors(), jsonParser, async function(request, response){
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
            const controllerTamanhoPizza = require('../controller/controllerTamanhoPizza.js');

            //Chama a função novoTamanhoPizza da controller e encaminha os dados do Body
            const novoTamanho = await controllerTamanhoPizza.novoTamanhoPizza(dadosBody);

            statusCode = novoTamanho.status;
            message = novoTamanho.message;

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

app.put('/v1/tamanho_pizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;
    let id = request.params.id;

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

            //Validação do ID na requisição
            if (id != '' && id != undefined) {
                
                //Inserindo o ID no JSON que chegou do corpo da requisição
                dadosBody.id = id;

                //Import do arquivo da controller de aluno
                const controllerTamanhoPizza = require('../controller/controllerTamanhoPizza.js');

                //Chama a função novoTamanhoPizza da controller e encaminha os dados do Body
                const novoTamanhoPizza = await controllerTamanhoPizza.atualizarTamanhoPizza(dadosBody);

                    statusCode = novoTamanhoPizza.status;
                    message = novoTamanhoPizza.message;
            } else {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

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

app.delete('/v1/tamanho_pizza/:id', cors(), jsonParser, async function(request, response){
    let stautsCode;
    let message;
    let id = request.params.id;

    if (id != '' && id != undefined) {
        const controllerTamanhoPizza = require('../controller/controllerTamanhoPizza.js');

        const buscarTamanho = await controllerTamanhoPizza.buscarTamanhoPizza(id);

        const excluirTamanho = await controllerTamanhoPizza.excluirTamanhoPizza(id);

        statusCode = excluirTamanho.status;
        message = excluirTamanho.message;
    } else {
        stautsCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);
});

// ========== END-POINTS DO TIPO DE PIZZA =========

app.post('/v1/tipo_pizza', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        let dadosBody = request.body;

        // console.log(dadosBody);

        if (JSON.stringify(dadosBody) != '{}') {
            
            const controllerTipoPizza = require('../controller/controllerTipoPizza.js');

            const novoTipo = await controllerTipoPizza.novoTipoPizza(dadosBody);

            statusCode = novoTipo.status;
            message = novoTipo.message;

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

app.get('/v1/tipos_pizza', cors(), async function(request, response){

    let statusCode;
    let message;

    //Import do arquivos controllerTamanhoPizza
    const controllerTipoPizza = require('../controller/controllerTipoPizza.js');

    //Retorna todos os alunos existentes no BD
    const dadosTiposPizza = await controllerTipoPizza.listarTiposPizza();

    //Valida se existe retorno de dados
    if (dadosTiposPizza) {
        //Status 200
        statusCode = 200;
        message = dadosTiposPizza;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }

    // console.log(message)

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

app.put('/v1/tipo_pizza/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;
    let id = request.params.id;

    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {

        let dadosBody = request.body;


        if (JSON.stringify(dadosBody) != '{}') {

            if (id != '' && id != undefined) {
                
                dadosBody.id = id;

                const controllerTipoPizza = require('../controller/controllerTipoPizza.js');

                const novoTipoPizza = await controllerTipoPizza.atualizarTipoPizza(dadosBody);

                    statusCode = novoTipoPizza.status;
                    message = novoTipoPizza.message;
            } else {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

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

app.delete('/v1/tipo_pizza/:id', cors(), jsonParser, async function(request, response){
    let stautsCode;
    let message;
    let id = request.params.id;

    if (id != '' && id != undefined) {
        const controllerTipoPizza = require('../controller/controllerTipoPizza.js');

        const excluirTipo = await controllerTipoPizza.excluirTipoPizza(id);

        statusCode = excluirTipo.status;
        message = excluirTipo.message;
    } else {
        stautsCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);
});

app.get('/v1/tipo_pizza/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {

        //Import do arquivos controllerTamanhoPizza
        const controllerTamanhoPizza = require('../controller/controllerTamanhoPizza.js');

        //Retorna todos os alunos existentes no BD
        const dadosTamanhoPizza = await controllerTamanhoPizza.buscarTamanhoPizza(id);

        //Valida se existe retorno de dados
        if (dadosTamanhoPizza) {
            //Status 200
            statusCode = 200;
            message = dadosTamanhoPizza;
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

// =============== END-POINTS PRODUTO ==================

app.get('/v1/produtos', cors(), async function(request, response){

    let statusCode;
    let message;

    //Import do arquivos controllerTamanhoPizza
    const controllerProduto = require('../controller/controllerProduto.js');

    //Retorna todos os alunos existentes no BD
    const dadosProdutos = await controllerProduto.listarProdutos();

    //Valida se existe retorno de dados
    if (dadosProdutos) {
        //Status 200
        statusCode = 200;
        message = dadosProdutos;
    } else {
        //Status 404
        statusCode = 404;
        message = MESSAGE_ERROR.NOT_FOUND_DB;
    }

    // console.log(message)

    //Retorna os dados da API
    response.status(statusCode);
    response.json(message);
});

app.post('/v1/produto', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;

    headerContentType = request.headers['content-type'];


    if (headerContentType == 'application/json') {
        let dadosBody = request.body;

        if (JSON.stringify(dadosBody) != '{}') {
            
            const controllerProduto = require('../controller/controllerProduto.js');

            const newProduto = await controllerProduto.novoProduto(dadosBody);

            statusCode = newProduto.status;
            message = newProduto.message;

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

app.put('/v1/produto/:id', cors(), jsonParser, async function(request, response){
    let statusCode;
    let message;
    let headerContentType;
    let id = request.params.id;

    headerContentType = request.headers['content-type'];

    if (headerContentType == 'application/json') {
        let dadosBody = request.body;

        if (JSON.stringify(dadosBody) != '{}') {

            if (id != '' && id != undefined) {
                
                dadosBody.id = id;

                const controllerProduto = require('../controller/controllerProduto.js');

                const AttProduto = await controllerProduto.atualizarProduto(dadosBody);

                    statusCode = AttProduto.status;
                    message = AttProduto.message;
            } else {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID;
            }

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

app.delete('/v1/produto/:id', cors(), jsonParser, async function(request, response){
    let stautsCode;
    let message;
    let id = request.params.id;

    if (id != '' && id != undefined) {
        const controllerProduto = require('../controller/controllerProduto.js');

        const buscarProduto = await controllerProduto.buscarProduto(id);

        const excluirProduto = await controllerProduto.excluirProduto(id);

        statusCode = excluirProduto.status;
        message = excluirProduto.message;
    } else {
        stautsCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
    }

    response.status(statusCode);
    response.json(message);
});

app.get('/v1/produto/:id', cors(), async function(request, response){
    let id = request.params.id;
    let statusCode;
    let message;

    if (id != '' && id != undefined) {

        const controllerProduto = require('../controller/controllerProduto.js');

        //Retorna todos os alunos existentes no BD
        const dadosProduto = await controllerProduto.buscarProduto(id);

        //Valida se existe retorno de dados
        if (dadosProduto) {
            //Status 200
            statusCode = 200;
            message = dadosProduto;
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




app.listen(8080, function(){
    console.log('Servidor aguardando requisições')
});





