import React from 'react'
import './ContainerDosLivrosPesquisados.css'
import LivrosPesquisados from './LivrosPesquisados'

function ContainerDosLivrosPesquisados() {
  return (
    <div className="livros-pesquisados-container">
        <LivrosPesquisados/><LivrosPesquisados/><LivrosPesquisados/>
    </div>
  )
}

export default ContainerDosLivrosPesquisados
