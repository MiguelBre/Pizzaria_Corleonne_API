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
    listarTiposPizza
}


