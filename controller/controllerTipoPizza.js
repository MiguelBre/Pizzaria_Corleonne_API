/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    07/12/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novoTipoPizza = async function(tipo_pizza){

    //Validação de campos obrigatórios
    if(tipo_pizza.tipo == '' || tipo_pizza.tipo == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        //import da model de tipo_pizza
        const modelTipoPizza = require('../model/DAO/tipo_pizza.js');

        //Chama a função para inserir um novo tipo_pizza (NA = Novo Aluno)
        const resultNA = await modelTipoPizza.insertTipoPizza(tipo_pizza);

        //Verifica se os dados do novo tipo_pizza foram inseridos no BD
        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const atualizarTipoPizza = async function(tipo_pizza){

    if(tipo_pizza.id == '' || tipo_pizza.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if (tipo_pizza.tipo == '' || tipo_pizza.tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attTipoPizza = require('../model/DAO/tipo_pizza.js');
        const atualizar = await attTipoPizza.updateTipoPizza(tipo_pizza);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const excluirTipoPizza = async function(id){

    if (id != '' && id != undefined) {
        
        // console.log(id);

        const TipoPizza = await buscarTipoPizza(id);

        // console.log(TipoPizza);

        if (TipoPizza) {
            const apagarTipo = require('../model/DAO/tipo_pizza.js');

            const result = await apagarTipo.deleteTipoPizza(id);

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

const buscarTipoPizza = async function(id){

    if (id != '' && id != undefined) {
        
        let dadosTipoPizzaJSON = {};

        const { selectTipoPizzaByID } = require('../model/DAO/tipo_pizza.js')

        const dadosTipoPizza = await selectTipoPizzaByID(id);

        if (dadosTipoPizza) {
            dadosTipoPizzaJSON.tipo = dadosTipoPizza;
            return dadosTipoPizzaJSON;
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

const listarTiposPizza = async function(){

    let dadosTiposPizzaJSON = {};

    const tipoPizza = require('../model/DAO/tipo_pizza.js');

    const dadosTipo = await tipoPizza.selectAllTiposPizza();

    // console.log(dadosCursos);
    if (dadosTipo) {
        dadosTiposPizzaJSON.disponíveis = dadosTipo;
        return dadosTiposPizzaJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}




module.exports = {
    novoTipoPizza,
    listarTiposPizza,
    atualizarTipoPizza,
    excluirTipoPizza
}


