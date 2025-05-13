import express from 'express'
import cors from 'cors'
import pg from 'pg';
const { Pool } = pg;

const app = express()


async function iniciarDB(){
    await verificarDB()
    await verificarTabelas()
}

iniciarDB().catch(error => {
    console.error('Erro na inicialização do Banco de Dados: ', error)
})

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'flipidb',
    password: 'senai',
    port: 5432 
  });

async function verificarDB(){

    // Configurando pool para acesso ao banco de dados
    const defaultPool = new Pool({
        user: 'postgres', // Substitua pelo seu usuário do PostgreSQL / PGAdmin
        host: 'localhost',
        database: 'postgres', // Nome da sua database no PostgreSQL / PGAdmin
        password: 'senai', // Substitua pela sua senha do PostgreSQL / PGAdmin
        port: 5432, // Porta padrão do PostgreSQL
    })
    
    const client = await defaultPool.connect();
    const nomeBanco = 'flipidb'
    
    const result = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [nomeBanco])
    
    if(result.rowCount == 0){
    
        console.log(`Banco de dados ${nomeBanco} não existe. Criando...`)
        await client.query(`CREATE DATABASE ${nomeBanco}`)
        console.log(`Banco de dados ${nomeBanco} criado com sucesso!`)
    } else {
    
        console.log(`Banco de dados ${nomeBanco} já existe.`)
    
    }
    
    client.release()
    await defaultPool.end()
}

async function verificarTabelas(){

    const client = await pool.connect();

    const createUsuarioQuery = `
    CREATE TABLE IF NOT EXISTS usuario(
        usuario_id SERIAL PRIMARY KEY,
        usuario_nome VARCHAR(40) NOT NULL,
        usuario_apelido VARCHAR(40) NOT NULL,
        usuario_email VARCHAR(80) NOT NULL,
        usuario_senha VARCHAR(30) NOT NULL
    );`
    await client.query(createUsuarioQuery);
    console.log(`Tabela "usuario" verificada/criada com sucesso.`);

    const createEditoraQuery = `
    CREATE TABLE IF NOT EXISTS editora(
        editora_id SERIAL PRIMARY KEY,
        editora_nome VARCHAR(40) NOT NULL
    );`
    await client.query(createEditoraQuery);
    console.log(`Tabela "editora" verificada/criada com sucesso.`);

    const createAutorQuery = `
    CREATE TABLE IF NOT EXISTS autor(
        autor_id SERIAL PRIMARY KEY,
        autor_nome VARCHAR(40) NOT NULL
    );`
    await client.query(createAutorQuery);
    console.log(`Tabela "autor" verificada/criada com sucesso.`);

    const createGeneroQuery = `
    CREATE TABLE IF NOT EXISTS genero(
        genero_id SERIAL PRIMARY KEY,
        genero_nome VARCHAR(40) NOT NULL
    );`
    await client.query(createGeneroQuery);
    console.log(`Tabela "genero" verificada/criada com sucesso.`);

    const createLivroQuery= `
    CREATE TABLE IF NOT EXISTS livro (
        livro_isbn BIGINT PRIMARY KEY,
        livro_titulo VARCHAR(100) NOT NULL,
        livro_ano INTEGER NOT NULL,
        livro_sinopse VARCHAR (400) NOT NULL,
        livro_media INTEGER,
        editora_id INTEGER,
        autor_id INTEGER,
        genero_id INTEGER,
        CONSTRAINT fk_livro_editora FOREIGN KEY (editora_id) REFERENCES EDITORA (editora_id) ON DELETE SET NULL,
        CONSTRAINT fk_livro_autor FOREIGN KEY (autor_id) REFERENCES AUTOR (autor_id) ON DELETE SET NULL,
        CONSTRAINT fk_livro_genero FOREIGN KEY (genero_id) REFERENCES GENERO (genero_id) ON DELETE SET NULL
    );`
    await client.query(createLivroQuery);
    console.log(`Tabela "livro" verificada/criada com sucesso.`);

    

  client.release();
  await pool.end();
}


app.use(cors())
app.use(express.json())

// Rota para inserção de user no banco de dados
app.post('/usuario', async (req, res) => {
    console.log('Dados recebidos no backend:', req.body);
    const {usuario_nome, usuario_apelido, usuario_email, usuario_senha} = req.body
    try {
        // Query para inserção do user no banco de dados
        const result = await pool.query(
            'INSERT INTO usuario (usuario_nome, usuario_apelido, usuario_email, usuario_senha) VALUES ($1, $2, $3, $4) RETURNING *',
            [usuario_nome, usuario_apelido, usuario_email, usuario_senha]
        )
        res.status(201).json(result.rows[0])
    } catch (err) {
        console.error(err.message)
        res.status(500).json({ error: 'Erro ao cadastrar usuário! :(' })
    }
})

// Rota para buscar todos os clientes
app.get('/usuario', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM usuario'

        )
        res.status(200).json(result.rows)
    } catch (error) {

        console.error('Erro ao buscar usuários: ', error)
        res.status(500).json({ error: 'Erro ao buscar usuário'})

    }


})

// Rota para buscar um cliente por ID
app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuario WHERE usuario_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// Rota para buscar um cliente por apelido
app.get('/usuario/apelido/:apelido', async (req, res) => {
    const { apelido } = req.params;
    try {
        const result = await pool.query('SELECT * FROM usuario WHERE usuario_apelido = $1', [apelido]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
});

// Rota para atualizar um cliente
app.put('/usuario/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    const { usuario_nome, usuario_email, usuario_senha  } = req.body;
    try {
        console.log('entrei no try')
        const result = await pool.query(
            'UPDATE usuario SET usuario_nome = $1, usuario_email = $2, usuario_senha = $3 WHERE usuario_id = $4 RETURNING *',
            [usuario_nome, usuario_email, usuario_senha, usuario_id]
        );
        console.log('fiz a query')
        console.log(usuario_id)
        if (result.rows.length === 0) {
            console.log('entrei no 404')
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        console.log('atualizei os dados')
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao atualizar usuario' });
    }
  });

  // Rota para deletar um cliente
app.delete('/usuario/:usuario_id', async (req, res) => {
    const { usuario_id } = req.params;
    try {
        const result = await pool.query('DELETE FROM usuario WHERE usuario_id = $1 RETURNING *', [usuario_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario não encontrado' });
        }
        res.json({ message: 'Usuario deletado com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao deletar usuario' });
    }
});



app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000! :D')
})