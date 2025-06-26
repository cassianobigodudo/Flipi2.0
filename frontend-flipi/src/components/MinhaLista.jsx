import { useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'
import './MinhaLista.css'
// import { useGlobalContext } from '../contexts/GlobalContext'
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
  setListaSelecionada
  }) {

    const navigate = useNavigate();

  const [abriuCaixa, setAbriuCaixa] = useState(false)
  const [caixaEdicao, setCaixaEdicao] = useState(false);
  const [mostrarBotaoDeletar, setMostrarBotaoDeletar] = useState(false);
  const [editarNome, setEditarNome] = useState(false)
  const [editarDescricao, setEditarDescricao] = useState(false)

  // Estados para os valores temporários durante a edição
  const [nomeTemporario, setNomeTemporario] = useState(nomeLista)
  const [descricaoTemporaria, setDescricaoTemporaria] = useState(descricaoLista)
  const [livros, setLivros] = useState([])
  const [todosLivros, setTodosLivros] = useState([])

  //pesquisar livros
  const [livrosPesquisados, setLivrosPesquisados] = useState([])
  const [pesquisa, setPesquisa] = useState()
  const [carregarLivros, setCarregarLivros] = useState(false)

  // Função para carregar todos os livros do banco
  const carregarTodosLivros = async () => {
    try {
      setCarregarLivros(true);
      const resposta = await axios.get('http://localhost:3000/livro'); 
      setTodosLivros(resposta.data);
      setLivrosPesquisados(resposta.data); 
    } catch (erro) {
      console.error("Erro ao carregar livros:", erro);
      alert("Erro ao carregar livros do banco de dados");
    } finally {
      setCarregarLivros(false);
    }
  };

  // Função de pesquisa
  const pesquisarLivros = (termo) => {
    if (!termo.trim()) {
      // Se não há termo de pesquisa, mostra todos os livros
      setLivrosPesquisados(todosLivros);
      return;
    }

    const termoLower = termo.toLowerCase();
    
    const resultados = todosLivros.filter(livro => {
      // Pesquisa por título
      const tituloMatch = livro.livro_titulo?.toLowerCase().includes(termoLower);
      
      // Pesquisa por ISBN (remove hífens e espaços para comparação mais flexível)
      const isbnLivro = livro.livro_isbn?.replace(/[-\s]/g, '');
      const isbnPesquisa = termo.replace(/[-\s]/g, '');
      const isbnMatch = isbnLivro?.toLowerCase().includes(isbnPesquisa.toLowerCase());
      
      // Também pode pesquisar por autor se quiser
      const autorMatch = livro.livro_autor?.toLowerCase().includes(termoLower);
      
      return tituloMatch || isbnMatch || autorMatch;
    });

    setLivrosPesquisados(resultados);
  };

  // Handler para mudança no input
  const handleInputChange = (e) => {
    const valor = e.target.value;
    setPesquisa(valor);
    pesquisarLivros(valor); // pesquisa em tempo real
  };

  // Função chamada quando o dialog abre
  const abrirDialog = () => {
    setAbriuCaixa(true);
    carregarTodosLivros(); 
    setPesquisa(''); 
  };

  // Função para fechar o dialog e limpar estados
  const fecharDialog = () => {
    setAbriuCaixa(false);
    setPesquisa('');
    setTodosLivros([]);
    setLivrosPesquisados([]);
  };

  //adicionar um livro a uma lista
  const adicionarLivro = async (livro) => {

    try {

      if (!listaSelecionada || !listaSelecionada.id) {
        alert("Erro: Lista não selecionada!");
        return;
      }

      // ✅ VERIFICAÇÃO: Checa se o livro já está na lista
      const livroJaExiste = livros.some(l => l.livro_isbn === livro.livro_isbn);
      
      if (livroJaExiste) {
        alert(`O livro "${livro.livro_titulo}" já está na lista!`);
        return;
      }
  
      // Adiciona o livro no backend
      await axios.patch(
        `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}/adicionar-livro`,
        {
          isbnLivro: livro.livro_isbn
        }
      );
  
      // 🔁 Faz uma nova requisição para buscar os livros da lista
      const respostaLivros = await axios.get(
        `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}/livro`
      );
  
      // Atualiza o estado `livros` para garantir que a lista renderize corretamente
      setLivros(respostaLivros.data);

      // Atualiza os livros na lista com os dados completos
      setLista(prev => ({
        ...prev,
        isbn_livros: respostaLivros.data.map(l => l.livro_isbn)
      }));
  
      alert(`"${livro.livro_titulo}" adicionado com sucesso!`);

    } catch (erro) {

      console.error("Erro ao adicionar livro:", erro);
      if (erro.response?.data?.erro) {
        alert(erro.response.data.erro);
      } else {
        alert("Erro ao adicionar o livro à lista.");
      }

    }

  };
  

  useEffect(() => {
    const buscarLivrosDaLista = async () => {
      try {
        if (!listaSelecionada?.id) return;
  
        const response = await axios.get(
          `http://localhost:3000/listas_personalizadas/${listaSelecionada.id}/livro`
        );
        setLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar livros da lista:", error);
        alert("Erro interno ao buscar livros da lista");
      }
    };
  
    buscarLivrosDaLista();
  }, [listaSelecionada]);

  useEffect(() => {
    const buscarTodosLivros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/livro");
        setTodosLivros(response.data);
      } catch (error) {
        console.error("Erro ao buscar todos os livros:", error);
      }
    };
  
    buscarTodosLivros();
  }, []);

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

          {livros.map((livro) => (
            <CapaLivro
              key={livro.livro_isbn}
              capa={livro.livro_capa}
              titulo={livro.livro_titulo}
              onClick={() => navigate(`/telalivro/${livro.livro_isbn}`)}
              visualizarLixeira={mostrarBotaoDeletar}
              deletarLivro={() => removerLivroDaLista(livro.livro_isbn)}
            />
          ))}

          <button className="botao__add--livro" onClick={abrirDialog}><img className='img__adicionar' src="./teste/adicionar.svg" alt="" /></button>

        </div>

      </div>

        <dialog open={abriuCaixa} className='dialog_add-listas'>

          <div className="container__livros">

            <div className="fechar__caixa">

              <div className="pesquisar__livro">
                <input 
                  type="text" 
                  className="input__pesquisar--livro" 
                  placeholder='Pesquise o livro pelo título aqui...'
                  value={pesquisa}
                  onChange={handleInputChange}
                />
                
                <button className="btn__pesquisa--livro" onClick={() => pesquisarLivros(pesquisa)}>
                  <img className='img__pesquisar' src="./public/icons/search-book.svg" alt="" />
                </button>

              </div>

              <div className="botao__fechar">
                <button className="btn__fechar--caixa" onClick={fecharDialog}>❌</button>
              </div>

            </div>

            <div className="lista__livros">

              {carregarLivros ? (
                  <div className="carregando">
                    <p>Carregando livros...</p>
                  </div>
                ) : (
                  <>
                    {/* Lista de livros filtrados */}
                    {livrosPesquisados.length > 0 ? (
                      livrosPesquisados.map((livro) => (
                        <CapaLivro
                          key={livro.livro_isbn}
                          capa={livro.livro_capa}
                          titulo={livro.livro_titulo}
                          onClick={() => adicionarLivro(livro)}
                        />
                      ))
                    ) : (
                      <div className="sem-resultados">
                        {pesquisa ? (
                          <p>Nenhum livro encontrado para "{pesquisa}"</p>
                        ) : (
                          <p>Nenhum livro disponível</p>
                        )}
                      </div>
                    )}
                  </>
                )

              }

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
