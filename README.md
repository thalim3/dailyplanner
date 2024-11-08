# dailyplanner
Projeto realizado para a máteria Práticas Profissionais de Análise e Desenvolvimento de Sistemas da Universidade Presbiteriana Mackenzie.

Segue abaixo as instruções detalhadas para conseguir executar a aplicação em seu computador: 

1. Clone o projeto para a sua máquina.
2. Após download, entre na pasta "web" do projeto e digite no terminal ou IDE o comando "npm install".
3. Acesse a pasta "server", abra um terminal e digite o comando "npm install".
4. Ainda na pasta "server", digite os comandos abaixo para iniciar a instância do banco:
     npx prisma migrate dev --name init
     npx prisma generate
5. Ainda na pasta "server", iniciar o servidor com o comando no terminal "npm run dev".
6. Na pasta "web", iniciar o servidor com o comando no terminal "npm run dev".

Obs.: por default, o .env não sobe no projeto. É necessário criar um arquivo .env dentro da pasta "server" com a linha de código abaixo: 
DATABASE_URL="file:./dev.db"

Qualquer dúvida, estamos à disposição. 
