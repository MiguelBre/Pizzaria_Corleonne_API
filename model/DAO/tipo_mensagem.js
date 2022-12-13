/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    13/12/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertTipoMensagem = async function(dadosTipo){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient()

        let sql = `insert into tbl_tipo_mensagem (tipo)
                    values('${dadosTipo.tipo}');`;

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

const selectAllTiposMensagem = async function() {
    
    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const rsMensagemTipos = await prisma.$queryRaw `select cast(id as float) as id, tipo from tbl_tipo_mensagem order by id desc`

    if (rsMensagemTipos.length > 0) {
        return rsMensagemTipos
    } else {
        return false
    }
}

const updateTipoMensagem = async function(tipo_mensagem){

    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql /* Structure Query Language */ = `UPDATE tbl_tipo_mensagem
                                                  SET
                                                      tipo = '${tipo_mensagem.tipo}'
                                                  WHERE
                                                    id = '${tipo_mensagem.id}'`;
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

const deleteTipoMensagem = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        // console.log(id);

        let sql = `DELETE FROM tbl_tipo_mensagem WHERE id = ${id};`;

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

const selectTipoMensagemByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, tipo FROM tbl_tipo_mensagem WHERE tbl_tipo_mensagem.id = ${id};`;
    
    const rsMensagemTipo = await prisma.$queryRawUnsafe(sql);

    if (rsMensagemTipo.length > 0) {
        return rsMensagemTipo;
    } else {
        return false;
    }
}







module.exports = {
    selectAllTiposMensagem,
    insertTipoMensagem,
    updateTipoMensagem,
    deleteTipoMensagem,
    selectTipoMensagemByID
}
