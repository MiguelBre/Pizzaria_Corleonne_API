/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Arquivo responsável pela manipulação de dados com o Banco de Dados (insert, update, select, delete) 
 * Autor:           Miguel Antonio
 * Data_criação:    01/12/2022                
 * Versão:          1.0
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

const selectAllPizzas = async function(){

    //Import da classe PrismaClient, responsável pelas interações com o BD
    const {PrismaClient} = require('@prisma/client');
    const prisma = new PrismaClient();

    const rsPizzas = await prisma.$queryRaw `select tbl_produto.nome as nomeProduto, tbl_produto.descricao, tbl_pizza.imagem, tbl_tamanho_pizza.tamanho, tbl_tamanho_pizza.preco, tbl_tipo_pizza.tipo
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

    if (rsPizzas.length > 0) {
        return rsPizzas;
    } else {
        return false;
    }
}









module.exports = {
    selectAllPizzas
}







