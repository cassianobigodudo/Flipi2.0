import React, { useContext, useEffect } from 'react'
import './ContainerDosLivrosPesquisados.css'
import LivrosPesquisados from './LivrosPesquisados'
import { GlobalContext } from '../contexts/GlobalContext'

function ContainerDosLivrosPesquisados({ lado, paginaAtual }) {
    const { livrosPesquisados } = useContext(GlobalContext);
    
    // useEffect(() => {
    //     console.log("Livros que foram trazidos do globalcontext ", livrosPesquisados)
    //     // Para debug: veja também o array de livros específico
    //     if (livrosPesquisados?.data) {
    //         console.log("Array de livros: ", livrosPesquisados.data)
    //     }
    // }, [livrosPesquisados])

    const calcularIndices = () => {
        const livrosPorPagina = 6; // 3 para cada lado
        const inicioPagina = paginaAtual * livrosPorPagina;
        
        if (lado === 'esquerdo') {
            // Lado esquerdo: livros 0,1,2 (página 0) ou 6,7,8 (página 1) etc
            return {
                inicio: inicioPagina,
                fim: inicioPagina + 3
            };
        } else {
            // Lado direito: livros 3,4,5 (página 0) ou 9,10,11 (página 1) etc
            return {
                inicio: inicioPagina + 3,
                fim: inicioPagina + 6
            };
        }
    };

    const { inicio, fim } = calcularIndices();
    const todosLivros = livrosPesquisados?.data || [];
    const livros = todosLivros.slice(inicio, fim);

    return (
        <div className="livros-pesquisados-container">
            {livros && livros.length > 0 ? (
                livros.map(livro => (
                    <LivrosPesquisados 
                        key={livro.livro_isbn} 
                        livro={livro}
                    />
                ))
            ) : (
                <div className="sem-resultados">
                    <p>Nenhum livro encontrado</p>
                </div>
            )}
        </div>
    )
}

export default ContainerDosLivrosPesquisados