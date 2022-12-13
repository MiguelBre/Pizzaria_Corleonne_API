/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    13/12/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novoTipoMensagem = async function(dadosTipo){

    if(dadosTipo.tipo == '' || dadosTipo.tipo == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const modelTipoMensagem = require('../model/DAO/tipo_mensagem.js');

        const resultNA = await modelTipoMensagem.insertTipoMensagem(dadosTipo);

        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const listarTiposMensagem = async function(){

    let dadosTiposMensagemJSON = {};

    const tipoMensagem = require('../model/DAO/tipo_mensagem.js');

    const dadosTipo = await tipoMensagem.selectAllTiposMensagem();

    if (dadosTipo) {
        dadosTiposMensagemJSON.disponiveis = dadosTipo;
        return dadosTiposMensagemJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

const atualizarTipoMensagem = async function(dadosTipo){

    if(dadosTipo.id == '' || dadosTipo.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if (dadosTipo.tipo == '' || dadosTipo.tipo == undefined) {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attTipoMensagem = require('../model/DAO/tipo_mensagem.js');
        const atualizar = await attTipoMensagem.updateTipoMensagem(dadosTipo);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const excluirTipoMensagem = async function(id){

    if (id != '' && id != undefined) {
        
        // console.log(id);

        const TipoMensagem = await buscarTipoMensagem(id);

        // console.log(TipoMensagem);

        if (TipoMensagem) {

            const apagarTipo = require('../model/DAO/tipo_mensagem.js');

            const result = await apagarTipo.deleteTipoMensagem(id);

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

const buscarTipoMensagem = async function(id){

    if (id != '' && id != undefined) {
        
        let dadosTiposMensagemJSON = {};

        const { selectTipoMensagemByID } = require('../model/DAO/tipo_mensagem.js')

        const dadosTipoMensagem = await selectTipoMensagemByID(id);

        if (dadosTipoMensagem) {
            dadosTiposMensagemJSON.tipo = dadosTipoMensagem;
            return dadosTiposMensagemJSON;
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

module.exports = {
    listarTiposMensagem,
    novoTipoMensagem,
    atualizarTipoMensagem,
    excluirTipoMensagem,
    buscarTipoMensagem
}
