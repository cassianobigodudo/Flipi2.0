# FliPi - Biblioteca Virtual

### INTRODUÇÃO
O trabalho desenvolvido pelo nosso grupo, cujo membros são Cassiano Calazans Coelho Machado ([cassianobigodudo](https://github.com/cassianobigodudo)), Jaime António Cá ([jaime-ac](https://github.com/jaime-ac)), José Vitor de Mattos Pinheiro ([Jouusey](https://github.com/Jouusey)) e Rodrigo Albuquerque da Rocha Junior([jujubssss](https://github.com/jujubssss)). é referente a construção de um site com caráter de BIBLIOTECA VIRTUAL. A finalidade do site é posssilibitar que usuários cadastrados possam registrar livros que já leram em suas respectivas bibliotecas e com o principal objetivo de compartilhar uma resenha sobre o livro registrado no site, servindo dessa forma como uma ferramenta de recomendação de livros para outros usuários, baseada no compartilhamento de resenhas de livros.

## Requisitos Funcionais

1. (Legado-Refatorado) **Cadastro, Login, Edição e Exclusão de Usuários (RF-01):** O sistema deve permitir que novos usuários se cadastrem, acessem suas contas criadas, editem seus dados e excluam sua conta. (Responsável pelo CRUD do usuário: [Rodrigo](https://github.com/jujubssss))
2. (Legado Refatorado) **Visualização de Livros e Resenhas (RF-02):** O sistema deve permitir a visualização de livros registrados e de resenhas de outros usuários sem ter uma conta.
3. (Legado Refatorado) **Obrigatoriedade de Cadastro para Avaliar Livros (RF-03):** O sistema NÃO permite que o usuário crie uma resenha, avalie um livro, registre um livro por ISBN e curta outras resenhas sem ter uma conta.
4. (Legado Refatorado) **Cadastro, Edição e Remoção de Resenhas (RF-04):** O sistema deve permitir que usuários cadastrados criem, editem ou removam suas próprias resenhas dos livros registrados. (Responsável pelo CRUD das resenhas: [José](https://github.com/Jouusey))
5. (Legado-refatorado)**Notas dos livros (RF-05):** O sistema deve permitir que usuários cadastrados avaliem o livro na resenha de 1 a 5 estrelas.
6. (Legado-refatorado)**Curtida nas Resenhas** (RF-06): **O sistema deve permitir que usuários cadastrados possam curtir as resenhas de outros usuários cadastrados.
7. (Legado-refatorado)**Pesquisa de Livros (RF-07):** O sistema deve permitir a filtragem de livros por gênero, autor, editora, data de lançamento e título.
8. **ISBN para Cadastrar Livros (RF-08):** O sistema deve permitir que o usuário possa cadastrar livros utilizando o ISBN caso o livro não exista no banco de dados (Responsável pelo registro do ISBN no banco de dados: [Cassiano](https://github.com/cassianobigodudo))
9. **Criação de Lista de Livros (RF-09):** O sistema deve permitir que usuários cadastrados criem, atualizem ou removam suas próprias listas de livros com um título e descrição personalizadas. (Responsável pelo CRUD das listas personalizadas: [Jaime](https://github.com/jaime-ac))

## Requisitos Não Funcionais

1. (Legado)**Desempenho (RNF-01):** O sistema deve processar rapidamente as requisições de registro e consulta de livros, garantindo tempos de resposta inferiores a 3 segundos para a maioria das operações, mesmo com um grande volume de usuários.
2. (Legado)**Usabilidade (RNF-02):** O sistema deve disponibilizar uma interface intuitiva, amigável e de fácil navegação, com design responsivo, garantindo uma boa experiência tanto em dispositivos móveis quanto em desktops.
3. (Legado)**Escalabilidade (RNF-03):** O sistema deve ser capaz de suportar um aumento significativo no número de usuários e registros de livros, sem comprometer o desempenho.
4. (Legado)**Segurança (RNF-04):** O sistema deve proteger os dados dos usuários e as informações dos livros, garantindo a segurança das contas e a proteção contra ataques.
5. (Legado)**Atualização de Dados (RNF-05):** As informações devem ser atualizadas imediatamente após qualquer recomendação feita pelos usuários no site.
6. (Legado)**Restrição de Direitos Autorais (RNF-06):** O sistema não armazenará nem disponibilizará conteúdo ilegal que viole direitos autorais. Serão disponibilizados apenas links de referência confiáveis.
7. (Legado)**Suporte aos Navegadores (RNF-07):** O sistema será compatível com os navegadores Microsoft Edge, Google Chrome, além de dispositivos móveis.
8. (Legado)**Moderação (RNF-08):** Todo o conteúdo criado pelos usuários será monitorado e regulado de acordo com as regras estabelecidas, garantindo a segurança do ambiente virtual.

## Telas

### Landing Page 
![Landing Page](https://trello.com/1/cards/67d87bd3a21598020db1d3b1/attachments/67d87bd6f68bd36ed15037a4/download/image.png)

### Página de Cadastro  
![Tela de Cadastro](https://trello.com/1/cards/67d87bd3a21598020db1d3b1/attachments/67d87ce735b033fc8f4dfa6a/download/image.png)

### Página de Login  
![Tela de Login](https://trello.com/1/cards/67d87bd3a21598020db1d3b1/attachments/67d87cfeacbb2a7661929ca7/download/image.png)

### Página Principal
![Tela Principal](https://trello.com/1/cards/67d87bd3a21598020db1d3b1/attachments/67d87d26e7b8242fced3dfdd/download/image.png)

### Página do Livro
![Tela do Livro](https://trello.com/1/cards/67d87bd3a21598020db1d3b1/attachments/67d87d9c2aea95d9da38558f/download/image.png)

### Escrivaninha

![Tela da Escrivaninha](https://trello.com/1/cards/67d87bd3a21598020db1d3b1/attachments/67d87dd90a22ae52a13ecd1e/download/image.png)

---

### Protótipos

### Tela de Pesquisa de Livros

![Tela de Pesquisa de Livros](https://trello.com/1/cards/67d85232fe31f9b907a3f18f/attachments/67d85236b30ae4d2613ea692/download/Frame_3.png)

### Tela de Configuração de Usuário

![Tela de Configuracao de Usuario](https://trello.com/1/cards/67d8834dc6b3e2e11e0cc212/attachments/67d88350776c570106c13077/download/Frame_9.png)

### Tela de Listas Personalizadas de Livros

![Tela de Listas Personalizadas de Livros](https://trello.com/1/cards/67d3375d036bf85216b83ad4/attachments/67d337f9866270a6f048612c/download/Livros_da_lista.png)


---
## Paleta de cores
![image](https://github.com/user-attachments/assets/306015c4-87ee-4e47-8710-8942a2069528)

![image](https://github.com/user-attachments/assets/9405752d-27b6-4a56-be2d-bacaa5008e50)

**Membros do Grupo:**  
Cassiano Calazans Coelho Machado, Jaime António Cá, José Vitor de Mattos Pinheiro e Rodrigo Albuquerque da Rocha Junior
