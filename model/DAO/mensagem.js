/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    13/12/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertMensagem = async function(dadosMensagem){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient()

        let sql = `insert into tbl_mensagem (nome, email, celular, telefone, mensagem, id_tipo)
                    values('${dadosMensagem.nome}', '${dadosMensagem.email}', '${dadosMensagem.celular}', '${dadosMensagem.telefone}', '${dadosMensagem.mensagem}', '${dadosMensagem.id_tipo}');`;

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

const selectAllMensagens = async function() {
    
    const { PrismaClient } = require('@prisma/client')

    const prisma = new PrismaClient()

    const rsMensagens = await prisma.$queryRaw `select tbl_mensagem.id as idMensagem, tbl_mensagem.nome, tbl_mensagem.email, tbl_mensagem.celular, tbl_mensagem.mensagem, tbl_tipo_mensagem.tipo from tbl_mensagem
                                                        inner join tbl_tipo_mensagem
                                                            on tbl_tipo_mensagem.id = tbl_mensagem.id_tipo;`

    if (rsMensagens.length > 0) {
        return rsMensagens
    } else {
        return false
    }
}

const updateMensagem = async function(dadosMensagem){

    try{

        //import da classe prismaClient que é responsável pelas interações com o BD
        const { PrismaClient } = require('@prisma/client')

        //Instância da classe PrismaClient
        const prisma = new PrismaClient()

        let sql = `UPDATE tbl_mensagem
                    SET
                       nome = '${dadosMensagem.nome}',
                       email = '${dadosMensagem.email}',
                       celular = '${dadosMensagem.celular}',
                       mensagem = '${dadosMensagem.mensagem}',
                       id_tipo = '${dadosMensagem.id_tipo}'
                     WHERE
                       id = ${dadosMensagem.id};`;

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

const deleteMensagem = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        let sql = `DELETE FROM tbl_mensagem WHERE id = ${id};`;

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

const selectMensagemByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select tbl_mensagem.id as idMensagem, tbl_mensagem.nome, tbl_mensagem.email, tbl_mensagem.celular, tbl_mensagem.mensagem, tbl_tipo_mensagem.tipo from tbl_mensagem
                    inner join tbl_tipo_mensagem
                        on tbl_tipo_mensagem.id = tbl_mensagem.id_tipo 
                    WHERE tbl_tipo_mensagem.id = ${id};`;
    
    const rsMensagemTipo = await prisma.$queryRawUnsafe(sql);

    if (rsMensagemTipo.length > 0) {
        return rsMensagemTipo;
    } else {
        return false;
    }
}

module.exports = {
    selectAllMensagens,
    insertMensagem,
    updateMensagem,
    deleteMensagem,
    selectMensagemByID
}









