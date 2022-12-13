/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    12/12/2022
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const novoAdmin = async function(dadosAdmin){

    if(dadosAdmin.nome == '' || dadosAdmin.nome == undefined || dadosAdmin.sobrenome == '' || dadosAdmin.sobrenome == undefined || dadosAdmin.email == '' || dadosAdmin.email == undefined || dadosAdmin.senha == '' || dadosAdmin.senha == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const modelAdmin = require('../model/DAO/admin.js');

        const resultNA = await modelAdmin.insertAdmin(dadosAdmin);

        if (resultNA) {
            return {status: 201, message: MESSAGE_SUCCESS.INSERT_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const listarAdmins = async function(){

    let dadosAdminsJSON = {};

    const Admins = require('../model/DAO/admin.js');

    const dadosAdmins = await Admins.selectAllAdmins();

    if (dadosAdmins) {
        dadosAdminsJSON.disponiveis = dadosAdmins;
        return dadosAdminsJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

const atualizarAdmin = async function(dadosAdmin){

    if(dadosAdmin.id == '' || dadosAdmin.id == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    } else if(dadosAdmin.nome == '' || dadosAdmin.nome == undefined || dadosAdmin.sobrenome == '' || dadosAdmin.sobrenome == undefined || dadosAdmin.email == '' || dadosAdmin.email == undefined || dadosAdmin.senha == '' || dadosAdmin.senha == undefined){
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const attAdmin = require('../model/DAO/admin.js');
        const atualizar = await attAdmin.updateAdmin(dadosAdmin);

        if (atualizar) {
            return {status: 200, message: MESSAGE_SUCCESS.UPDATE_ITEM};
        } else {
            return {status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB};
        }
    }
}

const buscarAdmin = async function(id){

    if (id != '' && id != undefined) {
        
        let dadosAdminJSON = {};

        const { selectAdminByID } = require('../model/DAO/admin.js')

        const dadosAdmin = await selectAdminByID(id);

        if (dadosAdmin) {
            dadosAdminJSON.dados = dadosAdmin;
            return dadosAdminJSON;
        } else {
            return false;
        }
    } else {
        return {status: 400, message: MESSAGE_ERROR.REQUIRED_ID};
    }
}

const excluirAdmin = async function(id){

    if (id != '' && id != undefined) {
        
        const Admin = await buscarAdmin(id);

        if (Admin) {
            const apagarAdmin = require('../model/DAO/admin.js');

            const result = await apagarAdmin.deleteAdmin(id);

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




module.exports = {
    listarAdmins,
    novoAdmin,
    atualizarAdmin,
    buscarAdmin,
    excluirAdmin
}