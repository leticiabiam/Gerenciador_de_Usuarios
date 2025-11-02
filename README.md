#Desafio Técnico - EXITI Soluções

##O que foi desenvolvido<br/>
Durante o desenvolvimento do desafio, foquei principalmente na construção do **frontend** da aplicação, utilizando **React** com **Vite**.
Também iniciei a configuração do **backend** com **Java** **+** **Spring** e **PostgreSQL**,porém, por ainda não ter experiência com Java, consegui apenas configurar parcialmente o banco.

##Frontend
•Desenvolvido com *React* e *Vite*.
•Criação de uma interface simples para:
 • Abrir a página principal;
 •Inserir dados em um formulário;
 •(O plano era que esses dados fossem enviados para uma tabela ligada ao Excel ou
banco de dados).
•Estrutura de componentes organizada e pronta para integração com o backend.

Backend (em progresso)
•Banco de dados *PostgreSQL* configurado e funcionno localmente
•A integração entre frontend e backend não foi concluída por falta de familiaridade com o ecossistema Java.

Como rodar o projeto

Frontend 
cd C:\Users\letic\Downloads\frontend-gerenciamento-usuarios>
npm install
npm run dev

O frontend roda em:
http://localhost:5173 (ou conforme configurado pelo Vite)

Backend 
Observação: o backend ainda está em desenvolvimento. A conexão com o frontend e o banco PostgreSQL não foi finalizada.

Dificuldades encontradas
A principal dificuldade foi no *backend com Java + Spring*, por ser uma tecnologia nova para mim.
Apesar de ter conseguido configurar o PostgreSQL e compreender a estrutura inicial, ainda não consegui:
• Criar as rotas de API para receber os dados do frontend;
•Fazer a integração completa com o banco de dados e com o frontend.

Próximos Passos / O que eu faria a seguir
Caso tivesse mais tempo e mais experiência com Java, eu:
• Concluiria a API REST com Spring Boot;
•Criaria os endpoints necessários para salvar e listar dados no PostgreSQL;
•Conectaria o frontend à API via fetch ou axios;
•Adicionaria testes e validações para garantir o fluxo completo de cadastro.
Para alcançar isso, pretendo estudar Java e Spring Boot por meio de cursos e tutoriais, a fim de consolidar o backend e completar a como forme foi solicitada aplicação.

Observação final
Mesmo não conseguindo finalizar o backend, busquei estruturar um frontend funcional, limpo e bem organizado, para demonstrar integração front ↔ back e facilitar testes locais, incluí um backend opcional em Node.js/Express (pasta backend-demo/) que implementa as mesmas rotas e o mesmo formato JSON que o enunciado espera. Ele serve apenas como mock / prova de conceito mas também pode receber implemetações futuras como o Java + Spring.
Agradeço à EXITI Soluções pela oportunidade e fico à disposição para explicar o raciocínio técnico e as decisões tomadas durante o desenvolvimento.
