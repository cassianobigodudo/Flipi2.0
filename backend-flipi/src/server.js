import express from 'express'
import cors from 'cors'
import pg from 'pg';
import fetch from 'node-fetch';
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
        editora_nome TEXT NOT NULL
    );`
    await client.query(createEditoraQuery);
    console.log(`Tabela "editora" verificada/criada com sucesso.`);

    const createAutorQuery = `
    CREATE TABLE IF NOT EXISTS autor(
        autor_id SERIAL PRIMARY KEY,
        autor_nome TEXT NOT NULL
    );`
    await client.query(createAutorQuery);
    console.log(`Tabela "autor" verificada/criada com sucesso.`);

    const createGeneroQuery = `
    CREATE TABLE IF NOT EXISTS genero(
        genero_id SERIAL PRIMARY KEY,
        genero_nome TEXT NOT NULL
    );`
    await client.query(createGeneroQuery);
    console.log(`Tabela "genero" verificada/criada com sucesso.`);

    const createLivroQuery= `
    CREATE TABLE IF NOT EXISTS livro (
        livro_isbn BIGINT PRIMARY KEY,
        livro_titulo VARCHAR(100) NOT NULL,
        livro_ano INTEGER NOT NULL,
        livro_sinopse TEXT NOT NULL,
        livro_capa TEXT NOT NULL,
        editora_id INTEGER,
        CONSTRAINT fk_livro_editora FOREIGN KEY (editora_id) REFERENCES EDITORA (editora_id) ON UPDATE CASCADE ON DELETE RESTRICT
    );`
    await client.query(createLivroQuery);
    console.log(`Tabela "livro" verificada/criada com sucesso.`);

    const createLivroAutorQuery= `
    CREATE TABLE IF NOT EXISTS livro_autor(
        livro_isbn BIGINT NOT NULL,
        autor_id INT NOT NULL,
        PRIMARY KEY (livro_isbn, autor_id),
        CONSTRAINT fk_livro_autor FOREIGN KEY (autor_id) REFERENCES AUTOR (autor_id) ON UPDATE CASCADE ON DELETE RESTRICT,
        CONSTRAINT fk_livro_isbn FOREIGN KEY (livro_isbn) REFERENCES LIVRO (livro_isbn) ON UPDATE CASCADE ON DELETE CASCADE        
    );`
    await client.query(createLivroAutorQuery);
    console.log(`Tabela "livro_autor" verificada/criada com sucesso.`)

    const createLivroGeneroQuery= `
    CREATE TABLE IF NOT EXISTS livro_genero(
        livro_isbn BIGINT NOT NULL,
        genero_id INT NOT NULL,
        PRIMARY KEY (livro_isbn, genero_id),
        CONSTRAINT fk_livro_genero FOREIGN KEY (genero_id) REFERENCES GENERO (genero_id) ON UPDATE CASCADE ON DELETE RESTRICT,
        CONSTRAINT fk_livro_isbn FOREIGN KEY (livro_isbn) REFERENCES LIVRO (livro_isbn) ON UPDATE CASCADE ON DELETE CASCADE        
    );`
    await client.query(createLivroGeneroQuery);
    console.log(`Tabela "livro_genero" verificada/criada com sucesso.`)

    
    //?-----RESENHA------?//

    const createResenhaQuery= `
   CREATE TABLE IF NOT EXISTS resenha(
    resenha_id SERIAL PRIMARY KEY,
    resenha_titulo VARCHAR(40),
    resenha_texto TEXT NOT NULL,
    resenha_nota INT NOT NULL,
    resenha_curtidas INT,
    usuario_id INT NOT NULL,
    livro_isbn BIGINT,

    CONSTRAINT fk_usuario_id FOREIGN KEY (usuario_id) REFERENCES usuario (usuario_id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_livro_isbn FOREIGN KEY (livro_isbn) REFERENCES livro (livro_isbn) ON UPDATE CASCADE ON DELETE RESTRICT
);`
    
    await client.query(createResenhaQuery);
    console.log(`Tabela  "resenha" verificada/criada com sucesso.`)

  client.release();
//   await pool.end();
}


app.use(cors())
app.use(express.json())

async function buscarLivroPorISBN(isbn) {
    try {
        // Removendo hífens se houver
        const isbnLimpo = isbn.toString().replace(/-/g, '');
        console.log(isbnLimpo)
        
        // Buscando informações do livro
        const response = await fetch(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbnLimpo}&format=json&jscmd=data`);
        
        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status}`);
        }
        
        const data = await response.json();
        const chave = `ISBN:${isbnLimpo}`;
        
        // Verificando se o livro foi encontrado
        if (!data[chave]) {
            throw new Error('Livro não encontrado na API');
        }
        
        console.log(data[chave].subjects[0])
        return data[chave];

    } catch (error) {
        console.error('Erro ao buscar livro:', error);
        throw error;
    }
}

async function obterOuCriarEditora(nome) {
    if (!nome) return null;
    
    const client = await pool.connect();
    try {
        // Verifica se a editora já existe
        let result = await client.query('SELECT editora_id FROM editora WHERE editora_nome = $1', [nome]);
        
        if (result.rows.length > 0) {
            return result.rows[0].editora_id;
        }
        
        // Se não existir, cria uma nova editora
        result = await client.query(
            'INSERT INTO editora (editora_nome) VALUES ($1) RETURNING editora_id',
            [nome]
        );
        
        return result.rows[0].editora_id;
    } finally {
        client.release();
    }
}

// Função para obter ou criar um autor
async function obterOuCriarAutor(nome) {
    if (!nome) return null;
    
    const client = await pool.connect();
    try {
        // Verifica se o autor já existe
        let result = await client.query('SELECT autor_id FROM autor WHERE autor_nome = $1', [nome]);
        
        if (result.rows.length > 0) {
            return result.rows[0].autor_id;
        }
        
        // Se não existir, cria um novo autor
        result = await client.query(
            'INSERT INTO autor (autor_nome) VALUES ($1) RETURNING autor_id',
            [nome]
        );
        
        return result.rows[0].autor_id;
    } finally {
        client.release();
    }
}

// Função para obter ou criar um gênero
async function obterOuCriarGenero(nome) {
    if (!nome) return null;
    
    const client = await pool.connect();
    try {
        // Verifica se o gênero já existe
        let result = await client.query('SELECT genero_id FROM genero WHERE genero_nome = $1', [nome]);
        
        if (result.rows.length > 0) {
            return result.rows[0].genero_id;
        }
        
        // Se não existir, cria um novo gênero
        result = await client.query(
            'INSERT INTO genero (genero_nome) VALUES ($1) RETURNING genero_id',
            [nome]
        );
        
        return result.rows[0].genero_id;
    } finally {
        client.release();
    }
}

// Rota para adicionar um livro usando o ISBN da OpenLibrary
app.post('/livro/isbn/:isbn', async (req, res) => {
    const { isbn } = req.params;                     // Obtém o ISBN da URL
    const client = await pool.connect();             // Conecta ao banco
    
    try {
        await client.query('BEGIN');                 // Inicia uma transação
        
        // Verifica se o livro já existe no banco
        const livroExistente = await client.query('SELECT * FROM livro WHERE livro_isbn = $1', [isbn]);
        if (livroExistente.rows.length > 0) {
            await client.query('ROLLBACK');          // Desfaz a transação
            return res.status(400).json({ error: 'Livro já existe no banco de dados' });
        }
        
        // Busca dados do livro na API
        const dadosLivro = await buscarLivroPorISBN(isbn);
        
        // Extrai informações relevantes
        const titulo = dadosLivro.title || 'Título não disponível';
        // Extrai o ano usando regex para encontrar 4 dígitos juntos (ano)
        const ano = dadosLivro.publish_date ? parseInt(dadosLivro.publish_date.match(/\d{4}/)[0]) : 0;
        // Extrai a sinopse de diferentes possíveis locais nos dados retornados
        const sinopse = dadosLivro.excerpts ? dadosLivro.excerpts[0].text : (dadosLivro.description ? 
                       (typeof dadosLivro.description === 'string' ? dadosLivro.description : dadosLivro.description.value) : 
                       'Sinopse não disponível');
        const limitedSinopse = sinopse.substring(0, 399); // Limita a 400 caracteres
        
        // Obtém URL da capa do livro (se disponível)
        const capa = dadosLivro.cover ? dadosLivro.cover.large || dadosLivro.cover.medium || dadosLivro.cover.small : null;
        
        // Obtém ou cria editora
        const editoraNome = dadosLivro.publishers && dadosLivro.publishers.length > 0 ? dadosLivro.publishers[0].name : null;
        const editoraId = editoraNome ? await obterOuCriarEditora(editoraNome) : null;
        
        // Insere o livro no banco
        const livroResult = await client.query(
            'INSERT INTO livro (livro_isbn, livro_titulo, livro_ano, livro_sinopse, editora_id, livro_capa) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [isbn, titulo, ano, limitedSinopse, editoraId, capa]
        );
        
        // Processa e insere autores
        if (dadosLivro.authors && dadosLivro.authors.length > 0) {
            for (const autorInfo of dadosLivro.authors) {
                const autorId = await obterOuCriarAutor(autorInfo.name);
                await client.query(
                    'INSERT INTO livro_autor (livro_isbn, autor_id) VALUES ($1, $2)',
                    [isbn, autorId]
                );
            }
        }
        
        // Processa e insere gêneros/assuntos
        if (dadosLivro.subjects && dadosLivro.subjects.length > 0) {
        // Não limita mais a 5 gêneros, usa todos os gêneros disponíveis
            for (const generoInfo of dadosLivro.subjects) {
                const generoNome = typeof generoInfo === 'string' ? generoInfo : generoInfo.name;
                const generoId = await obterOuCriarGenero(generoNome);
                await client.query(
                    'INSERT INTO livro_genero (livro_isbn, genero_id) VALUES ($1, $2)',
                    [isbn, generoId]
                );
            }
        }
        
        await client.query('COMMIT');               // Confirma a transação
        
        // Busca o livro completo com suas relações para retornar na resposta
        const livroCompleto = await buscarLivroCompleto(isbn);
        res.status(201).json(livroCompleto);        // Retorna o livro criado (código 201: Created)
        
    } catch (err) {
        await client.query('ROLLBACK');             // Desfaz a transação em caso de erro
        console.error('Erro ao adicionar livro:', err.message);
        res.status(500).json({ error: 'Erro ao adicionar livro', detalhes: err.message });
    } finally {
        client.release();                           // Libera a conexão
    }
});

// Função para buscar livro completo com suas relações
async function buscarLivroCompleto(isbn) {
    const client = await pool.connect();
    try {
        // Busca informações básicas do livro
        const livroResult = await client.query('SELECT * FROM livro WHERE livro_isbn = $1', [isbn]);
        if (livroResult.rows.length === 0) {
            throw new Error('Livro não encontrado');
        }
        
        const livro = livroResult.rows[0];
        
        // Busca informações da editora
        if (livro.editora_id) {
            const editoraResult = await client.query('SELECT * FROM editora WHERE editora_id = $1', [livro.editora_id]);
            if (editoraResult.rows.length > 0) {
                livro.editora = editoraResult.rows[0];   // Adiciona informações da editora ao objeto livro
            }
        }
        
        // Busca autores do livro
        const autoresResult = await client.query(
            'SELECT a.* FROM autor a JOIN livro_autor la ON a.autor_id = la.autor_id WHERE la.livro_isbn = $1',
            [isbn]
        );
        livro.autores = autoresResult.rows;            // Adiciona lista de autores ao objeto livro
        
        // Busca gêneros do livro
        const generosResult = await client.query(
            'SELECT g.* FROM genero g JOIN livro_genero lg ON g.genero_id = lg.genero_id WHERE lg.livro_isbn = $1',
            [isbn]
        );
        livro.generos = generosResult.rows;            // Adiciona lista de gêneros ao objeto livro
        
        return livro;                                 // Retorna o livro com todas as relações
    } finally {
        client.release();                             // Libera a conexão
    }
}

app.get('/livro/:isbn', async (req, res) => {
    const { isbn } = req.params;                       // Obtém o ISBN da URL
    
    try {
        const livro = await buscarLivroCompleto(isbn); // Busca o livro completo
        res.json(livro);                              // Retorna o livro
    } catch (err) {
        console.error(err.message);
        res.status(404).json({ error: 'Livro não encontrado' });
    }
});

app.get('/livro', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM livro');
        res.json(result.rows);                        // Retorna todos os livros
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao buscar livros' });
    }
});


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


//* TABELA RESENHA


app.post('/resenha', async (req, res) => {
    const {resenha_titulo, resenha_texto, resenha_nota, resenha_curtidas, usuario_id, livro_isbn} = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO resenha 
            (resenha_titulo, resenha_texto, resenha_nota, resenha_curtidas, usuario_id, livro_isbn) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [resenha_titulo, resenha_texto, resenha_nota, resenha_curtidas, usuario_id, livro_isbn]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Erro ao cadastrar resenha!-Server' });
    }
});


app.get('/resenha', async (req, res) => {

    try {

        const result = await pool.query(
            'SELECT * FROM resenha'

        )
        res.status(200).json(result.rows)
    } catch (error) {

        console.error('Erro ao buscar resenha: ', error)
        res.status(500).json({ error: 'Erro ao buscar resenha'})

    }


})
 

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000! :D')
})
