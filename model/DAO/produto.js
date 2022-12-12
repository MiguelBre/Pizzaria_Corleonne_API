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





module.exports = {
    insertProduto,
    selectAllProdutos,
    updateProduto
}