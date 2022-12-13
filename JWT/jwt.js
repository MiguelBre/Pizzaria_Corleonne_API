/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Objetivo:        Implementação do JWT no projeto
 * Autor:           Miguel Antonio
 * Data_criação:    12/12/2022                
 * Versão:          1.0
 * 
 * npm install jsonwebtoken // Comando para instalar o JWT para autenticação dos admins, instalado na pasta raiz
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Import da biblioteca 
const jwt = require('jsonwebtoken');

//Chave secreta para criação do JWT
const KEYWORD = 'Mig05Leo06';

//Tempo para validar o token do JWT (segundos)
const expires = 120;

//Função para criação do JWT (retorna um token)
const createJWT = async function(payLoad){

}

//Validação de autenticidade do JWT (recebe o token para validação)
const validateJWT = async function(payLoad){

}