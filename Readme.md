# Biblioteca

Aplicação que simula um sistema de uma biblioteca onde permite o usuário criar, editar e remover livros, além de conseguir reservar e devolver livros.

# Tecnologias utilizadas:

- Vue.js
- Nest.js
- PrismaORM
- Vuetify
- Typescript (frontend e backend)
- PostgreSQL (banco de dados)

# Executar aplicação

Backend

Para executar a aplicação o usuário deve possuir o Node.js instalado na sua máquina juntamente com o NPM, além do PostgreSQL versão 15 ou superior. Para gerar o banco o usuário deve executar:

``npx prisma migrate dev --name init``

Após isso o usuário deve executar:

``npx prisma generate``

E para inicar o servidor o usuário deve executar:

``npm run start:dev``

=============================================================================================================================

Frontend

Para executar a aplicação o usuário deve possuir o Node.js instalado em sua máquina juntamente com o NPM.

Para inicar a aplicação o usuário deve executar:

``npm run dev``

# Possíveis melhorias

Para uma melhor escalabilidade da aplicação seria interessante possuir uma tabela no banco de dados onde é armazenado os livros reservados juntamente com a quantidade.