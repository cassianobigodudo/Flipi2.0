import React, { useContext, useEffect, useState } from 'react';
import './ResenhasConfigs.css';
import { GlobalContext } from '../contexts/GlobalContext';
import LivroAleatorio from './LivroAleatorio';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResenhasConfigs() {
    const { reviews,  dadosUsuarioLogado} = useContext(GlobalContext);
    const [livros, setLivros] = useState([]);
    const navigate = useNavigate();

    const userId = dadosUsuarioLogado?.usuario_id;

    const getLivroByIndex = (index) => {
        if (!livros || livros.length === 0) return {};
        return livros[index] || {};
    };

    const atualizarCatalogo = async () => {
        try {
            // Busca todas as resenhas
            const resenhasResponse = await axios.get(`http://localhost:3000/resenha`);
            const resenhas = resenhasResponse?.data || [];

            // Filtra apenas as resenhas do usuário logado
            const minhasResenhas = resenhas.filter(resenha => resenha.usuario_id === userId);

            // Para cada resenha, busca o livro correspondente pelo ID
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

    useEffect(() => {
        atualizarCatalogo();
    }, []);
    const [popupOpen, setPopupOpen] = useState(false);
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    const handleLivroClick = (livro) => {
        setLivroSelecionado(livro);
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
        setLivroSelecionado(null);
    };

    // Função para deletar a resenha
    const handleDeleteResenha = async () => {

        if (!livroSelecionado?.resenha?.resenha_id) {
            alert('Resenha não encontrada.');
            return;
        }
        try {
            await axios.delete(`http://localhost:3000/resenha/${livroSelecionado.resenha.resenha_id}`);
            closePopup();
            atualizarCatalogo();
        } catch (error) {
            alert('Erro ao deletar resenha.');
            console.error(error);
        }
    };

    return (
        <div className='resenhas-container'>
            <div className="Fila-livros">
                {livros.map((livro, idx) => (
                    <div className="box-titulo" key={idx}>
                        <button
                            className="btn-livro-home"
                            onClick={() => handleLivroClick(livro)}
                        >
                            {livro.livro_capa ? (
                                <img src={livro.livro_capa} alt="" />
                            ) : (
                                <div className="box-placeholder"></div>
                            )}
                            <p className='titulos-livros'>{livro.livro_titulo}</p>
                        </button>
                    </div>
                ))}
            </div>
            {popupOpen && livroSelecionado && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-content" onClick={e => e.stopPropagation()}>
                            <h2 className='h2-title'>{livroSelecionado.livro_titulo}</h2>
                        <div className="popup-itens">

                        <button
                            className="close-popup"
                            onClick={closePopup}>
                            X
                        </button>
                        {livroSelecionado.livro_capa && (
                            <img src={livroSelecionado.livro_capa} alt="" style={{ maxWidth: '150px' }} />
                        )}
                        <div className="popup-info">
                        <div>
                            <strong className="popup-text">Título da Resenha:</strong>{" "}
                            {livroSelecionado.resenha?.resenha_titulo ?? "Sem título"}
                        </div>
                        <div>
                            <strong className="popup-text">Avaliação:</strong>{" "}
                            {livroSelecionado.resenha?.resenha_nota ?? "Sem avaliação"}
                            /5
                        </div>
                        <div>
                            <strong className="popup-text">Comentário:</strong>{" "}
                            {livroSelecionado.resenha?.resenha_texto ?? "Sem comentário"}
                        </div>
                        </div>
                        </div>
                        <div className="btn-delete-resenha">
                        <button
                            className="btn-deletar-resenha"
                            onClick={handleDeleteResenha}
                        >
                            Deletar Resenha
                        </button>
                        {/* iusfebhpwurb */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ResenhasConfigs;
