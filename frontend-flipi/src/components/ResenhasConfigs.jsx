import React, { useContext } from 'react'
import './ResenhasConfigs.css'
import { GlobalContext } from '../contexts/GlobalContext'
import LivroAleatorio from './LivroAleatorio'

function ResenhasConfigs() {
    const { reviews } = useContext(GlobalContext) // reviews: array de resenhas

    return (
        <div className='resenhas-container'>
            <div className="resenhas-usuario">
                <div className="resenhas-usuario-capa">
                    <div className="resenhas-usuario-livros-grid">
                        {reviews && reviews.length > 0 ? (
                            reviews.map((review, idx) => (
                                <div className="resenha-livro" key={review.id || idx}>
                                    <LivroAleatorio livro={review.livro} />
                                    <div className="resenhas-usuario-titulo">
                                        <label className='lbl-titulo'>{review.titulo}</label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="sem-resenhas">
                                <label>Você ainda não cadastrou nenhuma resenha.</label>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResenhasConfigs
