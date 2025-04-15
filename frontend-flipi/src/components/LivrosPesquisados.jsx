import React from 'react'
import './LivrosPesquisados.css'

function LivrosPesquisados() {
  return (
    <div className="livro-unidade-pesquisado">
        <div className="isbn-container">
            <label htmlFor="">ISBN</label>

        </div>

        <div className="pesquisado-container">
            <div className="livro-capa-container">
            </div>

            <div className="livro-info-container">

                <div className="titulo-autor-data-container">

                </div>

                <div className="sinopse-container">

                </div>
            </div>



        </div>
                
    </div>
  )
}

export default LivrosPesquisados
