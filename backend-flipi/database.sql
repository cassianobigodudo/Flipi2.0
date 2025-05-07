CREATE TABLE usuario (
    usuario_id SERIAL PRIMARY KEY,
    usuario_nome VARCHAR(100) NOT NULL,
    usuario_apelido VARCHAR(50),
    usuario_email VARCHAR(150) UNIQUE NOT NULL,
    usuario_senha VARCHAR(255) NOT NULL,
    url_foto VARCHAR(500) NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
