import React, { useEffect, useState } from 'react'
import { GlobalContext } from '../contexts/GlobalContext'
import { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import './BarraPesquisa.css'
import axios from 'axios'

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

function BarraPesquisa({setPaginaAtual}) {
  
  const navigate = useNavigate()
  const [inptPesquisa, SetInptPesquisa] = useState('')
  const {livrosPesquisados, setLivrosPesquisados} = useContext(GlobalContext)
  const [inptFiltroAutor, setInptFiltroAutor] = useState('')
  const [inptFiltroEditora, setInptFiltroEditora] = useState('')
  const [inptFiltroAno, setInptFiltroAno] = useState('')


  
  useEffect(() => {
    console.log("Livros que foram encontrados: ", livrosPesquisados)
  }, [livrosPesquisados])

  async function PesquisarLivro(){
    // Preparar os gêneros selecionados - CORRIGIDO
    const generosAtivos = Object.keys(generosSelecionados)
        .filter(key => generosSelecionados[key])
        .map(genreId => {
            // Encontrar o dbName correspondente ao ID
            const genero = generos.find(g => g.id === genreId);
            return genero ? genero.dbName : genreId;
        })
        .join(',');

    // Montar os parâmetros da URL
    const params = new URLSearchParams();
    if (generosAtivos) params.append('generos', generosAtivos);
    if (inptFiltroAutor) params.append('autor', inptFiltroAutor);
    if (inptFiltroEditora) params.append('editora', inptFiltroEditora);
    if (inptFiltroAno) params.append('ano', inptFiltroAno);

    const queryString = params.toString();
    const url = queryString ? 
        `http://localhost:3000/livro/buscar/${inptPesquisa}?${queryString}` : 
        `http://localhost:3000/livro/buscar/${inptPesquisa}`;

    console.log('URL da requisição:', url);
    const response = await axios.get(url);
    setLivrosPesquisados(response);

    if (typeof setPaginaAtual === 'function') {
      setPaginaAtual(0);
      console.log('oi eu sou um merda')
  } else {
      console.error('setPaginaAtual não é uma função:', setPaginaAtual);
  }

    navigate('/telapesquisa');
}

function AplicarFiltros(){
  console.log(generosSelecionados)
  console.log(inptFiltroAutor, inptFiltroEditora, inptFiltroAno)
  
  // Fechar o modal
  setIsModalOpen(false)
  
  // Aplicar os filtros fazendo uma nova pesquisa
  if (inptPesquisa.trim()) {
      PesquisarLivro()
  }
}

  // Função para resetar todos os filtros quando clicar no X
  function ResetarFiltros(){
    // Resetar todos os gêneros para false
    setGenerosSelecionados({
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
    
    // Resetar os campos de texto
    setInptFiltroAutor('');
    setInptFiltroEditora('');
    setInptFiltroAno('');
    
    // Fechar o modal
    setIsModalOpen(false);
  }

  // Estado para controlar a abertura do modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para abrir o modal
  const openModal = () => setIsModalOpen(true);
  
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
    { id: 'ficcao', label: 'Ficção Científica', dbName: 'Ficção Científica' },
    { id: 'thriller', label: 'Thriller', dbName: 'Thriller' },
    { id: 'fantasia', label: 'Fantasia', dbName: 'Fantasia' },
    { id: 'comedia', label: 'Comédia', dbName: 'Comédia' },
    { id: 'biografia', label: 'Biografia', dbName: 'Biografia' },
    { id: 'crimes', label: 'Crimes', dbName: 'Crimes' },
    { id: 'acaoAventura', label: 'Ação e Aventura', dbName: 'Ação e Aventura' },
    { id: 'romance', label: 'Romance', dbName: 'Romance' },
    { id: 'terror', label: 'Terror', dbName: 'Terror' },
    { id: 'medieval', label: 'Medieval', dbName: 'Medieval' },
    { id: 'drama', label: 'Drama', dbName: 'Drama' }
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
        value={inptPesquisa} 
        onChange={(event) => SetInptPesquisa(event.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
              PesquisarLivro();
          }
      }}
      />
      
      {/* Botão de pesquisa */}
      <button 
        className="btn-pesquisa"
        onClick={PesquisarLivro}
      >
        <img 
          className='icon-pesquisar' 
          src="public/icons/big-search-len.png" 
          alt="" 
        />
      </button>

      {/* Modal de filtros */}
      <Modal isOpen={isModalOpen}>
        <div className="papel-container">
          {/* Cabeçalho do filtro */}
          <div className="filtros-header">
            <button onClick={ResetarFiltros} className='x-btn'>X</button>
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
              <input 
              type="text" 
              className='inpt-filtros' 
              value={inptFiltroAutor}
              onChange={(e) => setInptFiltroAutor(e.target.value)}
              />
              <label className='lbl-opcoes'>Editora: </label>
              <input 
              type="text" 
              className='inpt-filtros' 
              value={inptFiltroEditora}
              onChange={(e) => setInptFiltroEditora(e.target.value)}
              />
              <label className='lbl-opcoes'>Ano: </label>
              <input 
              type="number" 
              placeholder='YYYY' 
              min={0} 
              max={2025} 
              className='inpt-filtros' 
              value={inptFiltroAno}
              onChange={(e) => setInptFiltroAno(e.target.value)}
              />
            </div>
          </div>

          {/* Botão para aplicar filtros */}
          <div className="aplicar-filtros-div">
            <button 
              onClick={AplicarFiltros}
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