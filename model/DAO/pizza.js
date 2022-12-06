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
                        inner join tbl_produto
                            on tbl_produto.id = tbl_pizza.id_produto
                        inner join tbl_tipo_pizza
                            on tbl_tipo_pizza.id = tbl_pizza.id_tipo
                        inner join tbl_pizza_x_tamanho
                            on tbl_pizza.id = tbl_pizza_x_tamanho.id_pizza
                        inner join tbl_tamanho_pizza
                            on tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho
                order by nomeProduto`;

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
                            inner join tbl_produto
                                on tbl_produto.id = tbl_pizza.id_produto
                            inner join tbl_tipo_pizza
                                on tbl_tipo_pizza.id = tbl_pizza.id_tipo
                            inner join tbl_pizza_x_tamanho
                                on tbl_pizza.id = tbl_pizza_x_tamanho.id_pizza
                            inner join tbl_tamanho_pizza
                                on tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho
    where tbl_pizza.id = ${id};`;
    
    const rsPizza = await prisma.$queryRawUnsafe(sql);

    if (rsPizza.length > 0) {
        return rsPizza;
    } else {
        return false;
    }
}

const insertPizza = async function(){

    // try{

    //     //import da classe prismaClient que é responsável pelas interações com o BD
    //     const { PrismaClient } = require('@prisma/client')

    //     //Instância da classe PrismaClient
    //     const prisma = new PrismaClient()

    //     let sql /* Structure Query Language */ = `insert into tbl_aluno (nome,
    //                                                                      foto,
    //                                                                      rg,
    //                                                                      cpf,
    //                                                                      email,
    //                                                                      data_nascimento,
    //                                                                      sexo,
    //                                                                      telefone,
    //                                                                      celular)
    //                                                                      values(
    //                                                                         '${aluno.nome}',
    //                                                                         '${aluno.foto}',
    //                                                                         '${aluno.rg}',
    //                                                                         '${aluno.cpf}',
    //                                                                         '${aluno.email}',
    //                                                                         '${aluno.data_nascimento}',
    //                                                                         '${aluno.sexo}',
    //                                                                         '${aluno.telefone}',
    //                                                                         '${aluno.celular}')`;

    //     //Executa o script SQL no BD
    //         //executeRawUnsafe permite encaminhar uma variável contendo o script
    //     const result = await prisma.$executeRawUnsafe (sql);

    //     //Verifica se o script foi executado com sucesso no BD
    //     if (result) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // } catch(error){
    //     return false;
    // }

}

const selectLastID = async function(){

    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();

    //
    let sql = `SELECT cast(id as FLOAT) as id FROM tbl_produto
                    ORDER BY id desc limit 1`;

    const rsPizza = await prisma.$queryRawUnsafe(sql);

    //Verifica se o 'rsAlunos' possuí algum conteúdo, e se não tiver nada nela, a função retorna falso
    if (rsAluno) {
        return rsPizza[0].id;
    } else {
        return false;
    }
}







module.exports = {
    selectAllPizzas,
    selectPizzaByID
}







