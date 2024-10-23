# WebShopping - README

## Descrição do Projeto
Este projeto visa o desenvolvimento de uma plataforma de e-commerce simples, na qual os usuários poderão navegar por uma loja online, visualizar produtos, adicioná-los a um carrinho de compras e simular a finalização de pedidos. O sistema é composto por um front-end para interação do usuário e um back-end para gerenciamento de dados, autenticação e controle de produtos e pedidos.

## Objetivos Gerais
- Desenvolver uma plataforma funcional de comércio eletrônico, simples e intuitiva, que permita a compra de produtos.
- Proporcionar uma experiência de usuário fluida, com foco em usabilidade e design responsivo.
- Implementar uma estrutura de back-end eficiente para gerenciamento de produtos, usuários e pedidos.

## Funcionalidades

### Cadastro de Usuários (RF01)
- Usuários podem se cadastrar fornecendo nome, e-mail, endereço e senha.
- Envio de e-mail de confirmação de cadastro.

### Login e Autenticação (RF02)
- Login via e-mail e senha cadastrados.
- Sessão autenticada até logout manual do usuário.

### Visualização de Produtos (RF03)
- Exibição de lista de produtos com imagem, descrição, preço e categoria.
- Filtro e pesquisa por categoria, preço e nome.

### Detalhamento de Produto (RF04)
- Página de detalhes com descrição, avaliações e especificações do produto.

### Carrinho de Compras (RF05)
- Adição de produtos ao carrinho de compras.
- Visualização e edição dos itens no carrinho (adicionar/remover produtos e alterar quantidades).

## Requisitos Não Funcionais

### Segurança (RNF)
- Criptografia de senhas utilizando algoritmos seguros (ex.: bcrypt).
- Controle de acesso para proteger pedidos e histórico de compras.
- Admin com permissões específicas para gerenciar produtos e pedidos.

### Usabilidade (RNF)
- Interface intuitiva e design responsivo para dispositivos móveis, tablets e desktops.

### Escalabilidade (RNF)
- Arquitetura flexível para a adição de novos recursos e funcionalidades.
- Banco de dados projetado para suportar o crescimento de produtos e usuários.

### Compatibilidade (RNF)
- Compatível com navegadores populares (Google Chrome, Mozilla Firefox, Safari, Microsoft Edge).
- Suporte para diferentes sistemas operacionais (Windows, MacOS, iOS, Android).

### Privacidade (RNF)
- Garantia de privacidade de dados conforme LGPD e GDPR.
- Armazenamento seguro dos dados dos usuários, sem compartilhamento sem consentimento.

## Tecnologias Utilizadas
- **Front-end**: React, Next.js e Tailwind CSS.
- **Back-end**: Python (Flask)
- **Banco de Dados**: PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Segurança**: Bcrypt para criptografia de senhas
- **Serviços de E-mail**: Nodemailer ou qualquer serviço de envio de e-mails

## Contribuição
Se deseja contribuir com o projeto, faça um fork e envie um pull request com suas modificações. Todos os tipos de contribuições são bem-vindos!

## Licença
Este projeto é licenciado sob a Licença MIT.
