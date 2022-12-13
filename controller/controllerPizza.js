/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    01/12/2022
 * Versão:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const listarPizzas = async function(){

    let pizzasJSON = {};

    const { selectAllPizzas } = require('../model/DAO/pizza.js');
    
    const dadosPizzas = await selectAllPizzas();

    if (dadosPizzas) {

        pizzasJSON.pizzas = dadosPizzas;
        return pizzasJSON;

    } else {

        return MESSAGE_ERROR.NOT_FOUND_DB;

    }

}

const buscarPizzaID = async function(id){

    if (id != '' && id != undefined) {
        let dadosPizza = {};

        const { selectPizzaByID } = require('../model/DAO/pizza.js');

        const pizza = await selectPizzaByID(id);

        if (pizza) {

            dadosPizza.pizza = pizza;
            return dadosPizza;

        } else {

            return false;

        }

    } else {

        return {status: 400, message:MESSAGE_ERROR.REQUIRED_ID};

    }

}

const novaPizza = async function(dadosPizza){

    if(dadosPizza.nome == '' || dadosPizza.nome == undefined || dadosPizza.descricao == '' || dadosPizza.descricao == undefined || dadosPizza.id_tipo == '' || dadosPizza.id_tipo == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const modelPizza = require('../model/DAO/pizza.js');

        const resultNA = await modelPizza.insertPizza(dadosPizza);

        // console.log(dadosPizza);

        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

module.exports = {
    listarPizzas,
    buscarPizzaID,
    novaPizza
}











