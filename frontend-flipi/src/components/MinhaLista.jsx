import { useState } from 'react'
import './MinhaLista.css'
import { useGlobalContext } from '../contexts/GlobalContext'
import CapaLivro from './CapaLivro';

function MinhaLista() {
  const [abriuCaixa, setAbriuCaixa] = useState(false)
  const [confirmacao, setConfirmacao] = useState(false)
  const {biblioteca} = useGlobalContext();
  const [livroClicado, setLivroClicado] = useState();

  function cancelarAdicao(){
    alert('cancelado!!!')
    setConfirmacao(false)
  }

  function confirmarAdicao(){
    //é nessa função que vou adicionar o livro a lista personalizada do usuário
    alert('adicionado!!!')
    setConfirmacao(false)
  }

  function cliquenolivro(){
    setConfirmacao(true)
    setLivroClicado(livro.tituloLivro)
  }

  return (
    <div className='container__lista--livros'>

      <div className="lista__header">

        <div className="lista__name">

          <label className='nome__lista'>Nome da Lista</label>

        </div>

        <div className="lista__description">

          <label className='descricao__lista'>Descrição da lista: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint distinctio enim ex tempore. Dolorem facere assumenda error maxime neque aspernatur molestiae vitae velit repudiandae odit quas eum eos, odio reprehenderit! Lorem ipsum dolor sit amet consectetur adipisicing elit.</label>

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
                // <CapaLivro key={livro.isbnLivro} capa={livro.capaLivro} titulo={livro.tituloLivro} onClick={() => alert(`Olá ${livro.tituloLivro}`)}/>
                <CapaLivro key={livro.isbnLivro} capa={livro.capaLivro} titulo={livro.tituloLivro} onClick={cliquenolivro}/>
              ))}

            </div>

          </div>

        </dialog>

        <dialog open={confirmacao}>

          <div className="container__confirmacao">

            <div className="confirmacao__fechar">

              <button className='fechar__confirmacao' onClick={() => setConfirmacao(false)}>❌</button>

            </div>

            <div className="confirmacao__textos">

              <label htmlFor="" className="textos__confirmacao">Quer adicionar "{livroClicado}" a sua lista?</label>

            </div>

            <div className="confirmacao__botoes">

              <button className="botoes__confirmacao" onClick={cancelarAdicao}>Cancelar</button>
              <button className="botoes__confirmacao" onClick={confirmarAdicao}>Adicionar</button>

            </div>


          </div>

        </dialog>
      
    </div>
  )
}

export default MinhaLista
