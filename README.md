# Frontend — Gerenciamento de Usuários (React + Vite)

Este projeto implementa o frontend do desafio técnico, utilizando **React** e **Vite**.

## Motivo da escolha do Frontend
Durante o desenvolvimento do desafio, foquei principalmente na construção do **frontend** da aplicação, utilizando **React com Vite**, por familiaridade. Já que só ferramentas que comecei a utilizar no meu meio acadêmico.

Como ainda não possuo experiência prática com **Java**, inclui apenas o frontend conforme pedido.

## Funcionalidades
- Listagem de usuários (mock via `localStorage`)
- Criação, edição e exclusão
- Importação de Excel (.xlsx)
- Exportação XLSX
- Busca e paginação
- Tema claro/escuro (texto branco no modo escuro)

## Como rodar o projeto

### Pré-requisitos
- Ter o **Visual Studio Code** (ou outro editor de sua preferência) instalado.  
- Ter o **Node.js** (versão 18.0 ou 20.0 LTS) instalado no sistema.

---

### Passos para executar

1. **Baixe ou clone este repositório:**  
   ```bash
   git clone [link-do-repositório]

2. **Abra o projeto no Visual Studio Code.**

3. **No terminal, instale as dependências:**  
   ```bash
   npm install
4. **Inicie o projeto:**
    ```bash
    npm run dev
5. **Acesse o projeto no navegador:**
Geralmente disponível em: http://localhost:5173

Dica: Caso o comando npm não funcione, verifique se o Node.js está instalado corretamente em seu computador.

## Endpoints planejados para integração
O frontend foi desenvolvido em React + Vite e está preparado para integrar com os seguintes endpoints:

- `GET /users` — lista todos os usuários  
- `POST /users` — cria um novo usuário  
- `PUT /users/{id}` — atualiza um usuário  
- `DELETE /users/{id}` — remove um usuário  
- `POST /import` — importa usuários a partir de um arquivo Excel (.xlsx)

Esses endpoints podem ser implementados em um backend Java (conforme o desafio original) ou como fiz nesse projeto pelo Node.js.

## Dificuldades encontradas

A principal dificuldade foi no backend com **Java + Spring**, por ser uma tecnologia nova para mim. Apesar de ter conseguido configurar o banco no **PostgreSQL**, ainda não consegui:

- Criar as rotas de API para receber os dados do frontend;
- Fazer a integração completa com o banco de dados.

Para demonstrar integração front → back e facilitar testes locais, incluí um backend opcional em **Node.js/Express** (pasta `backend-demo`) que:

- Implementa as mesmas rotas e o mesmo formato JSON que o enunciado espera;
- Serve apenas como mock/prova de conceito.

Mas como solicitado também é possível reimplementar o backend em **Java (Spring Boot, etc.)**.

## Observação final 
Mesmo não conseguindo finalizar o backend, busquei estruturar um **frontend funcional, limpo e bem organizado**.

Obrigada **EXITI Soluções** pela oportunidade! Ficarei à disposição para **explicar o raciocínio técnico** e as decisões tomadas durante o desenvolvimento do desafio
