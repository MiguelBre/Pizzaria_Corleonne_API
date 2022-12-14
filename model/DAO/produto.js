/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    12/12/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertProduto = async function(dadosProduto){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient()

        let sql = `insert into tbl_produto (nome, descricao, desconto)
                        values('${dadosProduto.nome}', '${dadosProduto.descricao}', ${dadosProduto.desconto});`;

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

const selectAllProdutos = async function() {
    
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()

    const rsProdutos = await prisma.$queryRaw `select cast(id as float) as id, nome, descricao, desconto from tbl_produto order by id desc`

    if (rsProdutos.length > 0) {
        return rsProdutos
    } else {
        return false
    }
}

const updateProduto = async function(dadosProduto){

    try{
    
        const { PrismaClient } = require('@prisma/client')
    
        const prisma = new PrismaClient()
    
        let sql = `UPDATE tbl_produto
                    SET
                        nome = '${dadosProduto.nome}',
                        descricao = '${dadosProduto.descricao}',
                        desconto = ${dadosProduto.desconto}
                    WHERE
                        id = ${dadosProduto.id}`;

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

const deleteProduto = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        let sql = `DELETE FROM tbl_produto WHERE id = ${id};`;

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

const selectProdutoByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, nome, descricao, desconto FROM tbl_produto WHERE tbl_produto.id = ${id};`;
    
    const rsProduto = await prisma.$queryRawUnsafe(sql);

    if (rsProduto.length > 0) {
        return rsProduto;
    } else {
        return false;
    }
}

const selectLastID = async function(){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    //
    let sql = `SELECT cast(id as FLOAT) as id FROM tbl_produto
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
    insertProduto,
    selectAllProdutos,
    updateProduto,
    deleteProduto,
    selectProdutoByID,
    selectLastID
}