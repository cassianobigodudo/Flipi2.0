# FliPi - Biblioteca Virtual

### INTRODUÇÃO
O trabalho desenvolvido pelo nosso grupo, cujo membros são Cassiano Calazans Coelho Machado ([cassianobigodudo](https://github.com/cassianobigodudo)), Jaime António Cá ([jaime-ac](https://github.com/jaime-ac)), José Vitor de Mattos Pinheiro ([Jouusey](https://github.com/Jouusey)) e Rodrigo Albuquerque da Rocha Junior([jujubssss](https://github.com/jujubssss)). é referente a construção de um site com caráter de BIBLIOTECA VIRTUAL. A finalidade do site é posssilibitar que usuários cadastrados possam registrar livros que já leram em suas respectivas bibliotecas e com o principal objetivo de compartilhar uma resenha sobre o livro registrado no site, servindo dessa forma como uma ferramenta de recomendação de livros para outros usuários, baseada no compartilhamento de resenhas de livros.

## Requisitos Funcionais

1. (Legado-Refatorado) **Cadastro, Login, Edição e Exclusão de Usuários (RF-01):** O sistema deve permitir que novos usuários se cadastrem, acessem suas contas criadas, editem seus dados e excluam sua conta. (Responsável pelo CRUD do usuário: [Rodrigo](https://github.com/jujubssss))
2. (Legado Refatorado) **Visualização de Livros e Resenhas (RF-02):** O sistema deve permitir a visualização de livros registrados e de resenhas de outros usuários sem ter uma conta.
3. (Legado Refatorado) **Obrigatoriedade de Cadastro para Avaliar Livros (RF-03):** O sistema NÃO permite que o usuário crie uma resenha, avalie um livro, registre um livro por ISBN e curta outras resenhas sem ter uma conta.
4. (Legado Refatorado) **Cadastro, Edição e Remoção de Resenhas (RF-04):** O sistema deve permitir que usuários cadastrados criem, editem ou removam suas próprias resenhas dos livros registrados. (Responsável pelo CRUD das resenhas: [José](https://github.com/Jouusey))
5. (Legado-refatorado) **Notas dos livros (RF-05):** O sistema deve permitir que usuários cadastrados avaliem o livro na resenha de 1 a 5 estrelas.
6. (Legado-refatorado) **Curtida nas Resenhas** (RF-06): **O sistema deve permitir que usuários cadastrados possam curtir as resenhas de outros usuários cadastrados.
7. (Legado-refatorado) **Pesquisa de Livros (RF-07):** O sistema deve permitir a filtragem de livros por gênero, autor, editora, data de lançamento e título.
8. **ISBN para Cadastrar Livros (RF-08):** O sistema deve permitir que o usuário possa cadastrar livros utilizando o ISBN caso o livro não exista no banco de dados (Responsável pelo registro do ISBN no banco de dados: [Cassiano](https://github.com/cassianobigodudo))
9. **Criação de Lista de Livros (RF-09):** O sistema deve permitir que usuários cadastrados criem, atualizem ou removam suas próprias listas de livros com um título e descrição personalizadas. (Responsável pelo CRUD das listas personalizadas: [Jaime](https://github.com/jaime-ac))

## Requisitos Não Funcionais

1. (Legado) **Desempenho (RNF-01):** O sistema deve processar rapidamente as requisições de registro e consulta de livros, garantindo tempos de resposta inferiores a 3 segundos para a maioria das operações, mesmo com um grande volume de usuários.
2. (Legado) **Usabilidade (RNF-02):** O sistema deve disponibilizar uma interface intuitiva, amigável e de fácil navegação, com design responsivo, garantindo uma boa experiência tanto em dispositivos móveis quanto em desktops.
3. (Legado) **Escalabilidade (RNF-03):** O sistema deve ser capaz de suportar um aumento significativo no número de usuários e registros de livros, sem comprometer o desempenho.
4. (Legado) **Segurança (RNF-04):** O sistema deve proteger os dados dos usuários e as informações dos livros, garantindo a segurança das contas e a proteção contra ataques.
5. (Legado) **Atualização de Dados (RNF-05):** As informações devem ser atualizadas imediatamente após qualquer recomendação feita pelos usuários no site.
6. (Legado) **Restrição de Direitos Autorais (RNF-06):** O sistema não armazenará nem disponibilizará conteúdo ilegal que viole direitos autorais. Serão disponibilizados apenas links de referência confiáveis.
7. (Legado) **Suporte aos Navegadores (RNF-07):** O sistema será compatível com os navegadores Microsoft Edge, Google Chrome, além de dispositivos móveis.
8. (Legado) **Moderação (RNF-08):** Todo o conteúdo criado pelos usuários será monitorado e regulado de acordo com as regras estabelecidas, garantindo a segurança do ambiente virtual.

## Telas

### Landing Page 
![image](https://github.com/user-attachments/assets/1132db13-941e-4ab0-bbb7-bdd63e6bdbd9)

### Página de Cadastro  
![image](https://github.com/user-attachments/assets/c956a971-8740-43b9-ae52-42918f3baf29)


### Página de Login  
![image](https://github.com/user-attachments/assets/22c2823f-e7a7-44f8-af30-92d3e2c40e0a)


### Página Principal
![image](https://github.com/user-attachments/assets/ad0cc680-ac5d-4967-bf1e-4e0c64680a56)


### Página do Livro
![image](https://github.com/user-attachments/assets/d6b61577-543b-4acc-85da-7011d0e66070)


## Tela de Resenhas
![image](https://github.com/user-attachments/assets/08b08c66-f966-4766-9998-90e54096c9ec)


---

### Protótipos

## Tela de Resenhas

![image](https://github.com/user-attachments/assets/b8109b93-5435-46dd-92a8-4e8227f6f5a4)


### Tela de Pesquisa de Livros

![image](https://github.com/user-attachments/assets/df3ed783-b502-4e9c-a562-e0c068ccec96)


### Tela de Configuração de Usuário

![image](https://github.com/user-attachments/assets/1f023b63-6810-4e7a-b4b9-77c3ed32b1a7)


![image](https://github.com/user-attachments/assets/ccf0650c-b348-41a4-8b63-28d64ad9c45c)


### Tela de Listas Personalizadas de Livros

![image](https://github.com/user-attachments/assets/6dfb747d-d61f-4d7a-b503-b3ef533e7836)

![image](https://github.com/user-attachments/assets/426f96bf-a87b-4cc8-98ab-2bccc360a72b)

![image](https://github.com/user-attachments/assets/99524a80-6339-4ffb-b13d-71e8e5620b60)





---
## Paleta de cores
![image](https://github.com/user-attachments/assets/306015c4-87ee-4e47-8710-8942a2069528)

![image](https://github.com/user-attachments/assets/9405752d-27b6-4a56-be2d-bacaa5008e50)

**Membros do Grupo:**  
Cassiano Calazans Coelho Machado, Jaime António Cá, José Vitor de Mattos Pinheiro e Rodrigo Albuquerque da Rocha Junior
