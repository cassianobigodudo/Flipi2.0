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

                        
                    <div className="resenhas-usuario-titulo">
                        <label className='lbl-titulo'>O Eco do Silêncio</label>
                    </div>

                </div>
            </div>

        </div>

    </div>
  )
}

export default ResenhasConfigs