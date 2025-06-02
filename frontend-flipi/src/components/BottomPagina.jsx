import React, { useContext } from 'react'
import './BottomPagina.css'
import { GlobalContext } from '../contexts/GlobalContext';

function BottomPagina({lado, paginaAtual}) {
  const { livrosPesquisados } = useContext(GlobalContext); 
  return (
    <div className="bottom-pagina">
        <div className="linhas-container">
            <div className="linha-um"></div>
            <div className="linha-dois"></div>
        </div>
        {lado == 'esquerdo' ? 
        <div className="bottom-esquerdo">
          <button className='btn-trocar-pagina'>Página Anterior</button>
        </div> 
        : 
        <div className="bottom-direito">
          <button className='btn-trocar-pagina'>Próxima Página</button>
        </div>}
    </div>
  )
}

export default BottomPagina
