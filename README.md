# Financy
Repositório para o trabalho de Desenvolvimento de Sistemas II

Instalando as dependências

Frontend:
- npm install
- npx expo start

Backend:
- npm install
- npm run typeorm migration:run
- npm start
  
# Documentação

O projeto "Financy" é uma plataforma que auxilia os usuários a gerenciar suas finanças pessoais, com funcionalidades como registro de contas a pagar, controle de despesas, notificações de vencimento, e uma interface para acompanhamento das informações.

# Tecnologias utilizadas

- Frontend:

  - Framework: React Native com Expo.
  - Linguagem: TypeScript.
  - Bibliotecas:
    - Expo para desenvolvimento multiplataforma.
    - React Navigation para navegação entre telas.
    - Axios para requisições HTTP.
    - Outras dependências definidas no arquivo package.json.

- Backend
  - Framework: Node.js com Express.
  - ORM: TypeORM para gerenciar o banco de dados PostgreSQL.
  - Linguagem: TypeScript.
  - Banco de Dados: PostgreSQL.
  - Outras Tecnologias:
    - JWT (JSON Web Token) para autenticação.
    - Validator.js para validações de dados.
    - Middleware personalizado para tratamento de erros e validação.

# Estrutura do Projeto

Frontend:

- O diretório principal contém:
  - App.tsx: Ponto de entrada da aplicação, configurando as rotas e temas.
  - src/:
    - Context API para gerenciamento de estados globais.
    - Tela de login, registro, e listagem de contas.

Backend:

- O diretório principal contém:
  - src/:
    - controllers/: Implementação dos controladores das rotas, como criação de usuários e contas.
    - entity/: Definição das entidades de banco de dados (Usuário, Contas e Notificações).
    - middleware/: Função de autenticação da aplicação, usando JWT.
    - routes/: Definição das rotas de API.
    - migrations/: Scripts de migração para criação/alteração de tabelas no banco de dados.

# Funcionalidades Implementadas

Gerenciamento de Usuários:
  - Registro de novos usuários.
  - Login com autenticação JWT.
    
Gestão de Contas:
  - Criação, edição e exclusão de contas.
  - Listagem de contas por status (pagas, pendentes).
  - Gráfico com o total de despesas do usuário.
  - Notificações automáticas de contas próximas ao vencimento.
