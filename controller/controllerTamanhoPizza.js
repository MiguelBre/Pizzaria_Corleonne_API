/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    06/12/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novoTamanhoPizza = async function(tamanho_pizza){

    //Validação de campos obrigatórios
    if(tamanho_pizza.tamanho == '' || tamanho_pizza.tamanho == undefined || tamanho_pizza.preco == '' || tamanho_pizza.preco == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        //import da model de tamanho_pizza
        const modelTamanhoPizza = require('../model/DAO/tamanho_pizza.js');

        //Chama a função para inserir um novo tamanho_pizza (NA = Novo Aluno)
        const resultNA = await modelTamanhoPizza.insertTamanhoPizza(tamanho_pizza);

        //Verifica se os dados do novo tamanho_pizza foram inseridos no BD
        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const atualizarTamanhoPizza = async function(tamanho_pizza){

    if(tamanho_pizza.id == '' || tamanho_pizza.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if (tamanho_pizza.tamanho == '' || tamanho_pizza.tamanho == undefined || tamanho_pizza.preco == '' || tamanho_pizza.preco == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attTamanhoPizza = require('../model/DAO/tamanho_pizza.js');
        const atualizar = await attTamanhoPizza.updateTamanhoPizza(tamanho_pizza);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const excluirTamanhoPizza = async function(id){

    if (id != '' && id != undefined) {
        
        // console.log(id);

        const tamanhoPizza = await buscarTamanhoPizza(id);

        // console.log(tamanhoPizza);

        if (tamanhoPizza) {
            const apagarTamanho = require('../model/DAO/tamanho_pizza.js');

            const result = await apagarTamanho.deleteTamanhoPizza(id);

            // console.log(result);

            if (result) {
                return {status: 200, message: MESSAGE_SUCCESS.DELETE_ITEM};
            } else {
                return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
            }
        } else {
            return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_DB};
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

const listarTamanhosPizza = async function(){

    let dadosTamanhosPizzaJSON = {};

    const tamanhoPizza = require('../model/DAO/tamanho_pizza.js');

    const dadosTamanho = await tamanhoPizza.selectAllTamanhoPizza();

    // console.log(dadosCursos);
    if (dadosTamanho) {
        dadosTamanhosPizzaJSON.disponíveis = dadosTamanho;
        return dadosTamanhosPizzaJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

const buscarTamanhoPizza = async function(id){

    if (id != '' && id != undefined) {
        
        let dadosTamanhoPizzaJSON = {};

        const { selectTamanhoPizzaByID } = require('../model/DAO/tamanho_pizza.js')

        const dadosTamanhoPizza = await selectTamanhoPizzaByID(id);

        if (dadosTamanhoPizza) {
            dadosTamanhoPizzaJSON.tamanho = dadosTamanhoPizza;
            return dadosTamanhoPizzaJSON;
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

module.exports = {
    listarTamanhosPizza,
    novoTamanhoPizza,
    atualizarTamanhoPizza,
    excluirTamanhoPizza,
    buscarTamanhoPizza
}









