# Frontend — Gerenciamento de Usuários (React + Vite)

Este projeto implementa o frontend do desafio técnico, utilizando **React** e **Vite**.

## Motivo da escolha do Frotend 
Durante o desenvolvimento do desafio, foquei principalmente na construção do frontend da aplicação, utilizando React com Vite, por familaridade. Já que são ferramentas que começei a utlizar no meu meio acadêmico. Como não tenho familiaridade prática com Java, incluí apenas o frontend conforme pedido.

## Funcionalidades
- Listagem de usuários (mock via `localStorage`)
- Criação, edição e exclusão
- Importação de Excel (.xlsx)
- Exportação XLSX
- Busca e paginação
- Tema claro/escuro (texto branco no modo escuro)

## Interface do Projeto

Abaixo estão algumas telas do frontend:

### Tela Principal
![Este sistema permite gerenciar usuários de forma simples e intuitiva.](/Desktop\tela-principal.png")

### Tela de Cadastro de Usuário
![Tela de Cadastro](./prints/cadastro.png)

### Dashboard
![Dashboard](./prints/dashboard.png)


## Como rodar
```bash
npm install
npm run dev
```
Abra no navegador: http://localhost:5173

## Dificudades encontradas 
A principal dificuldade foi no **backend com Java + Spring** por ser uma tecnologia nova para mim.
Apesar de ter conseguido configurar o banco no PostgreeSQL, ainda não consegui: 
•Criar as rotas de API para receber od=s dados do frontend;
•Fazer a integração completa com o banco de dados.
Para demonstrar integração front ↔ back e facilitar testes locais, incluí um backend opcional em Node.js/Express (pasta backend-demo/) que implementa as mesmas rotas e o mesmo formato JSON que o enunciado espera. Ele serve apenas como mock / prova de conceito. Mas como solicitado também é possivel reimplementar o backend em Java (Spring Boot, etc.)

## Observação final 
Mesmo não conseguindo finalizar o backend, busquei estruturar um frontend funcional, limpo e bem organizado.
Agradeço à **EXITI Soluções** pela oportunidade e ficarei à disposição para explicar o raciocínio técnico e as decisões tomadas durante o desenvolvimento do desafio.
