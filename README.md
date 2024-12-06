# Financy
Repositório para o trabalho de Desenvolvimento de Sistemas II

Financy - Documentação
1. Visão Geral
O projeto "Financy" é uma plataforma que auxilia os usuários a gerenciar suas finanças pessoais, com funcionalidades como registro de contas a pagar, controle de despesas, notificações de vencimento, e uma interface para acompanhamento das informações.

2. Tecnologias Utilizadas
Frontend
Framework: React Native com Expo.
Linguagem: TypeScript.
Bibliotecas:
Expo para desenvolvimento multiplataforma.
React Navigation para navegação entre telas.
Axios para requisições HTTP.
Outras dependências definidas no arquivo package.json.
Backend
Framework: Node.js com Express.
ORM: TypeORM para gerenciar o banco de dados PostgreSQL.
Linguagem: TypeScript.
Banco de Dados: PostgreSQL.
Outras Tecnologias:
JWT (JSON Web Token) para autenticação.
Validator.js para validações de dados.
Middleware personalizado para tratamento de erros e validação.
3. Estrutura do Projeto
Frontend
O diretório principal contém:

App.tsx: Ponto de entrada da aplicação, configurando as rotas e temas.
src/:
Componentes reutilizáveis.
Context API para gerenciamento de estados globais.
Tela de login, registro, e listagem de contas.
assets/: Recursos como imagens e ícones.
Configuração do Expo: Definida em app.json.
Backend
O diretório principal contém:

src/:
controllers/: Implementação dos controladores das rotas, como criação de usuários e contas.
entity/: Definição das entidades de banco de dados (Usuário e Contas).
middleware/: Funções intermediárias, como autenticação.
routes/: Definição das rotas de API.
migrations/: Scripts de migração para criação/alteração de tabelas no banco de dados.
4. Funcionalidades Implementadas
Gerenciamento de Usuários:

Registro de novos usuários.
Login com autenticação JWT.
Alteração de informações pessoais.
Gestão de Contas:

Criação, edição e exclusão de contas.
Listagem de contas por status (vencidas, pagas, pendentes).
Notificações automáticas de contas próximas ao vencimento.
Sincronização Frontend/Backend:

API REST para comunicação entre o aplicativo e o servidor.
Integração segura com autenticação baseada em tokens.
5. Instruções para Execução
Frontend
Instale as dependências:
bash
Copiar código
npm install
Inicie o ambiente Expo:
bash
Copiar código
npx expo start
Backend
Configure as variáveis de ambiente no arquivo .env.
Instale as dependências:
bash
Copiar código
npm install
Execute as migrações:
bash
Copiar código
npm run typeorm migration:run
Inicie o servidor:
bash
Copiar código
npm run dev
