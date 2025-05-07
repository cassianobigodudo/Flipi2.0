import { useState } from 'react'
import './MinhaLista.css'
import { useGlobalContext } from '../contexts/GlobalContext'
import CapaLivro from './CapaLivro';

function MinhaLista() {
  const [abriuCaixa, setAbriuCaixa] = useState(false)
  const {biblioteca} = useGlobalContext();

  return (
    <div className='container__lista--livros'>

      <div className="lista__header">

        <div className="lista__name">

          <label className='nome__lista'>Nome da Lista</label>

        </div>

        <div className="lista__description">

          <label className='descricao__lista'>Descrição da lista: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint distinctio enim ex tempore. Dolorem facere assumenda error maxime neque aspernatur molestiae vitae velit repudiandae odit quas eum eos, odio reprehenderit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam minus nostrum asperiores quisquam, optio dolores dicta laudantium maiores corrupti quod, itaque aspernatur sit nesciunt expedita similique incidunt? Hic, possimus? Nam.</label>

        </div>

      </div>

      <div className="lista__body">

        <div className="lista__body--books">

          <button className="botao__add--livro" onClick={() => setAbriuCaixa(true)}><img className='img__adicionar' src="./teste/adicionar.svg" alt="" /></button>

        </div>

      </div>

        <dialog open={abriuCaixa}>

          <div className="container__livros">

            <div className="fechar__caixa">

              <div className="pesquisar__livro">
                <input type="text" className="input__pesquisar--livro" placeholder='Pesquise o livro pelo ISBN aqui...'/>
                <button className="btn__pesquisa--livro" onClick={() => alert("Pesquisando um livro pelo ISBN!")}><img className='img__pesquisar' src="./public/icons/search-book.svg" alt="" /></button>
              </div>

              <div className="botao__fechar">
                <button className="btn__fechar--caixa" onClick={() => setAbriuCaixa(false)}>❌</button>
              </div>

            </div>

            <div className="lista__livros">

              {biblioteca.map((livro) => (
                <CapaLivro key={livro.isbnLivro} capa={livro.capaLivro} titulo={livro.tituloLivro}/>
              ))}

            </div>

          </div>

        </dialog>
      
    </div>
  )
}

export default MinhaLista
