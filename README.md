# Test 55PBX

Collection do postman para teste criar imagens:
https://www.getpostman.com/collections/effbcd5fa3a6177fa783

Tecnologias utilizadas

* NodeJS
* Socket.IO
* Docker
* MongoDB

Instruções para instalação do banco de dados:

1 - Instalação do docker no link: https://docs.docker.com/docker-for-windows/install/

2 - Docker: Criando servidor MongoDB
    O primeiro passo será baixar a imagem do mongoDB, caso você faça uma pesquisa no Docker Hub, irá encontrar muitas imagens, mas eu particularmente gosto de utilizar a tutum/mongod. Para baixar essa imagem é bem simples, com o docker instalado no seu computador, execute o comando abaixo no seu terminal:

    1) Executar o comando docker pull tutum/mongodb

    2) Com a imagem do docker no seu host, vamos criar um container de servidor de banco de dados.

     Criação de servidor MongoDB
      1 - Abrir o docker-compose.yml que consta dentro da pasta docker/mongo no terminal
      2 - Executar o comando docker-compose up -d

3 - Tudo certo, agora você já possui um container rodando na sua maquina!

4 - Comandos para rodar a aplicação back-end

    1 - npm install
    2 - npm dev
  
5 - Comandos para rodar a aplicação front-end

    1 - npm install
    2 - npm start
