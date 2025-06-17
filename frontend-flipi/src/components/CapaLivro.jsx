import React, { useState } from 'react'
import './CapaLivro.css'

function CapaLivro({ capa, titulo, deletarLivro, visualizarLixeira, onClick }) {

  return (
    <div className='box__livro' onClick={onClick}>

        <div className="capa__livro">

            <img src={capa} alt="" className='imagem__livro'/>

        </div>

        <div className="titulo__livro">

            <label htmlFor="">{titulo}</label>

        </div>
        
        {visualizarLixeira && (
        <div className="apagar__livro" onClick={(e) => {
          e.stopPropagation(); // Evita que o clique no botão dispare o onClick da capa
          deletarLivro?.();
        }}>
          <img
            src="./public/icons/delete-book.svg"
            alt="Apagar livro"
            className="image-delete-book"
          />
        </div>
      )}
  
    </div>
  )
}

export default CapaLivro
