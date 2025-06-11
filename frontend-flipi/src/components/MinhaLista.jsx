import { useState } from 'react'
import './MinhaLista.css'
import { useGlobalContext } from '../contexts/GlobalContext'
import CapaLivro from './CapaLivro';

function MinhaLista({ 
  nomeLista, 
  descricaoLista,
  lista, 
  voltar, 
  listas, 
  setListas, 
  listaSelecionada, 
  setListaSelecionada 
  }) {
  const [abriuCaixa, setAbriuCaixa] = useState(false)
  const [confirmacao, setConfirmacao] = useState(false)
  const {biblioteca} = useGlobalContext();
  const [livroClicado, setLivroClicado] = useState();
  const [caixaEdicao, setCaixaEdicao] = useState(false);

  function cancelarAdicao(){
    alert('cancelado!!!')
    setConfirmacao(false)
  }

  function confirmarAdicao(){
  
    alert('adicionado!!!')
    setConfirmacao(false)
  }

  function cliquenolivro(){
    setConfirmacao(true)
    setLivroClicado(livro.tituloLivro)
  }

  function opcoesedicao(){
    setCaixaEdicao(!caixaEdicao)
  }

  async function deletarLista(id) {
    try {
        const response = await fetch(`http://localhost:3000/listas_personalizadas/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
          setListas(prev => prev.filter(lista => lista.id !== id));
      
          if (listaSelecionada?.id === id) {
            setListaSelecionada(null);
            voltar();
          }

          alert('Lista deletada com sucesso!');
        } else {
            const data = await response.json();
            alert(data.message || 'Erro ao deletar a lista');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
  }


  return (
    <div className='container__lista--livros'>

      <div className="lista__header">

        <div className="lista__name">

          <div className="nome__lista--editar">
            <label className='nome__lista'>{nomeLista}</label>
          </div>
          <div className="editar__lista">
            <button className="botao__editar--lista" onClick={opcoesedicao}><img src="./public/icons/barra-de-menu.png" alt="" className="img__editar--lista" /></button>
          </div>

        </div>

        <div className="lista__description">

          <label className='descricao__lista'>{descricaoLista}</label>

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

        <dialog open={caixaEdicao} className='dialog__edicao'>

          <div className="container__edicao">
            <button className="botao__edicao--listas">Editar lista</button>
            <button className="botao__edicao--listas" onClick={() => deletarLista(lista.id)}>Apagar lista</button>
          </div>

        </dialog>
      
    </div>
  )
}

export default MinhaLista
