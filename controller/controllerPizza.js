/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de recebimento, tratamento e retorno de dados entre API e model
 * Autor:           Miguel Antonio
 * Data_criação:    01/12/2022
 * Versão:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const listarPizzas = async function(){

    let pizzasJSON = {};

    const { selectAllPizzas } = require('../model/DAO/pizza.js');
    
    const dadosPizzas = await selectAllPizzas();

    if (dadosPizzas) {
        const pizzas
    }

}











