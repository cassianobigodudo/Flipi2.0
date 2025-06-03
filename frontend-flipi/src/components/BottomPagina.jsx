import React, { useContext, useState } from 'react'
import './BottomPagina.css'
import { GlobalContext } from '../contexts/GlobalContext';

function BottomPagina({lado, paginaAtual, setPaginaAtual}) {
  const { livrosPesquisados } = useContext(GlobalContext); 

  const livrosPesquisadosObjeto = livrosPesquisados?.data || []
  const limiteLivros = livrosPesquisadosObjeto.length >= 0 ? Math.ceil(livrosPesquisadosObjeto.length / 6) : 0
  console.log(limiteLivros)
  
  function PaginaAnterior(){

    setPaginaAtual(paginaAtual - 1)
    console.log('Página Atual: ',paginaAtual - 1)
    
  }
  
  function ProximaPagina(){
    
    setPaginaAtual(paginaAtual + 1)
    console.log('Página Atual: ',paginaAtual + 1)
  }


  return (
    <div className="bottom-pagina">
        <div className="linhas-container">
            <div className="linha-um"></div>
            <div className="linha-dois"></div>
        </div>
        {lado == 'esquerdo' ? 
        <div className="bottom-esquerdo">
          {limiteLivros > 0 && paginaAtual > 0 ? 
          <button className='btn-trocar-pagina'
          onClick={PaginaAnterior}>Página Anterior</button>
          : null}
        </div> 
        : 
        <div className="bottom-direito">
          {limiteLivros > 0 && paginaAtual < limiteLivros -1 ? 
          (<button className='btn-trocar-pagina'
          onClick={ProximaPagina}>Próxima Página</button>) 
          : null}
        </div>}
    </div>
  )
}

export default BottomPagina
