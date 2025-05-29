import React, { useState } from 'react'
import './TelaPesquisa.css'
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import NavbarRealOficial from '../components/NavbarRealOficial'
import BarraPesquisa from '../components/BarraPesquisa'
import LivrosPesquisados from '../components/LivrosPesquisados'
import ContainerDosLivrosPesquisados from '../components/ContainerDosLivrosPesquisados'
import BottomPagina from '../components/BottomPagina'
import Filtro from '../components/Filtro'


function TelaPesquisa() {
  
  const {livrosPesquisados, setLivrosPesquisados} = useContext(GlobalContext)
  const [paginaAtual, setPaginaAtual] = useState(0);


  return (
    <div className='container-pesquisa'>
      <div className="capa-fundo-livro-um">
        <div className="capa-fundo-livro-dois">
          <div className="capa-fundo-livro-tres">
            <div className="navbar-container">
              <NavbarRealOficial/>
            </div>
            <div className="folha-esquerda">
              <Filtro/>
              <BarraPesquisa/>
              <ContainerDosLivrosPesquisados
              lado='esquerdo'
              paginaAtual={paginaAtual}
              />
              <BottomPagina/>
            </div>

            <div className="folha-direita">
              <div className="vazio-pagina-direita"></div>
              <ContainerDosLivrosPesquisados
              lado='direito'
              paginaAtual={paginaAtual}
              />
              <BottomPagina/>
            </div>

            <div className="vazio-direita">
              
            </div>

          </div>

        </div>

      </div>
      
    </div>
  )
}

export default TelaPesquisa
