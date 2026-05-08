#Criando database
create database db_exercicio_a_tarde;

#retorna a lista de databases existentes no BD
show databases;

#Ativa o database a ser utilizado
use db_exercicio_a_tarde;

#Retorna a lista de tabelas existentes dentro do database
show tables;


#Criando tabelas no BD

create table tbl_sexo (
	id int not null auto_increment primary key,
    sigla varchar(3) not null,
    sexo varchar(15) not null
);

#Retorna a estrutura da tabela
#(tipo dados, PK, FK, etc)
desc tbl_cliente;
describe tbl_sexo;

#Tabela de tipo telefone
create table tbl_telefone(
	id int not null auto_increment primary key,
    tipo varchar(15) not null
);

#Tabela de categoria
create table tbl_categoria(
	id int not null auto_increment primary  key,
    categoria varchar(5)
);

#Tabela de estado
create table tbl_estado(
	id int not null auto_increment primary key,
    sigla varchar(3) not null,
    nome varchar(30) not null
);

#Criando tabelas com relacionamento FK
create table tbl_cliente(
	id int not null auto_increment primary key,
    nome varchar(100) not null,
    cpf varchar(18) not null,
    data_nascimento date not null,
    email varchar(256),
    id_sexo int not null,
    
    constraint FK_SEXO_CLIENTE #Nome do relacionamento
    foreign key (id_sexo) #Define qual atributo será a FK
    references tbl_sexo(id) #Define de onde vira a FK
);

#Tabela telefone
create table tbl_telefone (
	id int null auto_increment primary key,
    numero varchar(25) not null,
    id_tipo_telefone int not null,
    id_cliente int not null,
    
    constraint FK_TIPOTELEFONE_TELEFONE
    foreign key(id_tipo_telefone)
    references tbl_tipo_telefone(id),
    
    #Relacionamento entre clinte e Telefine
    constraint FK_CLIENTE_TELEFONE
    foreign key (id_cliente)
    references tbl_cliente(id)
);
#Excluir o database e todas as suas tabelas
#drop database db_exercicio_a_tarde
show tables;

#Tabela Habilitaçãoptimize
create table tbl_habilitacao (
	id int not null auto_increment primary key,
    numero varchar(10) not null,
    data_valida date not null
);

#Modifica a estrutura de um atributo existente
alter table tbl_habilitacao
	modify column numero int not null;
    
alter table tbl_habilidade
	change column data_valida data_validade date not null;
    
alter table tbl_habilidacao
	add column id_cliente int not null;
    
alter table tbl_habilidacao
	drop column id_cliente;
    
#Adicionar uma constraint (Relacionamento)
alter table tbl_habilidacao
	
	add constraint FK_CLIENTE_HABILIDACAO
    foreign key(id_cliente)
    references tbl_cliente(id);
    
    #Permite remover um relacionamento 
    #Primeiro remove o nome da relação e depois o atributo()
    alter table tbl_habilidacao
		drop foreign key FK_CLIENTE_HABILIDACAO,
		drop column id_cliente;
    
desc tbl_habilidacao;
   