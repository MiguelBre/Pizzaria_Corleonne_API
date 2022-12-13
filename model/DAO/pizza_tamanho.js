/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    13/12/2022              
 * Versão:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertPizzaTamanho = async function(pizzaTamanho){

    try{

        const { PrismaClient } = require('@prisma/client')
        const prisma = new PrismaClient()

        let sql  = `insert into tbl_pizza_x_tamanho (id_pizza, id_tamanho)
                        values('${pizzaTamanho.id_pizza}', '${pizzaTamanho.id_tamanho}')`;

        const result = await prisma.$executeRawUnsafe (sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }
}

const selectPizzaTamanho = async function(idPizza) {
    //import da classe prismaClient que é responsável pelas interações com o BD
    const { PrismaClient } = require('@prisma/client');

    //Instância da classe PrismaClient
    const prisma = new PrismaClient();

    let sql = `SELECT cast(tbl_pizza.id as float) as id_pizza, tbl_produto.nome as nome_pizza, tbl_tamanho_pizza.tamanho
                    FROM tbl_pizza
                        INNER JOIN tbl_pizza_x_tamanho
                            ON tbl_pizza.id = tbl_pizza_x_tamanho.id_pizza
                        INNER JOIN tbl_tamanho_pizza
                            ON tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho
                        INNER JOIN tbl_produto
                            ON tbl_produto.id = tbl_pizza.id_produto
                    WHERE tbl_pizza.id = ${idPizza};`;

    const rsPizzaTamanho = await prisma.$queryRawUnsafe (sql);

    if (rsPizzaTamanho.length > 0) {
        return rsPizzaTamanho;
    } else {
        return false;
    }
}





module.exports = {
    insertPizzaTamanho
}