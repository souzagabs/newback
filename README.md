# Backend – Plataforma de Cursos Online

Este repositório contém o backend de uma plataforma de cursos online, responsável pela autenticação, autorização e gerenciamento de usuários, cursos, módulos, progresso do aluno e interações com o conteúdo. A API foi desenvolvida em Node.js utilizando Express e Prisma ORM, com banco de dados PostgreSQL hospedado no Neon.

O projeto segue o padrão REST e está preparado para integração com um front-end em React.

### **Tecnologias Utilizadas**

* **Node.js**
* **Express**
* **Prisma ORM**
* **PostgreSQL (Neon)**
* **JWT (JSON Web Token)**
* **BCrypt**
* **CORS**
* **Dotenv**

### **Arquitetura do Projeto**

A aplicação segue uma arquitetura organizada por responsabilidade, separando controllers, rotas, middlewares e camada de acesso ao banco de dados, facilitando a manutenção e a evolução do código.

```
src/
├── controllers/
│   ├── authController.js
│   ├── cursoController.js
│   ├── moduloController.js
│   ├── progressoController.js
│   ├── quizController.js
│   └── feedbackController.js
├── routes/
│   ├── authRoutes.js
│   ├── cursoRoutes.js
│   ├── moduloRoutes.js
│   ├── progressoRoutes.js
│   ├── quizRoutes.js
│   ├── feedbackRoutes.js
│   └── usersmeRoutes.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── prisma.js
├── server.js
prisma/
├── schema.prisma
└── migrations/
.env
package.json
```

### **Requisitos**

Node.js versão 18 ou superior
Banco de dados PostgreSQL

Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

DATABASE_URL=postgresql://usuario:senha@host:porta/banco?sslmode=require
JWT_SECRET=sua_chave_secreta
PORT=3000
CORS_ORIGIN=http://localhost:5173

### **Instalação**

Clone o repositório:
git clone <url-do-repositorio>

Instale as dependências:
npm install

Gere o Prisma Client:
npx prisma generate

Execute as migrations:
npx prisma migrate dev

Execução do Servidor
Ambiente de Desenvolvimento
npm run dev

Ambiente de Produção
npm start

Por padrão, o servidor será iniciado em:
http://localhost:3000

### **Autenticação**

A aplicação utiliza autenticação baseada em JWT (JSON Web Token).
Após o login, o token deve ser enviado em todas as rotas protegidas no header:

Authorization: Bearer <token>

O middleware authMiddleware é responsável por validar o token e disponibilizar os dados do usuário autenticado em req.user.

### **Tipos de Usuário**

A aplicação trabalha com dois perfis de usuário:

ALUNO
INSTRUTOR

O controle de acesso garante que apenas usuários do tipo INSTRUTOR possam criar, editar ou excluir cursos e módulos.

### **Segurança**

* **Senhas criptografadas com BCrypt**
* **Autenticação via JWT**
* **Proteção de rotas sensíveis por middleware**
* **CORS configurado para permitir apenas origens autorizadas**

### **Deploy**

O backend é compatível com plataformas como:

* **Render**
* **Railway**
* **Vercel (Serverless)**

É necessário configurar corretamente as variáveis de ambiente no serviço de deploy utilizado.

### **Status do Projeto**

* **Backend funcional**
* **Autenticação completa**
* **CRUD de cursos e módulos implementado**
* **Sistema de inscrição funcional**
* **Integração pronta para front-end em React, e funcionando**