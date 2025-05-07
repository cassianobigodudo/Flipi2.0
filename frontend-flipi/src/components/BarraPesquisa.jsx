import React, { useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import './BarraPesquisa.css'

// Componente Modal reutilizável
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <img className='img-prendedor' src="public/images/Prendedor.svg" alt="" />
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

// Componente de checkbox reutilizável
const GeneroCheckbox = ({ genre, isChecked, onChange }) => {
  return (
    <button className='checkbox-filtros' onClick={onChange}>
      <img 
        src={isChecked ? "./images/checkbox marcada.png" : "./images/checkbox vazia.png"} 
        className={isChecked ? 'checkbox-marcada' : 'checkbox'} 
      /> 
      {genre}
    </button>
  );
};

function BarraPesquisa() {
  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Função para abrir e fechar o modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  // Estado para armazenar os gêneros selecionados
  const [generosSelecionados, setGenerosSelecionados] = useState({
    ficcao: false,
    thriller: false,
    fantasia: false,
    comedia: false,
    biografia: false,
    crimes: false,
    acaoAventura: false,
    romance: false,
    terror: false,
    medieval: false,
    drama: false
  });
  
  // Lista de gêneros para exibir
  const generos = [
    { id: 'ficcao', label: 'Ficção Científica' },
    { id: 'thriller', label: 'Thriller' },
    { id: 'fantasia', label: 'Fantasia' },
    { id: 'comedia', label: 'Comédia' },
    { id: 'biografia', label: 'Biografia' },
    { id: 'crimes', label: 'Crimes' },
    { id: 'acaoAventura', label: 'Ação e Aventura' },
    { id: 'romance', label: 'Romance' },
    { id: 'terror', label: 'Terror' },
    { id: 'medieval', label: 'Medieval' },
    { id: 'drama', label: 'Drama' }
  ];
  
  // Função para alternar o estado de um gênero
  const toggleGenero = (genreId) => {
    setGenerosSelecionados(prevState => ({
      ...prevState,
      [genreId]: !prevState[genreId]
    }));
  };

  // Log para debug quando o modal muda de estado
  useEffect(() => {
    console.log(isModalOpen);
  }, [isModalOpen]);

  return (
    <div className="barra-pesquisa">
      {/* Botão de filtro */}
      <svg 
        className='btn-filter' 
        xmlns="http://www.w3.org/2000/svg" 
        width={48} 
        height={48} 
        viewBox="0 0 24 24" 
        onClick={openModal}
      >
        <path 
          fill="none" 
          stroke="#c85b34" 
          strokeLinecap="round" 
          strokeMiterlimit={10} 
          strokeWidth={1.5} 
          d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z" 
        ></path>
      </svg>
      
      {/* Campo de pesquisa */}
      <input 
        type="text" 
        className='inpt-pesquisar' 
        placeholder='Pesquise um livro em específico' 
      />
      
      {/* Botão de pesquisa */}
      <button 
        className="btn-pesquisa"
        onClick={() => navigate("/telapesquisa")}
      >
        <img 
          className='icon-pesquisar' 
          src="public/icons/big-search-len.png" 
          alt="" 
        />
      </button>

      {/* Modal de filtros */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="papel-container">
          {/* Cabeçalho do filtro */}
          <div className="filtros-header">
            <button onClick={closeModal} className='x-btn'>X</button>
            <label className='filtro-titulo-label'>Filtros</label>
            <div className="linha-preta-fina"></div>
          </div>

          <div className="filtros-body">



          {/* Seção de filtros por gênero */}
            <div className="opcoes-container">
            <label className='genero-label'>Gênero: </label>

              {generos.map(genre => (
                <GeneroCheckbox
                  key={genre.id}
                  genre={genre.label}
                  isChecked={generosSelecionados[genre.id]}
                  onChange={() => toggleGenero(genre.id)}
                />
              ))}
            </div>
            <div className="autor-editora-ano-container">

              <label className='lbl-opcoes'>Autor: </label>
              <input type="text" className='inpt-filtros' />
              <label className='lbl-opcoes'>Editora: </label>
              <input type="text" className='inpt-filtros' />
              <label className='lbl-opcoes'>Ano: </label>
              <input type="number" placeholder='YYYY' min={0} max={2025} className='inpt-filtros' />


            </div>



          {/* Outras seções de filtro que podem ser implementadas futuramente */}
          </div>


          {/* Botão para aplicar filtros */}
          <div className="aplicar-filtros-div">
            <button 
              onClick={closeModal}
              className="close-button"
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default BarraPesquisa