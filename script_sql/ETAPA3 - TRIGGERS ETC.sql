use db_pizzaria_corleonne;

show tables;

show triggers;

DELIMITER $
	create trigger tgrDeleteTamanhoPizza
		before delete on tbl_tamanho_pizza
			for each row
				BEGIN
					delete from tbl_pizza_x_tamanho where id_tamanho = old.id;
                END$
                
DELIMITER $
	create trigger tgrDeletePizza
		before delete on tbl_pizza
			for each row
				BEGIN
					delete from tbl_pizza_x_tamanho where id_pizza = old.id;
                END$
                
DELIMITER $
	create trigger tgrDeleteTipoPizza
		before delete on tbl_tipo_pizza
			for each row
				BEGIN
					delete from tbl_pizza where id_tipo = old.id;
                END$
                
DELIMITER $
	create trigger tgrDeleteProduto
		before delete on tbl_produto
			for each row
				BEGIN
					delete from tbl_pizza where id_produto = old.id;
                    delete from tbl_bebida where id_produto = old.id;
                END$

drop trigger tgrDeleteProduto;

INSERT INTO tbl_produto(nome, descricao, desconto) VALUES ('Pizza Atum', 'Uma massa coberta com molho de tomate e recheio de atum e cebola', null);
                   INSERT INTO tbl_pizza(imagem, id_produto, id_tipo) VALUES ('https://pizzariadesucesso.com/wp-content/uploads/2018/06/pizza-calabresa-choppodromo.jpg', '8', '1');
                   
select * from tbl_pizza;
                   
