const atualizarCatalogo = async () => {
        try {
            // Busca todas as resenhas
            const resenhasResponse = await axios.get(`http://localhost:3000/resenha`);
            const resenhas = resenhasResponse?.data || [];

            // Busca o ID do usuário logado do contexto global
            const { user } = useContext(GlobalContext);
            const userId = user?.usuario_id;

            // Filtra apenas as resenhas do usuário logado
            const minhasResenhas = resenhas.filter(resenha => resenha.usuario_id === userId);

            // Para cada resenha do usuário, busca o livro correspondente pelo ID
            const livrosPromises = minhasResenhas.map(async (resenha) => {
                const livroId = resenha.livro_isbn;
                try {
                    const livroResponse = await axios.get(`http://localhost:3000/livro/${livroId}`);
                    return { ...livroResponse.data, resenha }; // Junta dados do livro e da resenha
                } catch (err) {
                    console.error(`Erro ao buscar livro ${livroId}:`, err);
                    return { resenha }; // Retorna só a resenha se falhar
                }
            });

            const livrosComResenhas = await Promise.all(livrosPromises);
            setLivros(livrosComResenhas);
            console.log('Livros com resenhas:', livrosComResenhas);
        } catch (error) {
            console.error('Erro ao puxar as resenhas:', error);
        }
    };