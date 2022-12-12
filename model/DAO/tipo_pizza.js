/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    07/12/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertTipoPizza = async function(tipo_pizza){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `insert into tbl_tipo_pizza (tipo)
                                                                         values('${tipo_pizza.tipo}')`;

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

const updateTipoPizza = async function(tipo_pizza){

    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `UPDATE tbl_tipo_pizza
                                                  SET
                                                      tipo = '${tipo_pizza.tipo}'
                                                  WHERE
                                                    id = '${tipo_pizza.id}'`;
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

const deleteTipoPizza = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        // console.log(id);

        let sql = `DELETE FROM tbl_tipo_pizza WHERE id = ${id};`;

        // console.log(sql);

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

const selectTipoPizzaByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, tipo FROM tbl_tipo_pizza WHERE tbl_tipo_pizza.id = ${id};`;
    
    const rsPizzaTipo = await prisma.$queryRawUnsafe(sql);

    if (rsPizzaTipo.length > 0) {
        return rsPizzaTipo;
    } else {
        return false;
    }
}

const selectAllTiposPizza = async function() {
    
    const { PrismaClient } = require('@prisma/client')

    //Instância da classe PrismaClient
    const prisma = new PrismaClient()

    //Criamos um objeto do tipo RecordSet (rsAlunos) para receber os dados no BD através do script SQL (select)
        //Ordena os dados da tabela de forma decrescente (desc).
    const rsPizzaTipos = await prisma.$queryRaw `select cast(id as float) as id, tipo from tbl_tipo_pizza order by id desc`

    //Verifica se o 'rsPizzaTipos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsPizzaTipos.length > 0) {
        return rsPizzaTipos
    } else {
        return false
    }
}



module.exports = {
    insertTipoPizza,
    selectAllTiposPizza,
    updateTipoPizza,
    deleteTipoPizza,
    selectTipoPizzaByID
}