import React, { useState, useEffect, useRef } from 'react';
import './LivrosPesquisados.css';
import { MdOutlineContentCopy } from "react-icons/md";

function LivrosPesquisados() {
  
  const [switchClassName, setSwitchClassName] = useState('isbn-botao-container');
  const [switchLabel, setSwitchLabel] = useState('ISBN');
  const [numberISBN, setNumberISBN] = useState('9780689704505');
  
  // Criar uma referência para o elemento que queremos adicionar o evento de scroll
  const tituloRef = useRef(null);
  
  function SwitchISBN() {
    if(switchLabel === 'ISBN') {
      setSwitchLabel(`ISBN: ${numberISBN}`);
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
              onClick={() => {navigator.clipboard.writeText(numberISBN)}} 
            />
          } 
        </div>

        <div className="pesquisado-container">
            <div className="livro-capa-container">
              <img src="images/battle_royale.jpg" className='img-livro-pesquisado' alt="Capa do livro" />
            </div>

            <div className="livro-info-container">
                <div className="titulo-autor-data-container">
                  <div className="titulo-livro-pesquisado" ref={tituloRef}>
                    <label className='lbl-titulo-pesquisa'>Livro bonito que eu gosto muito, uma pena ele ser muito longo </label>
                  </div>

                  <div className="autor-ano-pesquisado">
                    <label className='lbl-autor'>Autor: Isabella Boscov Scandinavo</label>
                    <label className='lbl-ano'>Ano: 2026</label>

                  </div>
                </div>

                <div className="sinopse-container">
                  <label className='lbl-sinopse' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, nemo. Corporis, illum? Id, a. Quis voluptas fugiat odit accusamus veritatis minus sint cupiditate quibusdam porro omnis dignissimos quam, ipsam minima! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur debitis, soluta vitae hic, suscipit quia dignissimos ab quisquam ex quae placeat cumque voluptate provident necessitatibus praesentium rerum amet dicta reprehenderit.</label>

                </div>
            </div>
        </div>
    </div>
  );
}

export default LivrosPesquisados;