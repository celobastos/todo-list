# To Do List - Gerenciador de Tarefas

## Visão Geral

O **To Do List** é uma aplicação web desenvolvida para permitir o gerenciamento de tarefas de forma eficiente e organizada. A aplicação inclui funcionalidades de autenticação, cadastro de membros, criação, edição, exclusão e listagem de tarefas com validações de dados e regras de negócio específicas.

O projeto foi construído utilizando **NestJS** no backend para a criação da API, **React** no frontend para a interface do usuário, e **MySQL** como banco de dados, com o **Prisma ORM** gerenciando a interação com o banco.

## Funcionalidades Principais

### Backend

O backend foi desenvolvido com **NestJS** e fornece uma API RESTful robusta, com autenticação JWT para proteção das rotas e interações seguras com o banco de dados MySQL.

- **Autenticação com JWT**: 
  - Os usuários podem se registrar e fazer login na plataforma. O login gera um token JWT que é utilizado para proteger as rotas que requerem autenticação.
  - O token JWT é armazenado no localStorage do frontend, permitindo que o usuário mantenha a sessão ativa durante a navegação.

- **Criação de Membros**: 
  - Novos membros podem ser cadastrados no sistema com as informações de nome, email e senha. O email é único, e a senha é hasheada antes de ser armazenada no banco de dados para garantir a segurança.
  - As senhas são criptografadas utilizando **bcrypt**, e durante o login, o sistema verifica a senha fornecida pelo usuário com o hash armazenado no banco de dados.

- **Criação de Tarefas**: 
  - Os membros podem criar tarefas associadas às suas contas. Cada tarefa tem um nome, uma descrição, uma prioridade e um status de finalização.
  - A prioridade pode ser definida como "Baixa", "Média" ou "Alta", sendo "Baixa" o valor padrão.
  - Validações de nome e descrição são feitas no backend para garantir que os dados fornecidos estejam dentro dos parâmetros estabelecidos.

- **Edição de Tarefas**: 
  - Tarefas podem ser editadas somente pelos membros que as criaram. A edição permite modificar o nome, descrição e prioridade, mas tarefas finalizadas não podem ser alteradas.
  - Apenas o criador da tarefa tem permissão para editá-la.

- **Exclusão de Tarefas**: 
  - Tarefas podem ser excluídas, mas, novamente, apenas pelo membro que as criou.
  - O backend realiza verificações para garantir que somente o criador possa excluir ou editar suas próprias tarefas.

- **Listagem de Tarefas**: 
  - As tarefas são listadas por prioridade e status de finalização. Todas as tarefas são visíveis para o membro autenticado, mas as ações de edição e exclusão são restritas ao criador.

### Frontend

O frontend foi desenvolvido com **React** e fornece uma interface de usuário intuitiva e responsiva para gerenciar tarefas.

- **Login e Cadastro**: 
  - Os usuários podem criar uma conta e se autenticar com seu email e senha. O frontend utiliza o token JWT recebido após o login para acessar as rotas protegidas.
  
- **Cadastro de Tarefas**: 
  - As tarefas podem ser cadastradas por meio de um formulário estilizado com validação de dados. O usuário define nome, descrição, prioridade e status de finalização da tarefa.

- **Edição e Exclusão de Tarefas**: 
  - Tarefas podem ser editadas e excluídas diretamente da interface, por meio de modais que facilitam a interação do usuário com o sistema.
  - As tarefas finalizadas são automaticamente movidas para uma coluna de "Tarefas Concluídas".

- **Logout**: 
  - O usuário pode se deslogar a qualquer momento, removendo o token JWT armazenado no navegador e retornando à tela de login.

### Regras de Negócio

- **Segurança nas Operações**: 
  - O backend protege todas as rotas que envolvem manipulação de tarefas ou dados de usuários por meio de JWT, garantindo que apenas membros autenticados possam acessar essas funcionalidades.
  
- **Validações**: 
  - Validações são aplicadas para garantir que os campos de nome e descrição de tarefas estão dentro dos limites permitidos (5-50 caracteres para nome e até 140 caracteres para descrição).
  - Ao marcar uma tarefa como finalizada, a data de término é registrada automaticamente no banco de dados e a tarefa não pode mais ser editada.

### Rotas de Membros

- **POST /membros**: Criação de um novo membro, com validação de email único e senha hasheada.
- **POST /auth/login**: Autenticação de membro, retornando um token JWT para acessar as rotas protegidas.
- **GET /membros/:id**: Obtém as informações de um membro específico.
- **DELETE /membros/:id**: Permite que um membro exclua sua própria conta, removendo também todas as suas tarefas.

### Rotas de Tarefas

- **POST /tarefas**: Criação de uma nova tarefa. É necessário o token JWT para autenticar a requisição e associar a tarefa ao membro autenticado.
- **GET /tarefas**: Lista todas as tarefas pertencentes ao membro autenticado.
- **PUT /tarefas/:id**: Atualiza uma tarefa existente, se o membro autenticado for o criador da tarefa.
- **DELETE /tarefas/:id**: Exclui uma tarefa, desde que o membro autenticado seja o criador.

## Instalação e Execução

### Pré-requisitos

- **Node.js** (versão 14 ou superior)
- **MySQL**

### Passos de Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/todo-list.git
   cd todo-list
   ```

2. Configure o banco de dados MySQL:
   - Crie um banco de dados no MySQL chamado `todolist`.
   - Atualize o arquivo `.env` com as credenciais do MySQL e a chave secreta JWT:

     ```
     DATABASE_URL="mysql://usuario:senha@localhost:3306/todolist"
     JWT_SECRET="sua-chave-secreta"
     ```

3. Instale as dependências do backend:
   ```bash
   cd backend
   npm install
   ```

4. Execute as migrações do Prisma para criar as tabelas no banco de dados:
   ```bash
   npx prisma migrate dev
   ```

5. Inicie o backend:
   ```bash
   npm run start
   ```

6. Instale as dependências do frontend:
   ```bash
   cd ../frontend
   npm install
   ```

7. Inicie o frontend:
   ```bash
   npm start
   ```

### Uso

1. Acesse `http://localhost:3000` no navegador.
2. Crie uma nova conta ou faça login com uma conta existente.
3. Adicione, edite e exclua tarefas de acordo com suas necessidades.

## Conclusão

O **To Do List** é um projeto que integra autenticação JWT, segurança nas operações de CRUD, e uma interface responsiva para gerenciar tarefas. Ele oferece uma experiência completa, com backend robusto e frontend amigável, permitindo que os membros gerenciem suas tarefas de maneira eficaz e segura.
