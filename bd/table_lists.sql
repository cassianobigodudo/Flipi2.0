CREATE TABLE listas (
    id SERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    descricao TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT*FROM listas;

INSERT INTO listas (nome, descricao)
VALUES ('Minhas Fantasias Favoritas', 'Livros de fantasia épica');

