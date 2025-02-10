import React from 'react'
import './ResenhasConfigs.css'
import{ GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import EstrelasBtn from './EstrelasBtn'
import EstrelaCass from './EstrelaCass' 
import LivroAleatorio from './LivroAleatorio'  

function ResenhasConfigs() {
  return (
    <div className='resenhas-container'>

        {/* <img src="./images/star.svg" alt="" className="icone-estrela"/> */}
        <div className="resenhas-usuario">

            <div className="resenhas-usuario-capa">

                <div className="resenhas-usuario-livro">

                    <LivroAleatorio/>

                </div>

                <div className="resenhas-usuario-edicaoRemocao">
                    
                </div>

            </div>

            <div className="resenhas-usuario-infos">

                <div className="resenhas-usuario-titulo">
                    <label className='lbl-titulo'>O Eco do Silêncio</label>
                </div>

                <div className="resenhas-usuario-estrelas">

                    <EstrelaCass/>

                </div>

                <div className="resenhas-usuario-resenha">

                    <textarea className='textarea-resenha' 
                    cols="30" 
                    rows="10"
                    maxLength={800}
                    defaultValue={'"O Eco do Silêncio" é um drama psicológico sobre Sofia, que retorna à sua cidade natal para enfrentar um trauma de infância. A obra explora relações complexas e os silêncios que revelam emoções profundas. Com personagens bem desenvolvidos, é uma leitura introspectiva e emocional, focada na reflexão sobre o ser humano.'}></textarea>

                </div>

            </div>
        </div>

    </div>
  )
}

export default ResenhasConfigs