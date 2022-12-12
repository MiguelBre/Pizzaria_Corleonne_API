/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    12/12/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novoProduto = async function(dadosProduto){

    if(dadosProduto.nome == '' || dadosProduto.nome == undefined || dadosProduto.descricao == '' || dadosProduto.descricao == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const modelProduto = require('../model/DAO/produto.js');

        const resultNA = await modelProduto.insertProduto(dadosProduto);

        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const listarProdutos = async function(){

    let dadosProdutosJSON = {};

    const Produtos = require('../model/DAO/produto.js');

    const dadosProduto = await Produtos.selectAllProdutos();

    // console.log(dadosCursos);
    if (dadosProduto) {
        dadosProdutosJSON.disponíveis = dadosProduto;
        return dadosProdutosJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

const atualizarProduto = async function(dadosProduto){

    if(dadosProduto.id == '' || dadosProduto.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if (dadosProduto.nome == '' || dadosProduto.nome == undefined || dadosProduto.descricao == '' || dadosProduto.descricao == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attProduto = require('../model/DAO/produto.js');
        const atualizar = await attProduto.updateProduto(dadosProduto);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}










module.exports = {
    novoProduto,
    listarProdutos
}