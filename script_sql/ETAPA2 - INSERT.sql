use db_pizzaria_corleonne;

# Insert na tabela de administrador
INSERT INTO tbl_administrador(nome, sobrenome, email, senha)
	VALUES					 ('Miguel', 'Bressan', MD5('migbress12@gmail.com'), MD5('1234'));

SELECT * FROM tbl_administrador where email = MD5('migbress12@gmail.com') and senha = MD5('12345678');

UPDATE tbl_administrador set senha = MD5('12345678') where senha = MD5('1234');

#Insert na tabela de ingredientes
INSERT into tbl_ingrediente(nome)
					 values('Mussarela'),
						   ('Calabresa'),
                           ('Catupiry'),
                           ('Presunto'),
                           ('Pepperoni'),
                           ('Cebola'),
                           ('Milho'),
                           ('Frango'),
                           ('Atum'),
                           ('Ovo Cozido'),
                           ('Palmito'),
                           ('Ervilha'),
                           ('Cheddar'),
                           ('Gorgonzola'),
                           ('Bacon'),
                           ('Tomate'),
                           ('Parmesão'),
                           ('Provolone'),
                           ('Orégano'),
                           ('Azeitona'),
                           ('Manjericão'),
                           ('Carne seca'),
                           ('Champignon'),
                           ('Shitake'),
                           ('Shimeji'),
                           ('Brigadeiro'),
                           ('Goiabada'),
                           ('Abacaxi'),
                           ('Chocolate'),
                           ('Chocolate branco'),
                           ('Morango'),
                           ('Banana'),
                           ('Açúcar'),
                           ('Granulado');

Select * from tbl_ingrediente;
    
update tbl_ingrediente set nome = 'Azeitona verde' where id = 20;

insert into tbl_ingrediente(nome) values('Azeitona Preta');

#Insert da tabela de tamanho de pizza
insert into tbl_tamanho_pizza(tamanho, preco)
			values	   		 ('Grande', '39.99'),
							 ('Broto', '22.99');
                             
select * from tbl_tamanho_pizza;

delete from tbl_tamanho_pizza where id between 1 and 2;

#Insert na tabela de tipo de pizza                             
insert into tbl_tipo_pizza(tipo)
					values('Salgada'),
						  ('Doce');

select * from tbl_tipo_pizza;
                          
#Insert na tabela de tamanho da bebida
insert into tbl_tamanho_bebida(tamanho, preco)
						values ('1.5L', '8.99'),
							   ('1L', '7.29'),
							   ('700mL', '6.49'),
                               ('500mL', '5.79'),
                               ('300mL', '4.99');
                               
delete from tbl_tamanho_bebida where id between 11 and 15;

insert into tbl_tamanho_bebida(tamanho, preco)
							values('350mL', '5.20');
                               
select * from tbl_tamanho_bebida;

#Insert na tabela de tipo de bebida
INSERT INTO tbl_tipo_bebida(tipo)
					values ('Suco'),
						   ('Refrigerante'),
                           ('Alcoólica');
                           
Select * from tbl_tipo_bebida;

#Insert na tabela do produto
Insert into tbl_produto(nome, descricao, desconto)
					values('Pizza Mussarela', 'A massa circular é coberta com molho de tomate, queijo mussarela e um pouco de orégano e duas ou três azeitonas', null),
						  ('Pizza Calabresa', 'Uma massa coberta com molho de tomate e recheio de calabresa e cebola', null),
                          ('Pizza Toscana', 'Massa de pizza coberta com molho de tomate e recheio de calabresa em rodelas e queijo mussarela', null);
                          
insert into tbl_produto(nome, descricao, desconto)
				values ('Coca-cola', 'Bebida gaseificada', null),
					   ('Guaraná Antártica', 'Bebida gaseificada com sabor de guaraná', null);

select * from tbl_produto;

#Insert na tabela de pizza
insert into tbl_pizza(imagem, id_produto, id_tamanho, id_tipo)
				values('https://img77.uenicdn.com/image/upload/v1538467832/service_images/shutterstock_633097292.jpg', 1, 3, 1),
					  ('https://pizzariadesucesso.com/wp-content/uploads/2018/06/pizza-calabresa-choppodromo.jpg', 2, 3, 1),
                      ('https://img.freepik.com/fotos-premium/pizza-de-calabresa-em-prato-de-madeira-isolada_239245-2380.jpg?w=2000', 3, 3, 1);
                                          
select * from tbl_pizza;
						
#Insert na tabela pizza x tamanho
insert into tbl_pizza_x_tamanho(id_pizza, id_tamanho)
				values		   (7, 3),
							   (7, 4),
                               (8, 3),
                               (8, 4),
                               (9, 3),
                               (9, 4);	
                        
select tbl_produto.nome as nomeProduto, tbl_produto.descricao, tbl_pizza.imagem, tbl_tamanho_pizza.tamanho, tbl_tamanho_pizza.preco, tbl_tipo_pizza.tipo
	from tbl_pizza
		inner join tbl_produto
			on tbl_produto.id = tbl_pizza.id_produto
		inner join tbl_tipo_pizza
			on tbl_tipo_pizza.id = tbl_pizza.id_tipo
		inner join tbl_pizza_x_tamanho
			on tbl_pizza.id = tbl_pizza_x_tamanho.id_pizza
		inner join tbl_tamanho_pizza
			on tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho
order by nomeProduto;
            
select * from tbl_pizza;
            
#Insert na tabela de bebida
insert into tbl_bebida(imagem, id_produto, id_tipo)
				values('https://trimais.vteximg.com.br/arquivos/ids/1019586-310-310/foto_original.jpg?v=637480432555170000', 4, 2),
					  ('https://static.clubeextra.com.br/img/uploads/1/415/19804415.jpg', 5, 2);
                      
select * from tbl_bebida;
                      
#Insert na tabela de tamanho x bebida
insert into tbl_bebida_x_tamanho(id_bebida, id_tamanho)
					values		(7, 16),
								(7, 17),
                                (7, 21),
                                (8, 16),
                                (8, 17),
                                (8, 21);
                                
select * from tbl_bebida_x_tamanho;

select tbl_produto.nome, tbl_bebida.imagem, tbl_tamanho_bebida.tamanho, tbl_tamanho_bebida.preco, tbl_tipo_bebida.tipo
	from tbl_bebida
		inner join tbl_produto
			on tbl_produto.id = tbl_bebida.id_produto
		inner join tbl_tipo_bebida
			on tbl_tipo_bebida.id = tbl_bebida.id_tipo
		inner join tbl_bebida_x_tamanho
			on tbl_bebida.id = tbl_bebida_x_tamanho.id_bebida
		inner join tbl_tamanho_bebida
			on tbl_tamanho_bebida.id = tbl_bebida_x_tamanho.id_tamanho;


desc tbl_bebida_x_tamanho;

#Insert na tabela de tipo mensagem
INSERT INTO tbl_tipo_mensagem(tipo)
						values('Sugestão'),
                        ('Crítica');

Select * from tbl_tipo_mensagem;

#Insert na tabela de mensagem
insert into tbl_mensagem(nome, email, celular, mensagem, id_tipo)
				values  ('Césio Miranda', 'cesiomiranda@email.com', '11920391124', 'bla bla bla qualquer coisa e fds', 1);
    
select tbl_mensagem.nome, tbl_mensagem.email, tbl_mensagem.mensagem, tbl_tipo_mensagem.tipo
	from tbl_mensagem
		inner join tbl_tipo_mensagem
			on tbl_tipo_mensagem.id = tbl_mensagem.id_tipo;
    
desc tbl_mensagem;

#Insert na tabela intermediária Pizza x Ingrediente
INSERT INTO tbl_pizza_ingrediente(id_pizza, id_ingrediente)
					values		 (7, 1),
								 (7, 35),
								 (8, 2),
                                 (8, 6),
                                 (8, 20),
                                 (9, 1),
                                 (9, 2),
                                 (9, 20);
                                 
select tbl_produto.nome as nomeProduto, tbl_pizza.imagem, tbl_tamanho_pizza.tamanho, tbl_ingrediente.nome as nomeIngrediente from tbl_pizza
	inner join tbl_pizza_ingrediente
		on tbl_pizza.id = tbl_pizza_ingrediente.id_pizza
	inner join tbl_ingrediente
		on tbl_ingrediente.id = tbl_pizza_ingrediente.id_ingrediente
	inner join tbl_produto
		on tbl_produto.id = tbl_pizza.id_produto
	inner join tbl_tamanho_pizza
		on tbl_tamanho_pizza.id = tbl_pizza_x_tamanho.id_tamanho;
        
#Tabela intermediária pizza x tamanho
insert into tbl_pizza_x_tamanho(id_pizza, id_tamanho)
        




