import { useEffect, useState } from 'react'
import './MinhaLista.css'
import { useGlobalContext } from '../contexts/GlobalContext'
import CapaLivro from './CapaLivro';
import axios from 'axios';

function MinhaLista({ 
  nomeLista, 
  descricaoLista,
  lista, 
  setLista, 
  voltar, 
  listas, 
  setListas, 
  listaSelecionada, 
  setListaSelecionada,
  biblioteca
  }) {

  const [abriuCaixa, setAbriuCaixa] = useState(false)
  const [caixaEdicao, setCaixaEdicao] = useState(false);
  const [mostrarBotaoDeletar, setMostrarBotaoDeletar] = useState(false);
  const [editarNome, setEditarNome] = useState(false)
  const [editarDescricao, setEditarDescricao] = useState(false)

  // Estados para os valores temporários durante a edição
  const [nomeTemporario, setNomeTemporario] = useState(nomeLista)
  const [descricaoTemporaria, setDescricaoTemporaria] = useState(descricaoLista)

  //adicionar um livro a uma lista
  const adicionarLivro = async (livro) => {
    try {
      // Verificação de segurança
      if (!listaSelecionada || !listaSelecionada.id) {
        alert("Erro: Lista não selecionada!");
        return;
      }

      const resposta = await axios.patch(
        `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}/adicionar-livro`,
        {
          isbnLivro: String(livro.isbnLivro) // Agora está correto com sua estrutura!
        }
      );

      // Atualiza a lista local com os dados retornados do backend
      setLista(resposta.data);
      
      // Também atualiza a lista no estado global se necessário
      const listasAtualizadas = listas.map(l => 
        l.id === listaSelecionada.id ? resposta.data : l
      );
      setListas(listasAtualizadas);
      
      alert(`"${livro.tituloLivro}" adicionado com sucesso!`);
    } catch (erro) {
      console.error("Erro ao adicionar livro:", erro);
      
      // Mensagem de erro mais específica baseada na resposta do servidor
      if (erro.response?.data?.erro) {
        alert(erro.response.data.erro);
      } else {
        alert("Erro ao adicionar o livro à lista.");
      }
    }
  };

  //editar ou excluir uma lista
  function opcoesedicao(){
    setCaixaEdicao(!caixaEdicao)
  }

  function editarLista() {
    setMostrarBotaoDeletar(prev => !prev)
  }

   // Função para habilitar edição do nome
   function habilitarEdicaoNome(){
    setEditarNome(true)
    setNomeTemporario(nomeLista) // Carrega o valor atual
  }

  // Função para habilitar edição da descrição
  function habilitarEdicaoDescricao(){
    setEditarDescricao(true)
    setDescricaoTemporaria(descricaoLista) // Carrega o valor atual
  }

  
   // Função para salvar as alterações do nome
   const salvarNome = async () => {
    try {
      const resposta = await axios.patch(
        `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}`,
        {
          nomeLista: nomeTemporario
        }
      );

      // Atualiza o estado da lista atual com os dados retornados do backend
      const listaAtualizada = {
        ...lista,
        nomeLista: resposta.data.nome_lista || nomeTemporario
      };
      setLista(listaAtualizada);
      
      // Atualiza no estado global de listas
      const listasAtualizadas = listas.map(l => 
        l.id === listaSelecionada.id ? {
          ...l,
          nomeLista: resposta.data.nome_lista || nomeTemporario
        } : l
      );
      setListas(listasAtualizadas);

      // Atualiza a lista selecionada também
      setListaSelecionada(prev => ({
        ...prev,
        nomeLista: resposta.data.nome_lista || nomeTemporario
      }));

      // Desabilita o modo de edição
      setEditarNome(false);
      
      alert("Nome da lista atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar nome:", erro);
      alert("Erro ao salvar o nome da lista.");
      // Restaura o valor original em caso de erro
      setNomeTemporario(nomeLista);
    }
  };

   // Função para salvar as alterações da descrição
   const salvarDescricao = async () => {
    try {
      const resposta = await axios.patch(
        `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}`,
        {
          descricaoLista: descricaoTemporaria
        }
      );

      // Atualiza o estado da lista atual com os dados retornados do backend
      const listaAtualizada = {
        ...lista,
        descricaoLista: resposta.data.descricao_lista || descricaoTemporaria
      };
      setLista(listaAtualizada);
      
      // Atualiza no estado global de listas
      const listasAtualizadas = listas.map(l => 
        l.id === listaSelecionada.id ? {
          ...l,
          descricaoLista: resposta.data.descricao_lista || descricaoTemporaria
        } : l
      );
      setListas(listasAtualizadas);

      // Atualiza a lista selecionada também
      setListaSelecionada(prev => ({
        ...prev,
        descricaoLista: resposta.data.descricao_lista || descricaoTemporaria
      }));

      // Desabilita o modo de edição
      setEditarDescricao(false);
      
      alert("Descrição da lista atualizada com sucesso!");
    } catch (erro) {
      console.error("Erro ao salvar descrição:", erro);
      alert("Erro ao salvar a descrição da lista.");
      // Restaura o valor original em caso de erro
      setDescricaoTemporaria(descricaoLista);
    }
  };

  // Função para cancelar edição do nome
  const cancelarEdicaoNome = () => {
    setNomeTemporario(nomeLista); // Restaura o valor original
    setEditarNome(false);
  };

  // Função para cancelar edição da descrição
  const cancelarEdicaoDescricao = () => {
    setDescricaoTemporaria(descricaoLista); // Restaura o valor original
    setEditarDescricao(false);
  };

  //remover livro da lista
  const removerLivroDaLista = async (isbnLivro) => {
    setCaixaEdicao(false)
    try {
      const resposta = await axios.patch(
        `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}/remover-livro`,
        { isbnLivro: String(isbnLivro) }
      );
  
      setLista(resposta.data);
  
      const listasAtualizadas = listas.map(l =>
        l.id === listaSelecionada.id ? resposta.data : l
      );
      setListas(listasAtualizadas);
    } catch (erro) {
      console.error("Erro ao remover livro:", erro);
      alert("Erro ao remover livro da lista.");
    }
  };
  

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

  useEffect(() => {
    setNomeTemporario(nomeLista);
    setDescricaoTemporaria(descricaoLista);
  }, [nomeLista, descricaoLista]);  


  return (
    <div className='container__lista--livros'>

      <div className="lista__header">

        <div className="lista__name">

          <div className="nome__lista--editar">
            <input 
              type="text" 
              className="dados-lista"
              value={nomeTemporario}
              disabled={!editarNome}
              onChange={(e) => setNomeTemporario(e.target.value)}
            />
            {!editarNome ? (
              <button className="botao-editar-dados-lista" onClick={habilitarEdicaoNome}>
                <img src="./public/icons/button-edit.svg" alt="Editar" className='img-botao-editar-dados'/>
              </button>
            ) : (
              <div className="botoes-edicao">
                <button className="botao-salvar-dados-lista" onClick={salvarNome}>
                  ✓
                </button>
                <button className="botao-cancelar-dados-lista" onClick={cancelarEdicaoNome}>
                  ✗
                </button>
              </div>
            )}
           
          </div>
          <div className="editar__lista">
            <button className="botao__editar--lista" onClick={opcoesedicao}><img src="./public/icons/barra-de-menu.png" alt="" className="img__editar--lista" /></button>
          </div>

        </div>

        <div className="lista__description">

          <textarea 
            name="" 
            id="" 
            className="dados-lista-descricao"
            value={descricaoTemporaria}
            disabled={!editarDescricao}
            onChange={(e) => setDescricaoTemporaria(e.target.value)}
          />
          {!editarDescricao ? (
            <button className="botao-editar-dados-lista" onClick={habilitarEdicaoDescricao}>
              <img src="./public/icons/button-edit.svg" alt="Editar" className='img-botao-editar-dados'/>
            </button>
          ) : (
            <div className="botoes-edicao">
              <button className="botao-salvar-dados-lista" onClick={salvarDescricao}>
                ✓
              </button>
              <button className="botao-cancelar-dados-lista" onClick={cancelarEdicaoDescricao}>
                ✗
              </button>
            </div>
          )}

        </div>

      </div>

      <div className="lista__body">

        <div className="lista__body--books">

          {lista?.isbn_livros?.map((isbn) => {
            const livro = biblioteca.find(l => l.isbnLivro === isbn || l.isbn === isbn);
            if (!livro) return null;

            return (
              <CapaLivro
                key={isbn}
                capa={livro.capaLivro}
                titulo={livro.tituloLivro}
                onClick={() => {}}
                visualizarLixeira={mostrarBotaoDeletar}
                deletarLivro={() => removerLivroDaLista(isbn)}
              />
            );
          })}

          <button className="botao__add--livro" onClick={() => setAbriuCaixa(true)}><img className='img__adicionar' src="./teste/adicionar.svg" alt="" /></button>

        </div>

      </div>

        <dialog open={abriuCaixa} className='dialog_add-listas'>

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
                <CapaLivro 
                  key={livro.isbnLivro || livro.isbn || livro.id} 
                  capa={livro.capaLivro} 
                  titulo={livro.tituloLivro} 
                  onClick={() => adicionarLivro(livro)}/>
              ))}

            </div>

          </div>

        </dialog>

        <dialog open={caixaEdicao} className='dialog__edicao'>

          <div className="container__edicao">
            <button className="botao__edicao--listas" onClick={editarLista}>Editar lista</button>
            <button className="botao__edicao--listas" onClick={() => deletarLista(lista.id)}>Apagar lista</button>
          </div>

        </dialog>
      
    </div>
  )
}

export default MinhaLista
