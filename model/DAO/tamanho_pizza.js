/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    06/12/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertTamanhoPizza = async function(tamanho_pizza){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `insert into tbl_tamanho_pizza (tamanho,
                                                                        preco)
                                                                         values('${tamanho_pizza.tamanho}',
                                                                                '${tamanho_pizza.preco}')`;

        //Executa o script SQL no BD
            //executeRawUnsafe permite encaminhar uma variável contendo o script
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }
}

const updateTamanhoPizza = async function(tamanho_pizza){

    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `UPDATE tbl_tamanho_pizza
                                                  SET
                                                      tamanho = '${tamanho_pizza.tamanho}',
                                                      preco = '${tamanho_pizza.preco}'
                                                  WHERE
                                                    id = '${tamanho_pizza.id}'`;
        // console.log(sql);
        //Executa o script SQL no BD
            //executeRawUnsafe permite encaminhar uma variável contendo o script
        const result = await prisma.$executeRawUnsafe (sql);

        //Verifica se o script foi executado com sucesso no BD
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch(error){
        return false;
    }
}

const deleteTamanhoPizza = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        console.log(id);

        let sql = `DELETE FROM tbl_pizza_x_tamanho WHERE id = '${id}';
                   DELETE FROM tbl_tamanho_pizza WHERE id = '${id}';`;

        console.log(sql);

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

const selectAllTamanhoPizza = async function() {
    
    const { PrismaClient } = require('@prisma/client')

    //Instância da classe PrismaClient
    const prisma = new PrismaClient()

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados no BD através do script SQL (select)
        //Ordena os dados da tabela de forma decrescente (desc).
    const rsPizzaTamanhos = await prisma.$queryRaw `select cast(id as float) as id, tamanho, preco from tbl_tamanho_pizza order by id desc`

    //Verifica se o 'rsPizzaTamanhos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsPizzaTamanhos.length > 0) {
        return rsPizzaTamanhos
    } else {
        return false
    }
}

const selectTamanhoPizzaByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, tamanho, preco FROM tbl_tamanho_pizza WHERE tbl_tamanho_pizza.id = ${id};`;
    
    const rsPizzaTamanho = await prisma.$queryRawUnsafe(sql);

    if (rsPizzaTamanho.length > 0) {
        return rsPizzaTamanho;
    } else {
        return false;
    }
}



module.exports = {
    insertTamanhoPizza,
    updateTamanhoPizza,
    deleteTamanhoPizza,
    selectAllTamanhoPizza,
    selectTamanhoPizzaByID
}