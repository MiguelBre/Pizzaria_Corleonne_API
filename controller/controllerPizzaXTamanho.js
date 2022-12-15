/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    15/12/2022
 * Versão:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const { MESSAGE_ERROR, MESSAGE_SUCCESS } = require('../modulo/config.js');

const listarPizzaXTamanho = async function(){

    let dadosPizzaTamanhoJSON = {};

    const pizzaXtamanho = require('../model/DAO/pizza_tamanho.js');

    const dadosPizzaTamanho = await pizzaXtamanho.selectPizzaTamanho();

    // console.log(dadosCursos);
    if (dadosTamanho) {
        dadosPizzaTamanhoJSON.disponíveis = dadosPizzaTamanho;
        return dadosPizzaTamanhoJSON;
    } else {
        return MESSAGE_ERROR.NOT_FOUND_DB;
    }
}

const selectLastID = async function(){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    //
    let sql = `SELECT cast(id as FLOAT) as id FROM tbl_pizza
                    ORDER BY id desc limit 1`;

    const rsPizza = await prisma.$queryRawUnsafe(sql);

    //Verifica se o 'rsAlunos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsPizza) {
        return rsPizza[0].id;
    } else {
        return false;
    }
}

module.exports = {
    listarPizzaXTamanho,
    selectLastID
}







