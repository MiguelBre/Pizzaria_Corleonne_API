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
const EXPIRES = 180;

//Função para criação do JWT (retorna um token)
const createJWT = async function(payLoad){

    //Gera o TOKEN
        //payLoad - a identificação do usuário autenticado
        //SECRET - a chave secreta
        //expiresIn - tempo de expiração do TOKEN
    const token = jwt.sign({adminID: payLoad}, KEYWORD, {expiresIn: EXPIRES});
    return token;
}

//Validação de autenticidade do JWT (recebe o token para validação)
const validateJWT = async function(token){

    let status = false;
    //Valida a autenticidade do token
    jwt.verify(token, KEYWORD, async function(err, decode){
        

        if (!err) {
            status = true;
        }

    });
    return status;
}

module.exports = {
    createJWT,
    validateJWT
}