const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')

const app = express()

// Configurando pool para acesso ao banco de dados
const pool = new Pool({
    user: 'postgres', // Substitua pelo seu usuário do PostgreSQL / PGAdmin
    host: 'localhost',
    database: 'FlipiDB', // Nome da sua database no PostgreSQL / PGAdmin
    password: 'senai', // Substitua pela sua senha do PostgreSQL / PGAdmin
    port: 5432, // Porta padrão do PostgreSQL
})

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