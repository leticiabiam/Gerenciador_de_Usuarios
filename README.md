**Desafio Técnico - EXITI Soluções**

**O que foi desenvolvido**<br/>

Durante o desenvolvimento do desafio, foquei principalmente na construção do **frontend** da aplicação, utilizando **React** com **Vite**.
Também iniciei a configuração do **backend** com **Java** **+** **Spring** e **PostgreSQL**,porém, por ainda não ter experiência com Java, consegui apenas configurar parcialmente o banco (PostgreSQL - CREATE DATABASE e CREATE TABELAS) .

**Frontend**<br/>
•Desenvolvido com **React** e **Vite**.<br/>
Criação de uma interface simples para:<br/>
 •Abrir a página principal;<br/>
 •Criar e alterar usúarios;<br/> 
 •Inserir e excluir dados em um formulário;(Nesse caso enviados para uma tabela ligada ao Excel).<br/>
 •Importação de documentos Excel<br/> 
Estrutura de componentes organizada e pronta para integração futura com o backend.

**Backend (em progresso)**<br/>
•Banco de dados **PostgreSQL** configurado e funcionando localmente<br/>
•A integração entre frontend e backend não foi concluída por falta de familiaridade com o ecossistema Java.

**Como rodar o projeto**

**Frontend**<br/>
cd C:\Users\letic\Downloads\frontend-gerenciamento-usuarios><br/>
npm install<br/>
npm run dev<br/>

O frontend roda em:
http://localhost:5173 (ou conforme configurado pelo Vite)

**Backend**<br/>
Observação: o backend ainda está em desenvolvimento. A conexão com o frontend e o banco PostgreSQL não foi finalizada.

**Dificuldades encontradas**<br/>
A principal dificuldade foi no **backend com Java** **+** **Spring**, por ser uma tecnologia nova para mim.
Apesar de ter conseguido configurar o PostgreSQL e compreender a estrutura inicial, ainda não consegui:<br/>
•Criar as rotas de API para receber os dados do frontend;<br/>
•Fazer a integração completa com o banco de dados e com o frontend.<br/>

**Próximos Passos / O que eu faria a seguir**<br/>
Caso tivesse mais tempo e mais experiência com Java, eu:<br/>
•Concluiria a API REST com Spring Boot;<br/>
•Criaria os endpoints necessários para salvar e listar dados no PostgreSQL;<br/>
•Conectaria o frontend à API via fetch ou axios;<br/>
•Adicionaria testes e validações para garantir o fluxo completo de cadastro.
Para alcançar isso, pretendo estudar **Java e Spring Boot** por meio de cursos e tutoriais, a fim de consolidar o backend e completar conforme foi solicitada a aplicação.

**Observação final**<br/>
Mesmo não conseguindo finalizar o backend, busquei estruturar um frontend funcional, limpo e bem organizado, para demonstrar integração front ↔ back e facilitar testes locais, incluí um backend opcional em Node.js/Express (pasta backend-demo/) que implementa as mesmas rotas e o mesmo formato JSON que o enunciado espera. Ele serve apenas como mock / prova de conceito, mas também pode receber implemetações futuras como o Java + Spring.<br/>

Obrigada à **EXITI Soluções** pela oportunidade e fico à disposição para explicar o raciocínio técnico e as decisões tomadas durante o desenvolvimento.
