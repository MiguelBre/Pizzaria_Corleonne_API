create database db_pizzaria_corleonne;
drop database db_pizzaria_corleonne;

show databases;
show tables;

use db_pizzaria_corleonne;

#Tabela de Produto

create table tbl_produto(
	id INT NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    preco DECIMAL NOT NULL,
    descricao TEXT,
    desconto INT,
    UNIQUE INDEX(id),
    PRIMARY KEY(id)
);

alter table tbl_produto drop column preco;

describe tbl_produto;

#Tabela de Ingrediente

create table tbl_ingrediente(
	id int not null AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    UNIQUE INDEX(id),
    PRIMARY KEY(id)
);

desc tbl_ingrediente;

#Tabela de Tamanho da pizza
create table tbl_tamanho_pizza(
	id int not null auto_increment primary key,
    tamanho varchar(20) not null,
    UNIQUE INDEX(id)
);

alter table tbl_tamanho_pizza add column preco DECIMAL NOT NULL;

desc tbl_tamanho_pizza;

#Tabela de Tamanho da bebida
create table tbl_tamanho_bebida(
	id int not null auto_increment primary key,
    tamanho varchar(20) not null,
    UNIQUE INDEX(id)
);

alter table tbl_tamanho_bebida add column preco DECIMAL NOT NULL;

desc tbl_tamanho_bebida;

#Tabela de Tipo da pizza
create table tbl_tipo_pizza(
	id int not null auto_increment primary key,
    tipo varchar(20) not null,
    UNIQUE INDEX(id)
);

desc tbl_tipo_pizza;

#Tabela de Tipo da bebida
create table tbl_tipo_bebida(
	id int not null auto_increment primary key,
    tipo varchar(20) not null,
    UNIQUE INDEX(id)
);

desc tbl_tipo_bebida;

#Tabela de Pizza
create table tbl_pizza(
	id int not null auto_increment primary key,
    favorito INT,
    imagem VARCHAR(300),
    id_produto INT NOT NULL,
    id_tamanho INT NOT NULL,
    id_tipo INT NOT NULL,
    
    CONSTRAINT FK_produto_pizza
		FOREIGN KEY(id_produto)
        references tbl_produto(id),
        
	constraint FK_tipo_pizza_pizza
		foreign key(id_tipo)
        references tbl_tipo_pizza(id),
    
    UNIQUE INDEX(id)
);

alter table tbl_pizza drop constraint FK_tamanho_pizza_pizza;
alter table tbl_pizza drop column id_tamanho;


desc tbl_pizza;

create table tbl_pizza_x_tamanho(
	id int not null auto_increment primary key,
    id_pizza int not null,
    id_tamanho int not null,
    
    CONSTRAINT FK_tamanho_pizza
		FOREIGN KEY(id_tamanho)
        references tbl_tamanho_pizza(id), 
        
	constraint FK_pizza
		foreign key(id_pizza)
        references tbl_pizza(id),
    
    UNIQUE INDEX(id)
);

desc tbl_pizza_x_tamanho;

#Tabela de bebida
create table tbl_bebida(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    imagem VARCHAR(300),
    id_produto INT NOT NULL,
    id_tipo INT NOT NULL,
    
    constraint FK_produto_bebida
		foreign key(id_produto)
        references tbl_produto(id),
        
	constraint FK_tipo_bebida
		foreign key(id_tipo)
        references tbl_tipo_bebida(id),
    
    UNIQUE INDEX(id)
);

alter table tbl_bebida drop constraint FK_tamanho_bebida;
alter table tbl_bebida drop column id_tamanho;

desc tbl_bebida;

#Tabela Bebida x Tamanho
create table tbl_bebida_x_tamanho(
	id int not null auto_increment primary key,
    id_tamanho int not null,
    id_bebida int not null,
    
    constraint FK_tamanho
		foreign key(id_tamanho)
        references tbl_tamanho_bebida(id),
        
	constraint FK_bebida
		foreign key(id_bebida)
        references tbl_bebida(id),
        
	UNIQUE INDEX(id)
);

desc tbl_bebida_x_tamanho;

#Tabela de ingrediente e pizza
create table tbl_pizza_ingrediente(
	id INT NOT NULL AUTO_INCREMENT primary key,
    id_ingrediente INT NOT NULL,
    id_pizza INT NOT NULL,
    
    CONSTRAINT FK_ingredient_ingrediente_pizza
		FOREIGN KEY(id_ingrediente)
        REFERENCES tbl_ingrediente(id),
        
	CONSTRAINT FK_pizza_ingrediente_pizza
		FOREIGN KEY(id_pizza)
        REFERENCES tbl_pizza(id),
        
	UNIQUE INDEX(id)
);

desc tbl_pizza_ingrediente;

#Tabela do tipo de mensagem (sugestão/crítica)
create table tbl_tipo_mensagem(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(15) NOT NULL,
    UNIQUE INDEX(id)
);

desc tbl_tipo_mensagem;

#Tabela da mensagem
create table tbl_mensagem(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(80) NOT NULL,
    email VARCHAR(256) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    telefone VARCHAR(20),
    id_tipo INT NOT NULL,
    
    CONSTRAINT FK_tipo_mensagem
		FOREIGN KEY(id_tipo)
        REFERENCES tbl_tipo_mensagem(id),
        
	UNIQUE INDEX(id)
);

desc tbl_mensagem;

alter table tbl_mensagem add column mensagem TEXT NOT NULL;

#Tabela que armazena os dados do administrador
create table tbl_administrador(
	id int not null auto_increment primary key,
    nome VARCHAR(30) NOT NULL,
    sobrenome VARCHAR(30) NOT NULL,
    email VARCHAR(256) NOT NULL,
    senha VARCHAR(40) NOT NULL,
    unique index(id)
);

desc tbl_administrador;