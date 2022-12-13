/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    12/12/2022                
 * Versão:          1.0
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const insertAdmin = async function(dadosAdmin){
    try {
        
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient()

        let sql = `insert into tbl_administrador (nome, sobrenome, email, senha)
                        values('${dadosAdmin.nome}', '${dadosAdmin.sobrenome}', MD5('${dadosAdmin.email}'), MD5('${dadosAdmin.senha}'))`;

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

const selectAllAdmins = async function() {
    
    const { PrismaClient } = require('@prisma/client')
    const prisma = new PrismaClient()

    const rsAdmins = await prisma.$queryRaw `select cast(id as float) as id, nome, sobrenome, email, senha from tbl_administrador order by id desc`

    if (rsAdmins.length > 0) {
        return rsAdmins
    } else {
        return false
    }
}

const updateAdmin = async function(dadosAdmin){

    try{

        const { PrismaClient } = require('@prisma/client')

        const prisma = new PrismaClient()

        let sql = `UPDATE tbl_administrador
                    SET
                        nome = '${dadosAdmin.nome}',
                        sobrenome = '${dadosAdmin.sobrenome}',
                        email = MD5('${dadosAdmin.email}'),
                        senha = MD5('${dadosAdmin.senha}')
                    WHERE
                        id = '${dadosAdmin.id}'`;

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

const deleteAdmin = async function(id){
    try{

        const {PrismaClient} = require('@prisma/client');
        const prisma = new PrismaClient();
        
        let sql = `DELETE FROM tbl_administrador WHERE id = ${id};`;

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

const selectAdminByID = async function(id){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as id, nome, sobrenome, email, senha FROM tbl_administrador WHERE tbl_administrador.id = ${id};`;
    
    const rsAdmin = await prisma.$queryRawUnsafe(sql);

    if (rsAdmin.length > 0) {
        return rsAdmin;
    } else {
        return false;
    }
}




module.exports = {
    insertAdmin,
    selectAllAdmins,
    updateAdmin,
    deleteAdmin,
    selectAdminByID
}