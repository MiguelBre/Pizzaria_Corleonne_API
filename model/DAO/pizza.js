/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    01/12/2022                
 * Versão:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const selectAllPizzas = async function(){

    //Import da classe PrismaClient, responsável pelas interações com o BD
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select tbl_pizza.id as idPizza, tbl_produto.nome as nomeProduto, tbl_produto.descricao, tbl_pizza.imagem, tbl_tamanho_pizza.tamanho, tbl_tamanho_pizza.preco, tbl_tipo_pizza.tipo
                    from tbl_pizza
                        left join tbl_produto
                            on tbl_produto.id = tbl_pizza.id_produto
                        left join tbl_tipo_pizza
                            on tbl_tipo_pizza.id = tbl_pizza.id_tipo
                        left join tbl_pizza_x_tamanho
                            on tbl_pizza.id = tbl_pizza_x_tamanho.id_pizza
                        left join tbl_tamanho_pizza
                            on tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho
                order by idPizza desc`;

    const rsPizzas = await prisma.$queryRawUnsafe(sql);

    if (rsPizzas.length > 0) {
        return rsPizzas;
    } else {
        return false;
    }
}

const selectPizzaByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql =
    `select tbl_pizza.id as idPizza, tbl_produto.nome as nomeProduto, tbl_produto.descricao, tbl_pizza.imagem, tbl_tamanho_pizza.tamanho, tbl_tamanho_pizza.preco, tbl_tipo_pizza.tipo
                        from tbl_pizza
                            left join tbl_produto
                                on tbl_produto.id = tbl_pizza.id_produto
                            left join tbl_tipo_pizza
                                on tbl_tipo_pizza.id = tbl_pizza.id_tipo
                            left join tbl_pizza_x_tamanho
                                on tbl_pizza.id = tbl_pizza_x_tamanho.id_pizza
                            left join tbl_tamanho_pizza
                                on tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho
    where tbl_pizza.id = ${id};`;
    
    const rsPizza = await prisma.$queryRawUnsafe(sql);

    if (rsPizza.length > 0) {
        return rsPizza;
    } else {
        return false;
    }
}

const insertPizza = async function(dadosPizza){

    try{

        const modelPizzaTamanho = require('./pizza_tamanho.js')

        const modelProduto = require('./produto.js')

        const { PrismaClient } = require('@prisma/client')
        const prisma = new PrismaClient()

        let sql = `INSERT INTO tbl_produto(nome, descricao, desconto) VALUES ('${dadosPizza.nome}', '${dadosPizza.descricao}', ${dadosPizza.desconto});`;
        let sql2 = `INSERT INTO tbl_pizza(imagem, id_produto, id_tipo) VALUES ('${dadosPizza.imagem}', '${await modelProduto.selectLastID()}', '${dadosPizza.id_tipo}');`


        const result = await prisma.$executeRawUnsafe (sql);
        const result2 = await prisma.$executeRawUnsafe (sql2);

        if (result && result2) {
            let sql3 = `INSERT INTO tbl_pizza_x_tamanho(id_pizza, id_tamanho) VALUES (${await modelPizzaTamanho.selectLastID()}, ${dadosPizza.id_tamanho})`;

            console.log(sql3);

            const result3 = await prisma.$executeRawUnsafe (sql3);
            if (result3) {
                return true;
            } else {
                return false
            }
        } else {
            return false;
        }
    } catch(error){
        return false;
    }
}

const deletePizza = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        let sql = `DELETE FROM tbl_pizza_x_tamanho WHERE id_pizza = ${id};`;
        let sql2 = `DELETE FROM tbl_pizza WHERE id = ${id};`;

        const result = await prisma.$executeRawUnsafe (sql);
        const result2 = await prisma.$executeRawUnsafe(sql2);

        if (result || result2) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }
}






module.exports = {
    selectAllPizzas,
    selectPizzaByID,
    insertPizza,
    deletePizza
}







