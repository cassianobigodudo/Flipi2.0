import React, { useState, useEffect, useRef } from 'react';
import './LivrosPesquisados.css';
import { MdOutlineContentCopy } from "react-icons/md";

function LivrosPesquisados({ livro }) {
  
  const [switchClassName, setSwitchClassName] = useState('isbn-botao-container');
  const [switchLabel, setSwitchLabel] = useState('ISBN');
  
  // Criar uma referência para o elemento que queremos adicionar o evento de scroll
  const tituloRef = useRef(null);
// 
  // useEffect(() => (
  //   BuscarAutor()
  // ), [])

  // async function BuscarAutor(){

  //   await axios.get()

  // }
  
  function SwitchISBN() {
    if(switchLabel === 'ISBN') {
      setSwitchLabel(`ISBN: ${livro.livro_isbn}`);
    } else {
      setSwitchLabel('ISBN');
    }
    
    if(switchClassName === 'isbn-botao-container') {
      setSwitchClassName('isbn-botao-container-ativado');
    } else {
      setSwitchClassName('isbn-botao-container');
    }
  }
  
  // Usar useEffect para adicionar o event listener depois que o componente for montado
  useEffect(() => {
    const container = tituloRef.current;
    
    if (container) {
      const handleWheel = (event) => {
        // Force sempre rolar horizontalmente, independente de shift
        event.preventDefault();
        
        // Ajuste a velocidade do scroll conforme necessário
        const scrollSpeed = 0.8; // Aumentar para scroll mais rápido
        container.scrollLeft += event.deltaY * scrollSpeed;
      };
      
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      // Limpar o event listener quando o componente for desmontado
      return () => {
        container.removeEventListener('wheel', handleWheel);
      };
    }
  }, []); // Array vazio significa que este efeito só executa uma vez após a montagem inicial

  return (
    <div className="livro-unidade-pesquisado">
        <div className="isbn-container">
          <div className={switchClassName} onClick={SwitchISBN}>
            <label className='lbl-isbn' onClick={SwitchISBN}>{switchLabel}</label>
          </div>
          {switchClassName === 'isbn-botao-container-ativado' && 
            <MdOutlineContentCopy 
              className='copy-icon' 
              onClick={() => {navigator.clipboard.writeText(livro.livro_isbn)}} 
            />
          } 
        </div>

        <div className="pesquisado-container">
            <div className="livro-capa-container">
              <img src={livro.livro_capa} className='img-livro-pesquisado' alt={`Capa do livro ${livro.livro_titulo}`} />
            </div>

            <div className="livro-info-container">
                <div className="titulo-autor-data-container">
                  <div className="titulo-livro-pesquisado" ref={tituloRef}>
                    <label className='lbl-titulo-pesquisa'>{livro.livro_titulo}</label>
                  </div>

                  <div className="autor-ano-pesquisado">
                    <label className='lbl-autor'>Autor: {livro.autores || 'Não informado'}</label>
                    <label className='lbl-ano'>Ano: {livro.livro_ano}</label>
                  </div>
                </div>

                <div className="sinopse-container">
                  <label className='lbl-sinopse'>{livro.livro_sinopse}</label>
                </div>
            </div>
        </div>
    </div>
  );
}

export default LivrosPesquisados;