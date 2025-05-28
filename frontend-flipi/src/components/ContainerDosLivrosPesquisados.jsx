import React, { useContext, useEffect } from 'react'
import './ContainerDosLivrosPesquisados.css'
import LivrosPesquisados from './LivrosPesquisados'
import { GlobalContext } from '../contexts/GlobalContext'

function ContainerDosLivrosPesquisados() {
    const { livrosPesquisados } = useContext(GlobalContext);
    
    useEffect(() => {
        console.log("Livros que foram trazidos do globalcontext ", livrosPesquisados)
        // Para debug: veja também o array de livros específico
        if (livrosPesquisados?.data) {
            console.log("Array de livros: ", livrosPesquisados.data)
        }
    }, [livrosPesquisados])

    // Pega o array de livros da propriedade 'data'
    const livros = livrosPesquisados?.data || [];

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