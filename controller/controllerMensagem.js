/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    13/12/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novaMensagem = async function(dadosMensagem){

    if(dadosMensagem.nome == '' || dadosMensagem.nome == undefined || dadosMensagem.email == '' || dadosMensagem.email == undefined || dadosMensagem.celular == '' || dadosMensagem.celular == undefined || dadosMensagem.mensagem == '' || dadosMensagem.mensagem == undefined || dadosMensagem.id_tipo == '' || dadosMensagem.id_tipo == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const modelMensagem = require('../model/DAO/mensagem.js');

        const resultNA = await modelMensagem.insertMensagem(dadosMensagem);

        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const listarMensagens = async function(){

    let dadosMensagensJSON = {};

    const mensagens = require('../model/DAO/mensagem.js');

    const dadosMensagens = await mensagens.selectAllMensagens();

    if (dadosMensagens) {
        dadosMensagensJSON.disponiveis = dadosMensagens;
        return dadosMensagensJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

const atualizarMensagem = async function(dadosMensagem){

    if(dadosMensagem.id == '' || dadosMensagem.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if (dadosMensagem.nome == '' || dadosMensagem.nome == undefined || dadosMensagem.email == '' || dadosMensagem.email == undefined || dadosMensagem.celular == '' || dadosMensagem.celular == undefined || dadosMensagem.mensagem == '' || dadosMensagem.mensagem == undefined || dadosMensagem.id_tipo == '' || dadosMensagem.id_tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attMensagem = require('../model/DAO/mensagem.js');
        const atualizar = await attMensagem.updateMensagem(dadosMensagem);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const excluirMensagem = async function(id){

    if (id != '' && id != undefined) {
        
        // console.log(id);

        const mensagem = await buscarMensagem(id);

        // console.log(TipoMensagem);

        if (mensagem) {

            const apagarMensagem = require('../model/DAO/mensagem.js');

            const result = await apagarMensagem.deleteMensagem(id);

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

const buscarMensagem = async function(id){

    if (id != '' && id != undefined) {
        
        let dadosMensagensJSON = {};

        const { selectMensagemByID } = require('../model/DAO/mensagem.js')

        const dadosMensagem = await selectMensagemByID(id);

        if (dadosMensagem) {
            dadosMensagensJSON.tipo = dadosMensagem;
            return dadosMensagensJSON;
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

module.exports = {
    listarMensagens,
    novaMensagem,
    atualizarMensagem,
    excluirMensagem,
    buscarMensagem
}