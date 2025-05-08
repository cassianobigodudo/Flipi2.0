import React from 'react'
import './CapaLivro.css'

function CapaLivro({ capa, titulo, onClick}) {
  return (
    <div className='box__livro' onClick={onClick}>

        <div className="capa__livro">

            <img src={capa} alt="" className='imagem__livro'/>

        </div>

        <div className="titulo__livro">

            <label htmlFor="">{titulo}</label>

        </div>
  
    </div>
  )
}

export default CapaLivro
