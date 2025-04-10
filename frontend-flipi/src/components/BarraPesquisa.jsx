import React from 'react'
import './BarraPesquisa.css'

function BarraPesquisa() {
  return (
    <div className="barra-pesquisa">

        <svg className='btn-filter' xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24"><path fill="none" stroke="#c85b34" strokeLinecap="round" strokeMiterlimit={10} strokeWidth={1.5} d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"></path></svg>
    
        <input type="text" className='inpt-pesquisar' placeholder='Pesquise um livro em específico'  />
        <button className="btn-pesquisa"
        onClick={() => navigate("/telapesquisa")}>
            <img className='icon-pesquisar' src="public/icons/big-search-len.png" alt="" />
        </button>
        
      
    </div>
  )
}

export default BarraPesquisa
