import { useState } from 'react'
import './PaginaTesteJaime.css'
import ListasLivros from '../components/ListasLivros'
import MinhaLista from '../components/MinhaLista'


function PaginaTesteJaime() {
    const [tela, setTela] = useState()

  return (
    <div className='container--teste'>

        <div className="container--dois">

            <div className="container--left">

                <button className="botao__criar--lista" onClick={() => setTela(<ListasLivros />)}>Criar Lista</button>
                <button className="botao__criar--lista" onClick={() => setTela(<MinhaLista />)}>Visualizar Lista</button>
                
            </div>

            <div className="container--right">

                {tela}

            </div>

        </div>
      
    </div>
  )
}

export default PaginaTesteJaime
