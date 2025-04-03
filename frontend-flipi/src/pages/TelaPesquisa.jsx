import React from 'react'
import './TelaPesquisa.css'
import { Link, useNavigate } from "react-router-dom"
import { GlobalContext } from '../contexts/GlobalContext'
import NavbarRealOficial from '../components/NavbarRealOficial'


function TelaPesquisa() {
  return (
    <div className='container-pesquisa'>
      <div className="capa-fundo-livro-um">
        <div className="capa-fundo-livro-dois">
          <div className="capa-fundo-livro-tres">
            <div className="navbar-container">
              <NavbarRealOficial/>
            </div>
            <div className="folha-esquerda">

            </div>

            <div className="folha-direita">

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
